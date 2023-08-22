<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    :vid="id"
    mode="aggressive"
    :name="label"
    :rules="rules"
  >
    <v-textarea
      :id="id"
      :value="value"
      :error-messages="errors"
      :name="id"
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
    id: {
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
