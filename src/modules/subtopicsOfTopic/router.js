import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageSubtopicsModule from '@/modules/subtopicsOfTopic/views/Subtopics'
import CreateSubtopicModule from '@/modules/subtopicsOfTopic/views/CreateSubtopic'
import FetchSubtopicModule from '@/modules/subtopicsOfTopic/views/FetchSubtopic'
import UpdateSubtopicModule from '@/modules/subtopicsOfTopic/views/UpdateSubtopic'

const shortcutRoutes = [
  /* {
    path: 'temas',
    redirect: { name: 'manage-subtopics-of-topic' },
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
  } */
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-subtopics-of-topic' },
    children: [
      {
        path: '/topics',
        component: Module,
        children: [
          /* {
            path: 'update',
            redirect: { name: 'manage-subtopics-of-topic' },
            meta: {
              middleware: [authMiddleware]
            }
          }, */
          {
            path: ':id/subtopics/list',
            name: 'manage-subtopics-of-topic',
            component: ManageSubtopicsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/subtopics/create',
            name: 'create-subtopic',
            component: CreateSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/subtopics/fetch/:subtopic_id',
            name: 'fetch-subtopic',
            component: FetchSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/subtopics/update/:subtopic_id',
            name: 'update-subtopic',
            component: UpdateSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          }
        ]
      }/* ,
      ...shortcutRoutes */
    ]
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
