import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageTagsModule from './tags-list'

const shortcutRoutes = [
  {
    path: 'tags',
    redirect: { name: 'manage-tags' },
    meta: {
      middleware: [authMiddleware]
    }
  }
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-tags' },
    children: [
      {
        path: '/tags',
        component: Module,
        redirect: { name: 'manage-tags' },
        children: [
          {
            path: 'list',
            name: 'manage-tags',
            component: ManageTagsModule,
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
