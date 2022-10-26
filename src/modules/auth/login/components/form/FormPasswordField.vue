<template>
  <ValidationProvider
    v-slot="{ errors }"
    mode="aggressive"
    vid="password"
    name="Contraseña"
    rules="required|max:100"
  >
    <v-text-field
      ref="passwordField"
      v-model="password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      :error-messages="errors"
      label="Contraseña"
      :disabled="isDisabled"
      outlined
      required
      @keyup.enter="$emit('submitForm')"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'LoginFormPasswordField',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      password: '',
      showPassword: false
    }
  },
  watch: {
    password(value) {
      this.$emit('passwordBinding', value)
    }
  },
  methods: {
    resetPassword() {
      this.password = ''
    },
    onBlurPasswordField() {
      this.$refs['passwordField']['blur']()
    }
  }
}
</script>
