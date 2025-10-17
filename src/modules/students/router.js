import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageStudentsModule from '@/modules/students/views/Students'

const shortcutRoutes = [
  {
    path: 'alumnos',
    redirect: { name: 'manage-students' },
    meta: {
      middleware: [authMiddleware]
    }
  }
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-students' },
    children: [
      {
        path: '/students',
        component: Module,
        redirect: { name: 'manage-students' },
        children: [
          {
            path: 'list',
            name: 'manage-students',
            component: ManageStudentsModule,
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
  moduleRoute.forEach((route) => router.addRoute(route))
}
