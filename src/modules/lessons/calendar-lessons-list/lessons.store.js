export default {
  name: 'lessonsStore',
  namespaced: true,
  state: {
    lesson: null
  },
  mutations: {
    SET_LESSON(state, payload) {
      state.lesson = payload
    }
  }
}