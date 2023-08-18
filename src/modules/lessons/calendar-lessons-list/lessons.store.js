export default {
  name: 'lessonsStore',
  namespaced: true,
  state: {
    lesson: {}
  },
  mutations: {
    SET_LESSON(state, payload) {
      state.lesson = payload
    }
  }
}