<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    vid="comment"
    mode="aggressive"
    name="comment"
    :rules="rules"
  >
    <v-textarea
      :value="value"
      :error-messages="errors"
      name="input-7-4"
      label="comment"
      :filled="true"
      required
      clearable
      @input="$emit('input', $event)"
    />
  </ValidationProvider>
</template>

<script>
export default {
  name: 'CommentFieldInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      required: true
    }
  },
  methods: {
      resetErrors() {
        this.$refs.validationProvider.reset()
      }
    }
}
</script>
