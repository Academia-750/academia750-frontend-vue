import TestsRepository from '../repositories/TestsRepository'

export default {
  namespaced: true,
  state: {
    itemsDatatable: [],
    ItemsQuestionsByCardsMemory: [],
    ItemsQuestionsByTests: [],
    questionsDataHistoryByTest: [],
    questionsDataResolved: [],
    stateLoadingItems: false,
    fetchTestModuleNumberQuestionsResolved: 0,
    fetchTestModuleTotalNumberQuestionsTest: 0,
    informationMeta: {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 10,
      total: 10
      /* Esta información es la que por defecto le daremos al datatable, en lo que asíncronamente cargan los datos, y después colocar la información de la paginación que trae el servidor */
    }
  },
  getters: {
    get_user_authenticated(state) {
      return state.user
    },
    get_permissions(state) {
      const permissionsOfEachRole = state.user
        ? state.user.relationships.roles.data.map((role) => {
            return role.relationships.permissions.data.map((permission) => {
              return permission.attributes.permissionName
            })
          })
        : []

      const permissions = []

      permissionsOfEachRole.forEach((permission) => {
        permission.forEach((item) => {
          permissions.push(item)
        })
      })

      return permissions
    },
    get_roles(state) {
      return state.user
        ? state.user.relationships.roles.data.map((role) => {
            return role.attributes.roleName
          })
        : []
    },
    get_is_verified_email(state) {
      return state.user.attributes.email_verified_at
        ? state.user.attributes.email_verified_at
        : 'El correo no ha sido verificado'
    }
  },
  mutations: {
    SET_INFORMATION_META(state, payload) {
      state.informationMeta = payload
    },
    SET_ITEMS_DATATABLE(state, payload) {
      state.itemsDatatable = payload
    },
    SET_STATUS_LOADING_ITEMS(state, payload) {
      state.stateLoadingItems = payload
    },
    SET_ITEMS_QUESTIONS_BY_CARDS_MEMORY(state, payload) {
      state.ItemsQuestionsByCardsMemory = payload
    },
    SET_ITEMS_QUESTIONS_BY_TESTS(state, payload) {
      state.ItemsQuestionsByTests = payload
    },
    SET_QUESTIONS_DATA_HISTORY_BY_TEST(state, payload) {
      state.questionsDataHistoryByTest = payload
    },
    SET_QUESTIONS_DATA_RESOLVED(state, payload) {
      state.questionsDataResolved = payload
    },
    SET_NUMBER_QUESTIONS_RESOLVED(state, payload) {
      state.fetchTestModuleNumberQuestionsResolved = payload
    },
    SET_TOTAL_NUMBER_QUESTIONS_TEST(state, payload) {
      state.fetchTestModuleTotalNumberQuestionsTest = payload
    }
  },
  actions: {
    mapItemsDatatableFromApi: (itemsApi) => {
      return itemsApi.map((record) => {
        return {
          id: record.id,
          'created-at': record.attributes.created_at,
          'test-questions-count':
            record.attributes.number_of_questions_generated
        }
      })
    },

    mapMetaInformationPagination: (response) => {
      return {
        current_page: response.data.meta.current_page,
        from: response.data.meta.from,
        last_page: response.data.meta.last_page,
        per_page: response.data.meta.per_page,
        to: response.data.meta.to,
        total: response.data.meta.total
      }
    },

    createAQuiz: async (_, options) => {
      try {
        const response = await TestsRepository.generateTestWithQuestions(
          options.data,
          options.config
        )

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
    },

    claimQuestion: async (_, options) => {
      try {
        const response = await TestsRepository.claimQuestion(
          options.data,
          options.config
        )

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
    },

    resolveQuestion: async (_, options) => {
      try {
        const response = await TestsRepository.resolveQuestion(
          options.data,
          options.config
        )

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
    },

    closeAndGradeTest: async (_, options) => {
      try {
        const response = await TestsRepository.closeAndGradeTest(
          options.test_id,
          options.data,
          options.config
        )

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
    },

    sortQuestionsByIndexTest: async (questions_data, questions) => {
      return questions_data.map((question_reference) => {
        return questions.find(
          (question) => question.id === question_reference.question_id
        )
      })
    },

    fetchAQuiz: async ({ commit }, options) => {
      try {
        commit('SET_ITEMS_QUESTIONS_BY_TESTS', [])
        commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', [])

        const response = await TestsRepository.fetchUnresolvedTest(
          options.test_id,
          options.config
        )

        commit('SET_ITEMS_QUESTIONS_BY_TESTS', response.data.data)
        commit(
          'SET_QUESTIONS_DATA_HISTORY_BY_TEST',
          response.data.meta.questions_data
        )

        return response
      } catch (error) {
        commit('SET_ITEMS_QUESTIONS_BY_TESTS', [])
        commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', [])

        return Promise.reject(error)
      }
    },

    fetchHistoryTestComplete: async ({ commit }, options) => {
      try {
        commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', [])
        const response = await TestsRepository.fetchHistoryTestComplete(
          options.test_id,
          options.config
        )

        const { data: questions } = response.data
        const { questions_data } = response.data.meta

        //commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', sortQuestionsByIndexTest(questions_data, questions))
        commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', response.data.data)

        return Promise.resolve(response)
      } catch (error) {
        commit('SET_QUESTIONS_DATA_HISTORY_BY_TEST', [])
        //console.log(error)

        return Promise.reject(error)
      }
    },
    fetchACardMemory: async ({ commit }, options) => {
      try {
        commit('SET_ITEMS_QUESTIONS_BY_CARDS_MEMORY', [])
        const response = await TestsRepository.fetchCardMemory(
          options.test_id,
          options.config
        )

        commit('SET_ITEMS_QUESTIONS_BY_CARDS_MEMORY', response.data.data)

        return Promise.resolve(response)
      } catch (error) {
        commit('SET_ITEMS_QUESTIONS_BY_CARDS_MEMORY', [])
        //console.log(error)

        return Promise.reject(error)
      }
    },
    getUnresolvedTests: async ({ commit }, config) => {
      try {
        commit('SET_INFORMATION_META', {
          current_page: 1,
          from: 1,
          last_page: 1,
          per_page: 10,
          to: 10,
          total: 10
        })
        commit('SET_STATUS_LOADING_ITEMS', true)

        commit('SET_ITEMS_DATATABLE', [])

        const response = await TestsRepository.getUnresolvedTests(config)

        if (response) {
          //console.trace(response)

          commit(
            'SET_ITEMS_DATATABLE',
            mapItemsDatatableFromApi(response.data.data)
          )
          commit('SET_STATUS_LOADING_ITEMS', false)
          commit('SET_INFORMATION_META', mapMetaInformationPagination(response))
        }

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
    },
    getCardsMemory: async ({ commit }, config) => {
      try {
        commit('SET_INFORMATION_META', {
          current_page: 1,
          from: 1,
          last_page: 1,
          per_page: 10,
          to: 10,
          total: 10
        })
        commit('SET_STATUS_LOADING_ITEMS', true)

        commit('SET_ITEMS_DATATABLE', [])

        const response = await TestsRepository.getCardsMemory(config)

        if (response) {
          //console.trace(response)

          commit(
            'SET_ITEMS_DATATABLE',
            mapItemsDatatableFromApi(response.data.data)
          )
          commit('SET_STATUS_LOADING_ITEMS', false)
          commit('SET_INFORMATION_META', mapMetaInformationPagination(response))
        }

        return Promise.resolve(response)
      } catch (error) {
        //console.log(error)

        return Promise.reject(error)
      }
    }
  }
}
