import HomeView from './views/Home.vue'

const moduleRoute = [
  {
    path: '/',
    name: 'home-website',
    component: HomeView
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
