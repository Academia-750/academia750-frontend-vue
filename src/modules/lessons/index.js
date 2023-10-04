import lessonStore from './calendar-lessons-list/lessons.store'
import lessonStudentStore from './lesson-students/lesson-students.store'
import lessonMaterialsStore from './lesson-material-list/lesson.material.store'
import materialsForLessonStore from './materials-for-lesson-list/materials-for-lesson.store'
import lessonAttendeesStore from './lesson-attendees/lesson-attendees.store'
import studentLessonStore from './student-lessons/student-lessons.store'
import studentsMaterialsStore from './student-materials/students-materials.store'
import studentsRecordingsStore from './student-recordings/students-recordings.store'
import router from './lessons.router'

export default {
  stores: [
    lessonStudentStore,
    lessonStore,
    lessonMaterialsStore,
    materialsForLessonStore,
    studentLessonStore,
    lessonAttendeesStore,
    studentsMaterialsStore,
    studentsRecordingsStore
  ],
  router
}
