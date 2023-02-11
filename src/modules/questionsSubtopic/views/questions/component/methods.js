import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('questionsTopicService', ['setStateVisibilityQuestion']),
    searchFieldExecuted($event) {
      this.searchWord = $event
      this.getQuestions({
        subtopic_id: this.$route.params.subtopic_id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      }).then((response) => {
        this.subtopicData = response.data.meta.subtopic
        this.metaData = response.data.meta
      })
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    ChangeStateVisibilityQuestionSwitchMethod (question_id, $modeVisibleQuestion) {
      this.setStateVisibilityQuestion({
        question_id,
        data: {
          'is-visible-question': $modeVisibleQuestion ? 'yes' : 'no'
        },
        config: {}
      })
    },
    loadDatatatable() {
      this.getQuestions({
        subtopic_id: this.$route.params.subtopic_id,
        config: {
          params: this.buildQueryParamsRequest()
        }
      }).then((response) => {
        this.subtopicData = response.data.meta.subtopic
        this.metaData = response.data.meta
      })
    },
    deleteQuestionConfirm(item) {
      this.currentItemsSelectedForDelete = item
      this.$refs['dialogConfirmDeleteAction'].showDialog = true
    }
  }
}
