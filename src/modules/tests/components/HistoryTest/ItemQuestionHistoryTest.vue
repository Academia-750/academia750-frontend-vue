<template>
  <v-container>
    <!-- <p class="font-weight-bold my-3">{{ getDataQuestionInHistory }}</p> -->
    <p class="text--darken-3 mt-2 mb-3 font-weight-bold subtitle-1"> {{ getDataQuestionInHistory.index }}. - <span class="font-weight-black">{{ question?.attributes['question-text'] }}</span></p>
    <answers-state-question-history-test
      :question="question"
      :answers="question.relationships.answers.data"
      :questions-data-history="questionsDataHistory"
    />
    <reason-question-history-test :question="question"/>
    <v-divider class="grey lighten-2 my-1"></v-divider>
  </v-container>
</template>

<script>
import AnswersStateQuestionHistoryTest from '@/modules/tests/components/HistoryTest/AnswersStateQuestionHistoryTest'
import ReasonQuestionHistoryTest from '@/modules/tests/components/HistoryTest/ReasonQuestionHistoryTest'

export default {
  name: 'ItemQuestionHistoryTest',
  components: {
    AnswersStateQuestionHistoryTest,
    ReasonQuestionHistoryTest
  },
  props: {
    question: {
      type: Object,
      required: true
    },
    questionsDataHistory: {
      type: Array,
      required: true
    }
  },
  computed: {
    getDataQuestionInHistory() {
      return this.questionsDataHistory.find((question) => question.question_id === this.question.id)
    }
  }
}
</script>
