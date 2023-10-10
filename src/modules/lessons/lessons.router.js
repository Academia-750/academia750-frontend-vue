import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageLessonsModule from './calendar-lessons-list'
import CreateLessonsModule from './create-lesson'
import AddStudentToLessonsModule from './lesson-students'
import AddMaterialsToLessonsModule from './lesson-material-list'
import ListOfMaterialsForLessonsModule from './materials-for-lesson-list'
import StudentLessons from './student-lessons'
import ManageStudentsMaterialsModule from './student-materials'
import ManageStudentsRecordingsModule from './student-recordings'
import LessonAttendeesModule from './lesson-attendees'
import StudentLessonOnlineModule from './student-join-online-clase'

/**
 * STUDENT ROUTES
 */

const studentRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'my-lessons' },
    children: [
      {
        path: 'lessons',
        component: Module,
        redirect: { name: 'my-lessons' },
        children: [
          {
            path: 'list',
            name: 'my-lessons',
            component: StudentLessons,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'materials',
            name: 'manage-students-materials',
            component: ManageStudentsMaterialsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'recordings',
            name: 'manage-students-recordings',
            component: ManageStudentsRecordingsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'online/:id',
            name: 'join-online-class',
            component: StudentLessonOnlineModule,
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
 * ADMIN ROUTES
 */
const adminRoute = [
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
            path: ':id/attendees',
            name: 'manage-lesson-attendees',
            component: LessonAttendeesModule,
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
          },
          {
            path: ':id/students',
            name: 'add-students',
            component: AddStudentToLessonsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/list/materials',
            name: 'add-materials',
            component: AddMaterialsToLessonsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/materials',
            name: 'list-of-materials',
            component: ListOfMaterialsForLessonsModule,
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
  router.addRoutes(adminRoute)
  router.addRoutes(studentRoute)
}
