<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="code"
    mode="aggressive"
    name="comment"
    :rules="rules"
  >
    <v-textarea
      :error-messages="errors"
      name="input-7-4"
      label="comment"
      :filled="true"
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
  }
}
</script>
