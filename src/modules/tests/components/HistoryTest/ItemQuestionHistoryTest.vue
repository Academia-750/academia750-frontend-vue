<template>
  <v-container class="pt-8">
    <!-- <p class="font-weight-bold my-3">{{ getDataQuestionInHistory }}</p> -->
    <p class="text--darken-3 mt-2 mb-3 font-weight-bold subtitle-1">
      {{ getDataQuestionInHistory.index }}. -
      <span class="font-weight-black">{{
        question?.attributes['question-text']
      }}</span>
      <span
        v-if="questionIsUnanswered"
        class="font-weight-bold color-unsanswered-question ml-2"
      >
        (No respondida)
      </span>
    </p>
    <answers-state-question-history-test
      :question="question"
      :answers="getAnswersOfQuestion"
      :questions-data-history="questionsDataHistory"
    />
    <reason-question-history-test :question="question" class="my-2" />
    <claim-question-history-test :question="question" class="my-2" />
    <v-divider class="grey lighten-2 my-1"></v-divider>
  </v-container>
</template>

<script>
import AnswersStateQuestionHistoryTest from '@/modules/tests/components/HistoryTest/AnswersStateQuestionHistoryTest'
import ReasonQuestionHistoryTest from '@/modules/tests/components/HistoryTest/ReasonQuestionHistoryTest'
import ClaimQuestionHistoryTest from '@/modules/tests/components/HistoryTest/ClaimQuestionHistoryTest'

export default {
  name: 'ItemQuestionHistoryTest',
  components: {
    AnswersStateQuestionHistoryTest,
    ReasonQuestionHistoryTest,
    ClaimQuestionHistoryTest
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
  data() {
    return {
      answers: []
    }
  },
  computed: {
    getDataQuestionInHistory() {
      return this.questionsDataHistory.find(
        (question) => question.question_id === this.question.attributes.id
      )
    },
    questionIsUnanswered() {
      return this.getDataQuestionInHistory?.status_question === 'unanswered'
    },
    getAnswersOfQuestion() {
      return this.shuffleAnswers(this.question.relationships.answers.data)
    }
  },
  methods: {
    shuffleAnswers(answers) {
      const answersNoGrouper = answers.filter(
        (answer) => answer.attributes.is_grouper_answer === 'no'
      )
      const answersGrouper = answers.filter(
        (answer) => answer.attributes.is_grouper_answer === 'yes'
      )

      answersNoGrouper.sort(() => Math.random() - 0.5)

      answersGrouper.forEach((answerGrouper) => {
        answersNoGrouper.push(answerGrouper)
      })

      return answersNoGrouper
    }
  }
}
</script>

<style scoped>
.color-unsanswered-question {
  background-color: #d0b838;
}
</style>
