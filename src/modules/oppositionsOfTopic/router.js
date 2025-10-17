import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageOppositionsModule from '@/modules/oppositionsOfTopic/views/Oppositions'
import ManageAssignOppositionToTopic from '@/modules/oppositionsOfTopic/views/AssignOpposition'
import ManageUpdateSubtopicsOppositionByTopic from '@/modules/oppositionsOfTopic/views/UpdateSubtopicsOpposition'
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
    redirect: { name: 'manage-oppositions-of-topic' },
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
            path: ':id/oppositions/list',
            name: 'manage-oppositions-of-topic',
            component: ManageOppositionsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/opposition/assing',
            name: 'assing-opposition-to-topic',
            component: ManageAssignOppositionToTopic,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/opposition/:opposition_id/subtopics/update',
            name: 'update-subtopics-opposition-by-topic',
            component: ManageUpdateSubtopicsOppositionByTopic,
            meta: {
              middleware: [authMiddleware]
            }
          }
          /* ,
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
  moduleRoute.forEach((route) => router.addRoute(route))
}
