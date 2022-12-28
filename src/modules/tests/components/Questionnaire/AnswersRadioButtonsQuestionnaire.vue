<template>
  <v-radio-group
    v-model="answer_selected_id"
    column
  >
    <v-radio
      v-for="answer in answers"
      :key="answer.value"
      :label="answer.answer"
      :value="answer.value"
    ></v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: 'AnswersRadioButtonsQuestionnaire',
  props: {
    answers: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      answer_selected_id: null
    }
  },
  watch: {
    answer_selected_id(value) {
      this.$emit('AnswerSelectedBinding', value)
    }
  }
}
</script>
