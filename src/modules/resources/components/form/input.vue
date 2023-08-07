<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    vid="workspace-name"
    mode="aggressive"
    name="Nombre"
    :rules="rules"
  >
    <v-text-field
      :value="value"
      name="name"
      :error-messages="errors"
      :label="label"
      required
      clearable
      outlined
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
      },
      label: {
        type: String,
        default: ''
      }
    },
    methods: {
      resetErrors() {
        this.$refs.validationProvider.reset()
      }
    }
  }
  </script>
