<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    :vid="id"
    mode="aggressive"
    :name="label"
    :rules="rules"
  >
    <v-text-field
      :value="value"
      :name="id"
      :error-messages="errors"
      :label="label"
      :filled="filled"
      required
      clearable
      :outlined="outlined"
      :disabled="disabled"
      @input="$emit('input', $event)"
    >
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputField',
  props: {
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    filled: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: true
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
