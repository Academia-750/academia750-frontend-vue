import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageSubtopicsModule from '@/modules/subtopicsOfTopic/views/Subtopics'
/* import CreateSubtopicModule from '@/modules/subtopicsOfTopic/views/CreateSubtopic'
import UpdateSubtopicModule from '@/modules/subtopicsOfTopic/views/UpdateSubtopic' */

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
        redirect: { name: 'manage-subtopics-of-topic' },
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
          }/* ,
          {
            path: 'create',
            name: 'create-subtopic',
            component: CreateSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'update/:id',
            name: 'update-subtopic',
            component: UpdateSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          } */
        ]
      }/* ,
      ...shortcutRoutes */
    ]
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
