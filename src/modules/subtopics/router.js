import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageSubtopicsModule from './views/Subtopics'
import CreateSubtopicModule from './views/CreateSubtopic'
import UpdateSubtopicModule from './views/UpdateSubtopic'

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-subtopics' },
    children: [
      {
        path: '/subtopics',
        component: Module,
        redirect: { name: 'manage-subtopics' },
        children: [
          {
            path: 'list',
            name: 'manage-subtopics',
            component: ManageSubtopicsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
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
          }
        ]
      }
    ]
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
