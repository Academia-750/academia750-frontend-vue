<template>
  <v-row dense>
    <v-col
      v-for="(question) in questions"
      :key="`Head-History-Question-State-${question.id}`"
      cols="3"
      sm="1"
      md="1"
      lg="1"
      xl="1"
      class="d-flex justify-center"
    >

      <head-result-item :question="question" :questions-data-history="questionsDataHistory" @scrollToElementRefQuestion="$emit('scrollToElementRefQuestion', $event)" />
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
