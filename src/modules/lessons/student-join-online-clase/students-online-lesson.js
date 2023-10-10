export default {
  name: 'studentOnlineLessonStore',
  namespaced: true,
  state: {
    currentUserForUpdate: null,
    tags: [],
    lessons: []
  },
  getters: {
  },

  mutations: {
    SET_TAGS(state, payload) {
      state.tags = payload
    },
    SET_LESSONS(state, payload) {
      state.lessons = payload
    }
  },
  actions: {
    resetTableOptions({ commit }) {
      DataTableStore.actions.resetTableOptions({ commit })
      commit('SET_TAGS', [])
      commit('SET_LESSONS', [])
    }
  }
}
