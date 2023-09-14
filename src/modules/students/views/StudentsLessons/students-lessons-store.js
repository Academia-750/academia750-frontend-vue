export default {
    name: 'studentsLessonsStore',
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
    },
    actions: {
      setLesson({ dispatch, commit }, payload) {
        commit('SET_LESSON', payload)
  
        // We also clear the tables related to the selected lesson
        dispatch('lessonMaterialsStore/resetTableOptions', null, { root: true })
        dispatch(
          'lessonMaterialsStore/setTableItems',
          { results: [], total: 0 },
          { root: true }
        )
  
        dispatch('lessonStudentStore/resetTableOptions', null, { root: true })
        dispatch(
          'lessonStudentStore/setTableItems',
          { results: [], total: 0 },
          { root: true }
        )
  
        dispatch('materialsForLessonStore/resetTableOptions', null, {
          root: true
        })
        dispatch(
          'materialsForLessonStore/setTableItems',
          { results: [], total: 0 },
          { root: true }
        )
      }
    }
  }