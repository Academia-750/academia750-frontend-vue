import lessonStore from './calendar-lessons-list/lessons.store'
import lessonStudentStore from './lesson-students/lesson-students.store'
import router from './lessons.router'

export default {
  stores: [lessonStudentStore, lessonStore],
  router
}
