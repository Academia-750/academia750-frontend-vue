<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    vid="is-test"
    mode="aggressive"
    name="Pregunta para cuestionario"
  >
    <v-checkbox
      v-model="is_test"
      color="success"
      :disabled="isDisabled"
      :error-messages="errors"
      :readonly="readonly"
      :label="`Es para Test: ${question_for_test_label}`"
    ></v-checkbox>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FormQuestionTypeTestCheckbox',
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
    }
  },
  data() {
    return {
      is_test: true
    }
  },
  computed: {
    question_for_test_label () {
      return this.is_test ? 'Si' : 'No'
    }
  },
  watch: {
    is_test(value) {
      this.$emit('QuestionIsTestBinding', value)
    }
  },
  methods: {
    resetIsTest() {
      this.is_test = true
    }
  }
}
</script>
