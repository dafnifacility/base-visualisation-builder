export const state = () => ({
  uuid: '',
  // Authenticated against keycloak
  authenticated: false,
  // Keycloak is ready to attempt login
  // (It needs to request it's configuration)
  keycloakReady: false,
  // Keycloak has reported an error
  keycloakError: '',
  // Roles associated with the logged in user
  keycloakRoles: [],
})

export const getters = {
  hasUserRole: state => {
    return state.keycloakRoles.includes('dafni_user')
  },
}

export const mutations = {
  uuid: (state, uuid) => {
    state.uuid = uuid
  },
  authenticated: (state, auth) => {
    state.authenticated = auth
  },
  keycloakReady: (state, ready) => {
    state.keycloakReady = ready
  },
  keycloakError: (state, error) => {
    state.keycloakError = error
  },
  keycloakRoles: (state, roles) => {
    state.keycloakRoles = roles
  },
}

export const actions = {}
