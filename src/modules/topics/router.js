import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageTopicsModule from '@/modules/topics/views/Topics'
import CreateTopicModule from '@/modules/topics/views/CreateTopic'
import UpdateTopicModule from '@/modules/topics/views/UpdateTopic'

const shortcutRoutes = [
  {
    path: 'temas',
    redirect: { name: 'manage-topics' },
    meta: {
      middleware: [authMiddleware]
    }
  },
  {
    path: 'temas/crear',
    redirect: { name: 'create-topic' },
    meta: {
      middleware: [authMiddleware]
    }
  }
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-topics' },
    children: [
      {
        path: '/topics',
        component: Module,
        redirect: { name: 'manage-topics' },
        children: [
          {
            path: 'update',
            redirect: { name: 'manage-topics' },
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'list',
            name: 'manage-topics',
            component: ManageTopicsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'create',
            name: 'create-topic',
            component: CreateTopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'update/:id',
            name: 'update-topic',
            component: UpdateTopicModule,
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
