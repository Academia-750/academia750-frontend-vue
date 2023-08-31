<template>
  <p class="subtitle-2 font-weight-bold pa-2" :class="getClassAnswerBlock">
    <!-- {{ getIndexAnswerQuestion }}  -->{{ answer.attributes.answer_text }}
  </p>
</template>

<script>
export default {
  name: 'AnswerItemHistoryTest',
  props: {
    answerCorrect: {
      type: Object,
      required: true
    },
    answer: {
      type: Object,
      required: true
    },
    questionHistory: {
      type: Object,
      required: true
    },
    index: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    getIndexAnswerQuestion() {
      const indexAnswers = ['a)', 'b)', 'c)', 'd)']

      return indexAnswers[this.index]
    },
    getClassAnswerBlock() {
      if (
        this.questionHistory.status_question === 'unanswered' &&
        this.answerCorrect.id === this.answer.id
      ) {
        return 'green darken-1 white--text'
      }

      if (
        this.questionHistory.status_question === 'correct' &&
        this.answerCorrect.id === this.answer.id
      ) {
        return 'green darken-1 white--text'
      }

      if (
        this.questionHistory.status_question === 'wrong' &&
        // The questionHistoryAnswer Id is not an UUID.
        this.questionHistory.answer_id === this.answer.attributes.id
      ) {
        return 'red darken-1 white--text'
      }

      if (
        this.questionHistory.status_question === 'wrong' &&
        this.answerCorrect.id === this.answer.id
      ) {
        return 'secondary'
      }

      return ''
    }
  }
}
</script>
