<template>
  <v-container>
    <!-- <p class="font-weight-bold my-3">{{ getDataQuestionInHistory }}</p> -->
    <p class="text--darken-3 mt-2 mb-3 font-weight-bold"> {{ getDataQuestionInHistory.index }}. - <span class="font-weight-black">{{ question?.attributes['question-text'] }}</span></p>
    <answers-state-question-history-test
      :question="question"
      :answers="question.relationships.answers.data"
      :questions-data-history="questionsDataHistory"
    />
  </v-container>
</template>

<script>
import AnswersStateQuestionHistoryTest from '@/modules/tests/components/HistoryTest/AnswersStateQuestionHistoryTest'

export default {
  name: 'ItemQuestionHistoryTest',
  components: {
    AnswersStateQuestionHistoryTest
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
