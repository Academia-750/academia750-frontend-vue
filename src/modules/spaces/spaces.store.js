import moment from 'moment'

export default {
  name: 'spacesStore',
  namespaced: true,
  state: {
    lesson: false,
    date: moment().format('YYYY-MM-DD'),
    type: 'month'
  },
  mutations: {
    SET_LESSON(state, payload) {
      state.lesson = payload
    },
    SET_DATE(state, payload) {
      state.date = payload
    },
    SET_TYPE(state, payload) {
      state.type = payload
    }
  },
  actions: {
    setLesson({ commit }, payload) {
      commit('SET_LESSON', payload)
    }
  }
}
