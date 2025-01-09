import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageWorkspacesModule from './workspace-list'
import ManageMaterialsModule from './workspace-material-list'
import EditMaterialsModule from './create-material'
import createMaterialsModule from './create-material'
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
            component: ManageWorkspacesModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: '/materials',
            name: 'manage-materials',
            component: ManageMaterialsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: '/materials/create',
            name: 'create-materials',
            component: createMaterialsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: '/materials/:id',
            name: 'edit-material',
            component: EditMaterialsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/materials',
            name: 'manage-materials-id',
            component: ManageMaterialsModule,
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
