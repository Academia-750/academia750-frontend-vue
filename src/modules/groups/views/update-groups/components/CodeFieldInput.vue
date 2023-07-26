<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="code"
    mode="aggressive"
    name="Codigo"
    :rules="rules"
  >
    <v-text-field
      v-model="value"
      name="group_code"
      :error-messages="errors"
      :disabled="true"
      :filled="true"
      label="Código"
      required
      clearable
    />
  </ValidationProvider>
</template>

<script>
export default {
  name: 'CodigoFieldInput',
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
