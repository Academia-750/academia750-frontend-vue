import store from './store/index'
import studentsMaterialsStore from './views/StudentsMaterials/students-materials.store'
import studentsRecordingsStore from './views/StudentsRecordings/students-recordings.store'
import router from './router'

export default {
  stores: [store, studentsMaterialsStore, studentsRecordingsStore],
  router
}
