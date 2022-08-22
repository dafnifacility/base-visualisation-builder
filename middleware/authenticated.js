import { backendsPromise } from '../api/backends'
import { checkUserRoleOrRedirect } from '../static/js/authenticated'

export default async function ({ redirect, route, store }) {
  await backendsPromise

  if (!store.state.auth.authenticated) {
    return
  }
  checkUserRoleOrRedirect({ redirect, route, store })
}
