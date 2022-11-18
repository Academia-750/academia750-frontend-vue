import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageSubtopicsModule from './views/Subtopics'

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
          }
        ]
      }
    ]
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
