import moment from 'moment'
import Vue from 'vue'

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
    UPDATE_LESSON(state, { index, lesson }) {
      Vue.set(state.lessons, index, lesson)
    },
    SET_DATE(state, payload) {
      state.date = payload
    },
    SET_TYPE(state, payload) {
      state.type = payload
    }
  },
  actions: {
    updateJoinLesson({ commit, state }, { lessonId, value }) {
      // Update the lesson on the array
      const index = state.lessons.findIndex((lesson) => lesson.id === lessonId)

      if (index < 0) {
        return
      }

      const updatedLesson = {
        ...state.lessons[index],
        will_join: value ? 1 : 0 // But the object expects 1 or 0. Update current selected and on the array
      }

      commit('UPDATE_LESSON', { index, lesson: updatedLesson })
      commit('SET_LESSON', updatedLesson)
    },
    setLesson({ commit }, payload) {
      commit('SET_LESSON', payload)

      // We also clear the tables related to the student selected lesson
    }
  }
}
