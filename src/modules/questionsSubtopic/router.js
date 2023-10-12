import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageQuestionsSubtopicModule from '@/modules/questionsSubtopic/views/questions'
import CreateQuestionsSubtopicModule from '@/modules/questionsSubtopic/views/CreateQuestion'
import UpdateQuestionsSubtopicModule from '@/modules/questionsSubtopic/views/UpdateQuestion'
import FetchQuestionSubtopicModule from '@/modules/questionsSubtopic/views/FetchQuestion'
import CloneQuestionsSubTopicModule from '@/modules/questionsSubtopic/views/CloneQuestionSubTopic'

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
          },
          {
            path: ':id/subtopics/:subtopic_id/questions/create',
            name: 'create-question-subtopic',
            component: CreateQuestionsSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/subtopics/:subtopic_id/questions/fetch/:question_id',
            name: 'fetch-question-subtopic',
            component: FetchQuestionSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/subtopics/:subtopic_id/questions/update/:question_id',
            name: 'update-question-subtopic',
            component: UpdateQuestionsSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/subtopics/:subtopic_id/questions/clone/:question_id',
            name: 'clone-question-subtopic',
            component: CloneQuestionsSubTopicModule,
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
