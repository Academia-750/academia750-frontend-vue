<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="code"
    mode="aggressive"
    name="Codigo"
    :rules="rules"
  >
    <v-text-field
      id="__group_code"
      ref="code-group-field"
      v-model="value"
      class="mx-3"
      max-width="330"
      name="__group_code"
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
    }
  }
}
</script>
