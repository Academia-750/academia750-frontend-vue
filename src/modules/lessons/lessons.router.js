import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageLessonsModule from './calendar-lessons-list'
import CreateLessonsModule from './create-lesson'
import AddStudentToLessonsModule from './lesson-students'
import AddMaterialsToLessonsModule from './lesson-material-list'
import ListOfMaterialsForLessonsModule from './materials-for-lesson-list'
import StudentLessons from './student-lessons'
import StudentMaterialsPage from './student-materials/student-materials-page'
import StudentLessonMaterialsPage from './student-materials/student-lesson-material-page'
import StudentRecordingPage from './student-recordings/student-recordings-page'
import StudentLessonRecordingPage from './student-recordings/student-lesson-recording-page'
import StudentAssessmentPage from './student-assessments/material-list/student-assessments-page'
import StudentLessonAssessmentPage from './student-assessments/material-list/student-lesson-assessment-page'
import StudentAssessmentDetailPage from './student-assessments/assessment-detail/student-assessment-detail-page'
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
            path: ':id/materials',
            name: 'student-lesson-materials',
            component: StudentLessonMaterialsPage,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/recordings',
            name: 'student-lesson-recordings',
            component: StudentLessonRecordingPage,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/assessments',
            name: 'student-lesson-assessments',
            component: StudentLessonAssessmentPage,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'assessments/:assessmentId',
            name: 'student-assessment-detail',
            component: StudentAssessmentDetailPage,
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
          },
          {
            path: 'manage',
            name: 'manage-group-lessons',
            component: ManageLessonsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/materials',
            name: 'student-list-of-materials',
            component: ListOfMaterialsForLessonsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/list/materials',
            name: 'student-add-materials',
            component: AddMaterialsToLessonsModule,
            meta: {
              middleware: [authMiddleware]
            }
          }
        ]
      },
      {
        path: 'student-materials',
        name: 'manage-students-materials',
        component: StudentMaterialsPage,
        meta: {
          middleware: [authMiddleware]
        }
      },
      {
        path: 'student-recordings',
        name: 'manage-students-recordings',
        component: StudentRecordingPage,
        meta: {
          middleware: [authMiddleware]
        }
      },
      {
        path: 'student-assessments-materials',
        name: 'manage-students-assessments-materials',
        component: StudentAssessmentPage,
        meta: {
          middleware: [authMiddleware]
        }
      },
      {
        path: 'student-assessments',
        name: 'manage-students-assessments',
        component: () =>
          import(
            /* webpackChunkName: "StudentAssessmentsListPage" */ './student-assessments/assessment-list/student-assessments-list-page.vue'
          ),
        meta: {
          middleware: [authMiddleware]
        }
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
  adminRoute.forEach((route) => router.addRoute(route))
  studentRoute.forEach((route) => router.addRoute(route))
}
