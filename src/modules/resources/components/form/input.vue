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
      :filled="filled"
      required
      clearable
      :outlined="outlined"
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
      }
    },
    methods: {
      resetErrors() {
        this.$refs.validationProvider.reset()
      }
    }
  }
  </script>
