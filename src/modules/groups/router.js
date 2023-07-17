import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageGroupsModule from '@/modules/students/views/Groups'
/* import CreateTopicModule from '@/modules/students/views/CreateTopic'
import UpdateTopicModule from '@/modules/students/views/UpdateTopic' */

const shortcutRoutes = [
  {
    path: 'grupos',
    redirect: { name: 'manage-groups' },
    meta: {
      middleware: [authMiddleware]
    }
  }
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-groups' },
    children: [
      {
        path: '/students',
        component: Module,
        redirect: { name: 'manage-groups' },
        children: [
          {
            path: 'list',
            name: 'manage-groups',
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
