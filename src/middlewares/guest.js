import Cookies from 'js-cookie'

export default ({ next, store }) => {
  //console.log(store.getters['profile/get_roles'])
  if (!Cookies.get('authorization')) {

    return next()
  }

  return next({
    name: 'dashboard-analytics'
  })
}
