import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageQuestionsTopicModule from '@/modules/questionsTopic/views/questions'
import importQuestions from '@/modules/questionsTopic/views/import'
import CreateQuestionsTopicModule from './views/CreateQuestion'
import FetchQuestionTopicModule from './views/FetchQuestion'
import UpdateQuestionsTopicModule from './views/UpdateQuestion'
import CloneQuestionsTopicModule from './views/CloneQuestion'
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
    redirect: { name: 'manage-questions-of-topic' },
    children: [
      {
        path: '/topics',
        component: Module,
        children: [
          /* {
            path: 'update',
            redirect: { name: 'manage-questions-of-topic' },
            meta: {
              middleware: [authMiddleware]
            }
          }, */
          {
            path: ':id/questions/list',
            name: 'manage-questions-of-topic',
            component: ManageQuestionsTopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'imports/questions',
            name: 'import-questions',
            component: importQuestions,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/questions/create',
            name: 'create-question-topic',
            component: CreateQuestionsTopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/questions/fetch/:question_id',
            name: 'fetch-question-topic',
            component: FetchQuestionTopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/questions/update/:question_id',
            name: 'update-question-topic',
            component: UpdateQuestionsTopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/questions/clone/:question_id',
            name: 'clone-question-topic',
            component: CloneQuestionsTopicModule,
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
