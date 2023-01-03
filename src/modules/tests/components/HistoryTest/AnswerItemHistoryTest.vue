<template>
  <p
    class="subtitle-2 font-weight-bold pa-2"
    :class="getClassAnswerBlock"
  >
    {{ answer.attributes.answer_text }}
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
    }
  },
  computed: {
    getClassAnswerBlock() {
      if ( this.questionHistory.status_question === 'unanswered' && this.answerCorrect.id === this.answer.id ) {
        return 'green darken-1 white--text'
      }

      if ( this.questionHistory.status_question === 'correct' && this.answerCorrect.id === this.answer.id) {
        return 'green darken-1 white--text'
      }

      if (this.questionHistory.status_question === 'wrong' && this.questionHistory.answer_id === this.answer.id) {
        return 'red darken-1 white--text'
      }

      if (this.questionHistory.status_question === 'wrong' && this.answerCorrect.id === this.answer.id) {
        return 'secondary'
      }

      return ''
    }
  }
}
</script>
