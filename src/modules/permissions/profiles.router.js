import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageProfiles from './profiles-list'
import CreateProfileModule from './update-profile'
import ManagePermissions from './permission-list'

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-profiles' },
    children: [
      {
        path: '/profiles',
        component: Module,
        redirect: { name: 'manage-profiles' },
        children: [
          {
            path: 'list',
            name: 'manage-profiles',
            component: ManageProfiles,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'create',
            name: 'create-profile',
            component: CreateProfileModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/edit',
            name: 'edit-profile',
            component: CreateProfileModule,
            meta: {
              middleware: [authMiddleware]
            }
          }
        ]
      },
      {
        path: ':id/permission',
        component: Module,
        redirect: { name: 'manage-permissions' },
        children: [
          {
            path: 'list',
            name: 'manage-permissions',
            component: ManagePermissions,
            meta: {
              middleware: [authMiddleware]
            }
          }
        ]
      }
    ]
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
