import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import TestsCompletedModule from './views/TestsCompleted'
import ResumeModule from './views/Resume'

const shortcutRoutes = [
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'fetch-history-tests-completed' },
    children: [
      {
        path: '/history-my-account',
        component: Module,
        redirect: { name: 'fetch-history-tests-completed' },
        children: [
          {
            path: 'fetch/tests-completed',
            name: 'fetch-history-tests-completed',
            component: TestsCompletedModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'fetch/resume-my-data',
            name: 'fetch-resume-my-data-student',
            component: ResumeModule,
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
