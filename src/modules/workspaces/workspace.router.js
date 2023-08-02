import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageGroupsModule from './workspace-list'

const shortcutRoutes = [
  {
    path: 'materiales',
    redirect: { name: 'manage-workspaces' },
    meta: {
      middleware: [authMiddleware]
    }
  }
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-workspaces' },
    children: [
      {
        path: '/workspace',
        component: Module,
        redirect: { name: 'manage-workspaces' },
        children: [
          {
            path: 'list',
            name: 'manage-workspaces',
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
