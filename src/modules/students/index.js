import store from './store/index'
import studentsLessonsStore from './views/StudentsLessons/students-lessons-store'
import router from './router'

export default {
  store: [store, studentsLessonsStore],
  router
}
