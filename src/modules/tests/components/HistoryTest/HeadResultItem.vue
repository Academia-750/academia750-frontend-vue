<template>
  <v-sheet
    elevation="12"
    class="mx-auto d-flex justify-center align-center"
    height="70"
    width="70"
    :color="getColorQuestion"
  >
    <span v-if="getDataQuestionInHistory" class="title font-weight-black">{{ getDataQuestionInHistory.index }}</span>
  </v-sheet>
</template>

<script>
export default {
  name: 'HeadResultItem',
  props: {
    questionUuid: {
      type: String,
      required: true
    },
    questionsDataHistory: {
      type: Array,
      required: true
    }
  },
  computed: {
    getDataQuestionInHistory() {
      return this.questionsDataHistory.find((question) => question.question_id === this.questionUuid)
    },
    getColorQuestion() {
      const questionState = this.getDataQuestionInHistory.status_question

      if (questionState === 'correct') {
        return 'green lighten-1'
      }

      if (questionState === 'wrong') {
        return 'red lighten-1'
      }

      return 'grey lighten-3'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
