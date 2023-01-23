<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    :vid="vid"
    mode="aggressive"
    :name="nameFieldValidate"
    :rules="rulesReasonTextQuestion"
  >
    <v-textarea
      ref="ReasonQuestionTextarea"
      v-model="reason_value"
      :disabled="isDisabled"
      label="Explicación"
      placeholder="Explicación de la pregunta"
      filled
      :clearable="clearable"
      :readonly="readonly"
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
    vid: {
      type: String,
      required: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    nameFieldValidate: {
      type: String,
      required: true
    },
    isCardMemory: {
      type: Boolean,
      required: true
    },
    hasReasonImage: {
      type: Boolean,
      required: true
    },
    isThereImageQuestionUpdate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      reason_value: ''
    }
  },
  computed: {
    rulesReasonTextQuestion () {
      return this.reason_value || (this.isCardMemory && !this.hasReasonImage && !this.isThereImageQuestionUpdate && !this.reason_value) ? 'requiredReasonByCardMemoryQuestion|max:400' : ''
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
