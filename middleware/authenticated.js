import {
  checkUrlOrRedirect,
  checkUserRoleOrRedirect,
} from '../static/js/authenticated'
import { backendsPromise } from '../api/backends'

export default async function ({ redirect, route, store }) {
  await backendsPromise
  checkUrlOrRedirect({ redirect, route })

  if (!store.state.auth.authenticated) {
    return
  }
  checkUserRoleOrRedirect({ redirect, store })
}
