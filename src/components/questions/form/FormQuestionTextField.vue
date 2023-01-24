<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    vid="question-text"
    mode="aggressive"
    name="Pregunta"
    :rules="rules"
    class="w-100"
  >
    <v-text-field
      ref="question-text-field"
      v-model="question_text"
      label="Pregunta"
      placeholder="Escribe la pregunta"
      :error-messages="errors"
      :disabled="isDisabled"
      :readonly="readonly"
      filled
      required
      :clearable="clearable"
      @keyup.enter="$emit('submitForm')"
    >
      <template v-slot:prepend>
        <v-icon class="d-none d-sm-none d-md-block">
          mdi-chat-question
        </v-icon>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FormQuestionTextField',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      question_text: ''
    }
  },
  watch: {
    question_text(value) {
      this.$emit('QuestionTextBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.question_text = ''
    },
    onFocusAccesKeyField() {
      this.$refs['question-text-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['question-text-field']['blur']()
    }
  }
}
</script>

<style scoped>
  .w-100 {
    width: 100% !important;
  }
</style>
