import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageStudentsModule from '@/modules/students/views/Students'
import ManageStudentsLessonsModule from '@/modules/students/views/StudentsLessons'
/* import CreateTopicModule from '@/modules/students/views/CreateTopic'
import UpdateTopicModule from '@/modules/students/views/UpdateTopic' */

const shortcutRoutes = [
  {
    path: 'alumnos',
    redirect: { name: 'manage-students' },
    meta: {
      middleware: [authMiddleware]
    }
  } /* ,
  {
    path: 'alumnos/crear',
    redirect: { name: 'create-student' },
    meta: {
      middleware: [authMiddleware]
    }
  } */
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
          /* {
            path: 'update',
            redirect: { name: 'manage-students' },
            meta: {
              middleware: [authMiddleware]
            }
          }, */
          {
            path: 'list',
            name: 'manage-students',
            component: ManageStudentsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'lessons',
            name: 'manage-students-lessons',
            component: ManageStudentsLessonsModule,
            meta: {
              middleware: [authMiddleware]
            }
          }
          /* ,
          {
            path: 'create',
            name: 'create-topic',
            component: CreateTopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'update/:id',
            name: 'update-topic',
            component: UpdateTopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          } */
        ]
      },
      ...shortcutRoutes
    ]
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
