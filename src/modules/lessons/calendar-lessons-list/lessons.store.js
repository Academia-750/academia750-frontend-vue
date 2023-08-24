export default {
  name: 'lessonsStore',
  namespaced: true,
  state: {
    lesson: false,
    date: ''
  },
  mutations: {
    SET_LESSON(state, payload) {
      state.lesson = payload
    },
    SET_DATE(state, payload) {
      state.lesson = payload
    }
  }
}
