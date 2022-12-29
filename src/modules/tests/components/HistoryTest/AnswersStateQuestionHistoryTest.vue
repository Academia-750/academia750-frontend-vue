<template>
  <v-container>
    <p
      v-for="(answer, index) in answers"
      :key="index"
      class="subtitle-2 font-weight-bold"
    >{{ answer.attributes.answer_text }}</p>
  </v-container>
</template>

<script>
export default {
  name: 'AnswersStateQuestionHistoryTest',
  props: {
    question: {
      type: Object,
      required: true
    },
    answers: {
      type: Array,
      required: true
    },
    questionsDataHistory: {
      type: Array,
      required: true
    }
  }
}
</script>
