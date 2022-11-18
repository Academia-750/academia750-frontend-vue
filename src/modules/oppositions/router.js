import authMiddleware from '@/middlewares/auth'
import Module from './module.vue'
import ManageOppositionsModule from './views/Oppositions/'
import CreateOppositionView from './views/CreateOpposition/index.vue'
import UpdateOppositionView from './views/UpdateOpposition/index.vue'

const shortcutRoutes = [
  {
    path: 'oposiciones',
    redirect: { name: 'manage-oppositions' },
    meta: {
      middleware: [authMiddleware]
    }
  },
  {
    path: 'oposiciones/crear',
    redirect: { name: 'create-opposition' },
    meta: {
      middleware: [authMiddleware]
    }
  },
  {
    path: 'update/',
    redirect: { name: 'manage-oppositions' },
    meta: {
      middleware: [authMiddleware]
    }
  }
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-oppositions' },
    children: [
      {
        path: '/oppositions',
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
          },
          {
            path: 'update/:id',
            name: 'update-opposition',
            component: UpdateOppositionView,
            meta: {
              middleware: [authMiddleware]
            }
          }
        ]
      },
      ...shortcutRoutes
    ]
  }

]

console.log(moduleRoute)

export default (router) => {
  router.addRoutes(moduleRoute)
}
