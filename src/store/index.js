import Vue from 'vue'
import Vuex from 'vuex'

// Global vuex
import AppModule from './app'
import spacesStore from '@/modules/spaces/spaces.store'

Vue.use(Vuex)

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
  modules: {
    app: AppModule,
    spacesStore: spacesStore
  }
})

export default store
