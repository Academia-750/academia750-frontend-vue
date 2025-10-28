import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageSpacesModule from './index'
import StudentSpaces from './student-spaces'

/**
 * STUDENT ROUTES FOR SPACES
 */
const studentRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'my-spaces' },
    children: [
      {
        path: 'my-spaces',
        component: Module,
        redirect: { name: 'my-spaces' },
        children: [
          {
            path: 'list',
            name: 'my-spaces',
            component: StudentSpaces,
            meta: {
              middleware: [authMiddleware]
            }
          }
        ]
      }
    ]
  }
]

/**
 * ADMIN ROUTES FOR SPACES MANAGEMENT
 */
const adminRoute = [
  {
    path: '/spaces',
    component: Module,
    redirect: { name: 'manage-spaces' },
    children: [
      {
        path: 'list',
        name: 'manage-spaces',
        component: ManageSpacesModule,
        meta: {
          middleware: [authMiddleware]
        }
      }
    ]
  }
]

export default (router) => {
  adminRoute.forEach((route) => router.addRoute(route))
  studentRoute.forEach((route) => router.addRoute(route))
}
