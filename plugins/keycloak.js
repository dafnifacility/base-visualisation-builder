/**
 * Keycloak Plugin
 * (Based on https://github.com/dsb-norge/vue-keycloak-js)
 */
import axios from 'axios'
import { checkUserRoleOrRedirect } from '../static/js/authenticated'
import { setRequestInterceptor } from './axios'
import Vue from 'vue'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'

// Number of minutes before the cookie expires (this is double the token
// refresh time just in case the token refresh takes a while)
const cookieExpirationMinutes = 10
let cookieDomain = '.secure.dafni.rl.ac.uk'
let cookieName = '__Secure-dafni'

/**
 * Connect and login to Keycloak.
 * @param context The Vue context
 */
export default initKeycloak

/**
 * Get the currently logged in user details
 * @param fill Add the details to this object rather than returning or null to create one
 * @returns {null|*|{}} If logged in returns details otherwise null
 */
export function getUserDetails(fill = {}) {
  const keycloak = Vue.prototype.$keycloak

  if (keycloak && keycloak.authenticated) {
    const userDetails = fill
    userDetails.id = keycloak.subject
    userDetails.userName = keycloak.userName
    userDetails.email = keycloak.tokenParsed.email
    userDetails.firstName = keycloak.tokenParsed.given_name
    userDetails.lastName = keycloak.tokenParsed.family_name

    return userDetails
  }

  return null
}

// ============== internal functions below here ==============

// Configures Vue to use VueKeyCloak package
async function initKeycloak(context) {
  const keycloakConfig = await keycloakInternalFns.getKeycloakSettings(context)
  Vue.use(VueKeyCloak, {
    config: keycloakConfig,
    init: {
      onLoad: '',
      checkLoginIframe: false,
      enableLogging: process.env.NODE_ENV === 'development',
    },
    logout: {
      redirectUri: window.location.origin,
    },
    onAuthRefreshSuccess: kc => authRefreshSuccess(kc, context),
    onAuthRefreshError: kc => authRefreshError(kc, context),
    onReady: kc => keycloakReady(kc, context),
    onInitError: (error, err) => initError(error, err, context),
  })
}

/**
 * Get keycloak settings.
 * First look for settings at /backends/keycloak.json
 * If not found, check if we have any environment variables set.
 * If not, use default (localhost) settings.
 * @param context
 * @returns {Promise<{clientId: string, realm: string, url: string, cookieName: string, cookieDomain: string}>}
 */
async function getKeycloakSettings(context) {
  let keycloakConfig = {
    url:
      context.env.keycloakUrl || 'https://keycloak.secure.dafni.rl.ac.uk/auth/',
    realm: context.env.keycloakRealm || 'Production',
    clientId: context.env.keycloakClient || 'dafni-main',
  }
  try {
    const response = await axios.get('/backends/keycloak.json')
    if (response.status === 200) {
      keycloakConfig = {
        url: response.data.url,
        realm: response.data.realm,
        clientId: response.data.clientId,
      }
      cookieDomain = response.data.cookieDomain
      cookieName = response.data.cookieName
    }
  } catch (error) {
    console.warn("Can't access backend configuration, using local settings")
  }

  return keycloakConfig
}

// This function is triggered when the token refresh request succeeds
function authRefreshSuccess(kc, context) {
  checkUserRoleOrRedirect(context)
  keycloakInternalFns.createCookie(kc.token)
}

// This function is triggered when the token refresh request fails
function authRefreshError(kc, context) {
  keycloakInternalFns.clearCookie()
  context.store.commit('auth/authenticated', false)
  kc.logout()
}

// This function is triggered when the keycloak plugin has been loaded
// and triggers the login to keycloak
function keycloakReady(kc, context) {
  context.store.commit('auth/keycloakReady', true)
  if (kc.authenticated) {
    setRequestInterceptor(keycloakInternalFns.tokenInterceptor)
    const roles =
      (kc.tokenParsed.realm_access && kc.tokenParsed.realm_access.roles) || []
    context.store.commit('auth/keycloakRoles', roles)
    checkUserRoleOrRedirect(context)
    keycloakInternalFns.createCookie(kc.token)
    context.store.commit('auth/authenticated', true)
    return
  }
  kc.login()
}

// This function is triggered if there is an error when initialising the keycloak package
function initError(error, err, context) {
  console.error(error, err)
  context.store.commit('auth/keycloakError', err)
}

/**
 * Make axios use the currently active JWT in all its calls.
 */
function tokenInterceptor(config) {
  if (config.url.includes('geonames')) {
    return config
  }
  if (config.url.includes('minio') || config.url.includes('nims-io')) {
    config.withCredentials = true
    return config
  }
  const token = (Vue.prototype.$keycloak && Vue.prototype.$keycloak.token) || ''
  if (token) {
    config.headers.Authorization = `Bearer ${Vue.prototype.$keycloak.token}`
  }
  return config
}

function minsToMilliseconds(mins) {
  /** Switch time in hours to Milliseconds */
  return Math.floor(mins * 60 * 1000)
}

function createCookie(token) {
  /** Create our cookie  with token */
  const cookieExpirationTime =
    Date.now() + keycloakInternalFns.minsToMilliseconds(cookieExpirationMinutes)
  const d = new Date(cookieExpirationTime)
  document.cookie = keycloakInternalFns.getCookieString(token, d.toUTCString())
}

function clearCookie() {
  /** Put cookie in past and clear. */
  const d = new Date('2019-04-10')
  document.cookie = keycloakInternalFns.getCookieString('', d.toUTCString())
}

function getCookieString(token, expiration) {
  /** Create string for cookie */
  let cookie =
    `${cookieName}=${encodeURIComponent(token)}; ` +
    `expires=${expiration}; domain=${cookieDomain}`

  if (cookieName.startsWith('__Secure-')) {
    cookie += '; secure'
  }
  return `${cookie}; path=/`
}

// Exporting like this so that we can test the functions. In order to spy on the functions
// they must be called as `keycloakInternalFns.initKeycloak`
export const keycloakInternalFns = {
  initKeycloak,
  authRefreshError,
  authRefreshSuccess,
  keycloakReady,
  initError,
  tokenInterceptor,
  getKeycloakSettings,
  minsToMilliseconds,
  createCookie,
  clearCookie,
  getCookieString,
}
