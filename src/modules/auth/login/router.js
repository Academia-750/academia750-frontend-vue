import guestMiddleware from '@/middlewares/guest'
import Module from './module.vue'
import LoginModule from './views/Login.vue'

const moduleRoute = {
  path: '/login',
  component: Module,
  children: [
    {
      path: '/',
      name: 'login',
      component: LoginModule,
      meta: {
        middleware: [guestMiddleware],
        layout: 'auth'
      }
    }
  ]
}

export default (router) => {
  router.addRoutes([moduleRoute])
}
