import guestMiddleware from '@/middlewares/guest'
import Module from './module.vue'
import LoginModule from './views/Login/Login.vue'
import RequestResetPasswordModule from './views/RequestResetPassword/RequestResetPassword.vue'

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
    },
    {
      path: 'request-reset-password',
      name: 'request-reset-password',
      component: RequestResetPasswordModule,
      meta: {
        middleware: [guestMiddleware],
        layout: 'auth'
      }
    }
  ]
}

export default (router) => {
  [moduleRoute].forEach((route) => router.addRoute(route))
}
