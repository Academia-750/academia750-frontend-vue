import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageSpacesModule from './index'

/**
 * ADMIN ROUTES FOR SPACES MANAGEMENT
 */
const adminRoute = [
  {
    path: '/spaces',
    component: Module,
    redirect: { name: 'manage-spaces' },
    children: [
      {
        path: 'list',
        name: 'manage-spaces',
        component: ManageSpacesModule,
        meta: {
          middleware: [authMiddleware]
        }
      }
    ]
  }
]

export default (router) => {
  router.addRoutes(adminRoute)
}
