import lessonStore from './calendar-lessons-list/lessons.store'
import lessonStudentStore from './lesson-students/lesson-students.store'
import lessonMaterialsStore from './lesson-material-list/lesson.material.store'
import materialsForLessonStore from './materials-for-lesson-list/materials-for-lesson.store'
import lessonAttendeesStore from './lesson-attendees/lesson-attendees.store'
import studentLessonStore from './student-lessons/student-lessons.store'
import router from './lessons.router'
import { makeMaterialStore } from './_common/students-materials-base/students-materials.store'
import studentsAssessmentsListStore from './student-assessments/assessment-list/students-assessments-list.store'

export default {
  stores: [
    lessonStudentStore,
    lessonStore,
    lessonMaterialsStore,
    materialsForLessonStore,
    studentLessonStore,
    lessonAttendeesStore,
    makeMaterialStore('studentsMaterialsStore'),
    makeMaterialStore('studentsRecordingsStore'),
    makeMaterialStore('studentsAssessmentsStore'),
    makeMaterialStore('studentsLessonMaterialsStore'),
    makeMaterialStore('studentsLessonRecordingsStore'),
    makeMaterialStore('studentsLessonAssessmentsStore'),
    studentsAssessmentsListStore
  ],
  router
}
