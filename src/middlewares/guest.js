import Cookies from 'js-cookie'

export default ({ next, store }) => {
  //console.log(store.getters['profile/get_roles'])
  /* console.log(Cookies.get('authorization')) */
  if (!Cookies.get('authorization')) {
    /* console.log('No hay token en el middleware guest') */

    return next()
  }

  return next({
    name: 'update-my-profile'
  })
}
