import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ViewImportFiles from '@/modules/imports/views/files'
import ViewImportRecords from '@/modules/imports/views/records'
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
        path: '/imports',
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
            path: 'files/list',
            name: 'my-imports-files',
            component: ViewImportFiles,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'files/:id/records',
            name: 'my-imports-files-records',
            component: ViewImportRecords,
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
