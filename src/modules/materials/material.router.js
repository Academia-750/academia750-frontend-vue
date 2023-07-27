import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageGroupsModule from './material-list'

const shortcutRoutes = [
  {
    path: 'materiales',
    redirect: { name: 'manage-materials' },
    meta: {
      middleware: [authMiddleware]
    }
  }
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-materials' },
    children: [
      {
        path: '/materials',
        component: Module,
        redirect: { name: 'manage-groups' },
        children: [
          {
            path: 'list',
            name: 'manage-materials',
            component: ManageGroupsModule,
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

export default (router) => {
  router.addRoutes(moduleRoute)
}
