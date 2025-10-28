import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import AppModule from './app'
import spacesStore from '@/modules/spaces/spaces.store'
import studentSpacesStore from '@/modules/spaces/student-spaces/student-spaces.store'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    spacesStore: spacesStore,
    studentSpacesStore: studentSpacesStore
  }
})

export default store
