<template>
  <v-row dense>
    <v-col
      v-for="(question) in questions"
      :key="`Head-History-Question-State-${question.id}`"
      cols="12"
      sm="6"
      md="4"
      lg="4"
      xl="4"
      class="d-flex justify-center"
    >
      <v-sheet
        class="py-2"
        width="100%"
        color="grey lighten-3"
      >
        <head-result-item :question-uuid="question.id" :questions-data-history="questionsDataHistory" />
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import HeadResultItem from './HeadResultItem'

export default {
  name: 'ResumeQuestionStateHistoryTest',
  components: {
    HeadResultItem
  },
  props: {
    questionsDataHistory: {
      type: Array,
      required: true
    },
    questions: {
      type: Array,
      required: true
    }
  }
}
</script>
