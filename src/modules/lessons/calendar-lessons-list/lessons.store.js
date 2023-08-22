export default {
  name: 'lessonsStore',
  namespaced: true,
  state: {
    lesson: false
  },
  mutations: {
    SET_LESSON(state, payload) {
      state.lesson = payload
    }
  }
}
