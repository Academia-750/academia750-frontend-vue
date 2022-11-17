import authMiddleware from '@/middlewares/auth'
import Module from './module.vue'
import ManageOppositionsModule from './views/Oppositions/'

const moduleRoute = [
  {
    path: '/oposiciones',
    component: Module,
    redirect: { name: 'manage-oppositions' },
    children: [
      {
        path: 'list',
        name: 'manage-oppositions',
        component: ManageOppositionsModule,
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
