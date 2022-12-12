<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    :vid="vid"
    mode="aggressive"
    :name="nameFieldValidate"
  >
    <v-textarea
      ref="ReasonQuestionTextarea"
      v-model="reason_value"
      :disabled="isDisabled"
      label="Explicación"
      placeholder="Explicación de la pregunta"
      filled
      :error-messages="errors"
      name="input-7-4"
    ></v-textarea>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FormReasonTextArea',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      required: true
    },
    vid: {
      type: String,
      required: true
    },
    nameFieldValidate: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      reason_value: ''
    }
  },
  watch: {
    reason_value(value) {
      this.$emit('ReasonQuestionBinding', value)
    }
  },
  methods: {
    onFocusAccesKeyField() {
      this.$refs['ReasonQuestionTextarea']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['ReasonQuestionTextarea']['blur']()
    }
  }
}
</script>
