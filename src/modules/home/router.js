import HomeView from './views/Home.vue'
import BomberosAlicanteLanding from './views/bomberos-alicante-landing.vue'

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
    path: '/oposiciones-bomberos-alicante',
    name: 'oposiciones-bomberos-alicante',
    component: BomberosAlicanteLanding,
    meta: {
      layout: 'simple'
    }
  }
]

export default (router) => {
  moduleRoute.forEach((route) => router.addRoute(route))
}
