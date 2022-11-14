import authMiddleware from '@/middlewares/auth'
import Module from './module.vue'
import UpdateMyProfileViewModule from './views/UpdateMyProfileView.vue'
import ChangePasswordAccountViewModule from './views/ChangePasswordAccountView.vue'

const moduleRoute = [
  {
    path: '/my-profile',
    component: Module,
    redirect: { name: 'update-my-profile' },
    children: [
      {
        path: 'update',
        name: 'update-my-profile',
        component: UpdateMyProfileViewModule,
        meta: {
          middleware: [authMiddleware]
        }
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: ChangePasswordAccountViewModule,
        meta: {
          middleware: [authMiddleware]
        }
      }
    ]
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
