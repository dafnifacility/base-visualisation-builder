import { instanceID } from '../../api/backends/'

export function checkUrlOrRedirect({ redirect, route }) {
  if (route.name !== 'instance-id') {
    redirect(`instance/${instanceID}`)
  }
}

export function checkUserRoleOrRedirect({ redirect, store }) {
  if (!store.getters['auth/hasUserRole']) {
    redirect('https://facility.secure.dafni.rl.ac.uk/details')
  }
}

export default {
  checkUserRoleOrRedirect,
}
