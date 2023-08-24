export default {
  name: 'lessonsStore',
  namespaced: true,
  state: {
    lesson: false,
    date: '',
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
  }
}
