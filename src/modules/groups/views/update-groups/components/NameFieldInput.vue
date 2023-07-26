<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="group-name"
    mode="aggressive"
    name="Nombre"
    :rules="rules"
  >
    <v-text-field
      :value="value"
      name="name"
      :error-messages="errors"
      label="Nombre"
      :filled="true"
      required
      clearable
      @input="$emit('input', $event)"
    >
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'NombreFieldInput',
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
