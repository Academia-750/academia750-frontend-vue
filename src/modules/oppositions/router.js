import authMiddleware from '@/middlewares/auth'
import Module from './module.vue'
import ManageOppositionsModule from './views/Oppositions/'
import CreateOppositionView from './views/CreateOpposition/index.vue'

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
      },
      {
        path: 'create',
        name: 'create-opposition',
        component: CreateOppositionView,
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
