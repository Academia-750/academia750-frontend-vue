import moment from 'moment'

export default {
  name: 'studentLessonsStore',
  namespaced: true,
  state: {
    lesson: false,
    lessons: [],
    date: moment().format('YYYY-MM-DD'),
    type: 'month'
  },
  mutations: {
    SET_LESSON(state, payload) {
      state.lesson = payload
    },
    SET_LESSONS(state, payload) {
      state.lessons = payload
    },
    SET_DATE(state, payload) {
      state.date = payload
    },
    SET_TYPE(state, payload) {
      state.type = payload
    }
  },
  actions: {
    setLesson({ dispatch, commit }, payload) {
      commit('SET_LESSON', payload)

      // We also clear the tables related to the student selected lesson
    }
  }
}
