import store from './store/index'
import studentsMaterialsStore from './views/StudentsMaterial/students-materials.store'
import router from './router'

export default {
  stores: [store, studentsMaterialsStore],
  router
}
