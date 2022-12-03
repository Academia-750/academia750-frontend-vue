import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageQuestionsSubtopicModule from '@/modules/questionsSubtopic/views/questions'
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
    redirect: { name: 'manage-questions-of-subtopic' },
    children: [
      {
        path: '/topics',
        component: Module,
        children: [
          /* {
            path: 'update',
            redirect: { name: 'manage-questions-of-subtopic' },
            meta: {
              middleware: [authMiddleware]
            }
          }, */
          {
            path: ':id/subtopics/:subtopic_id/questions/list',
            name: 'manage-questions-of-subtopic',
            component: ManageQuestionsSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          }/* ,
          {
            path: ':id/questions/create',
            name: 'create-subtopic',
            component: CreateSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/questions/update/:subtopic_id',
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
