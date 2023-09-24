import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageStudentsModule from '@/modules/students/views/Students'
import ManageStudentsLessonsModule from '@/modules/students/views/StudentsLessons'
import ManageStudentsMaterialsRecordingsModule from '@/modules/students/views/StudentsMaterial'

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
          },
          {
            path: 'lessons',
            name: 'manage-students-lessons',
            component: ManageStudentsLessonsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'materials',
            name: 'manage-students-materials',
            component: ManageStudentsMaterialsRecordingsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'recordings',
            name: 'manage-students-recordings',
            component: ManageStudentsMaterialsRecordingsModule,
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
