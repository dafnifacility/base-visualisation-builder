export function checkUserRoleOrRedirect({ redirect, route, store }) {
  if (
    store.getters['auth/hasUserRole'] ||
    route.name === 'details' ||
    route.name === 'logout'
  )
    return

  redirect('https://facility.secure.dafni.rl.ac.uk/details')
}

export default {
  checkUserRoleOrRedirect,
}
