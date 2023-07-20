import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageGroupsModule from '@/modules/groups/views/groups'
import CreateGroupModule from '@/modules/groups/views/create-group'
/* import CreateTopicModule from '@/modules/groups/views/CreateTopic'
import UpdateTopicModule from '@/modules/groups/views/UpdateTopic' */

const shortcutRoutes = [
  {
    path: 'grupos',
    redirect: { name: 'manage-groups' },
    meta: {
      middleware: [authMiddleware]
    }
  },
  {
    path: 'grupos/crear',
    redirect: { name: 'create-group' },
    meta: {
      middleware: [authMiddleware]
    }
  },
  {
    path: 'grupos/editar',
    redirect: { name: 'create-group' },
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
        path: '/groups',
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
          },
          {
            path: 'create',
            name: 'create-group',
            component: CreateGroupModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'edit',
            name: 'edit-group',
            component: CreateGroupModule,
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
