import HomeView from './views/Home.vue'

const moduleRoute = [
  {
    path: '/',
    name: 'home-website',
    component: HomeView,
    meta: {
      layout: 'simple'
    }
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
