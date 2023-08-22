import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageLessonsModule from './calendar-lessons-list'
import CreateLessonsModule from './create-lesson'

const shortcutRoutes = [
  {
    path: 'lecciones',
    redirect: { name: 'manage-lessons' },
    meta: {
      middleware: [authMiddleware]
    }
  }
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-lessons' },
    children: [
      {
        path: '/lesson',
        component: Module,
        redirect: { name: 'manage-lessons' },
        children: [
          {
            path: 'list',
            name: 'manage-lessons',
            component: ManageLessonsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'create',
            name: 'create-lessons',
            component: CreateLessonsModule,
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
