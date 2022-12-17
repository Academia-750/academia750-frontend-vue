import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import GenerateTestModule from './views/GenerateTest'

const shortcutRoutes = [
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'generate-questionnaire' },
    children: [
      {
        path: '/tests',
        component: Module,
        redirect: { name: 'generate-questionnaire' },
        children: [
          {
            path: 'list',
            name: 'generate-questionnaire',
            component: GenerateTestModule,
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
