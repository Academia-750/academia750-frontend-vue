<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    :vid="name"
    mode="aggressive"
    :name="label"
    :rules="rules"
  >
    <v-textarea
      :value="value"
      :error-messages="errors"
      :name="name"
      :label="label"
      :filled="true"
      required
      clearable
      :disabled="disabled"
      @input="$emit('input', $event)"
    />
  </ValidationProvider>
</template>

<script>
export default {
  name: 'TextAreaInput',
  props: {
    name: {
      type: String,
      default: '',
      require: true
    },
    label: {
      type: String,
      default: '',
      require: true
    },
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    resetErrors() {
      this.$refs.validationProvider.reset()
    }
  }
}
</script>
