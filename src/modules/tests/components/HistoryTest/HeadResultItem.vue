<template>
  <v-sheet
    class="py-1 cursor-pointer d-flex justify-center"
    width="100%"
    :color="getColorQuestion"
    @click="
      $emit(
        'scrollToElementRefQuestion',
        `element-item-question-result-${question.id}`
      )
    "
  >
    <span v-if="getDataQuestionInHistory" class="title font-weight-black">{{
      getDataQuestionInHistory.index
    }}</span>
  </v-sheet>
</template>

<script>
export default {
  name: 'HeadResultItem',
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
      return this.questionsDataHistory.find(
        (question) => question.question.uuid === this.question.id
      )
    },
    getColorQuestion() {
      const questionState = this.getDataQuestionInHistory.status_question

      if (questionState === 'correct') {
        return 'green lighten-1'
      }

      if (questionState === 'wrong') {
        return 'red lighten-1'
      }

      return '#D0B838'
    }
  }
}
</script>

<style lang="scss" scoped></style>
