import HomeView from './views/Home.vue'
import NewLandingPageView from './views/bomberos-alicante-landing.vue'

const moduleRoute = [
  {
    path: '/',
    name: 'home-website',
    component: HomeView,
    meta: {
      layout: 'simple'
    }
  },
  {
    path: '/nueva-landing-page',
    name: 'nueva-landing-page',
    component: NewLandingPageView,
    meta: {
      layout: 'simple'
    }
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
