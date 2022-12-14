import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageTopicsModule from '@/modules/topics/views/Topics'
import CreateTopicModule from '@/modules/topics/views/CreateTopic'
import FetchTopicModule from '@/modules/topics/views/FetchTopic'
import UpdateTopicModule from '@/modules/topics/views/UpdateTopic'
import importTopics from '@/modules/topics/views/import'

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
          },
          {
            path: 'fetch/:id',
            name: 'fetch-topic',
            component: FetchTopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'imports/topics',
            name: 'import-topics',
            component: importTopics,
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
