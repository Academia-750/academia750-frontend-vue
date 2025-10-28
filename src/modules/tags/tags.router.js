import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageTagsModule from './tags-list'

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
      }
    ]
  }
]

export default (router) => {
  moduleRoute.forEach((route) => router.addRoute(route))
}
