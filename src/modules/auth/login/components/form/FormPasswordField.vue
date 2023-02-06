<template>
  <ValidationProvider
    v-slot="{ errors }"
    ref="PasswordValidationProvider"
    mode="eager"
    vid="password"
    name="Contraseña"
    :rules="rules"
  >
    <v-text-field
      id="password"
      ref="passwordField"
      v-model="password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showPassword ? 'text' : 'password'"
      :error-messages="errors"
      name="password"
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
    },
    rules: {
      type: String,
      required: true
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
      this.$refs['PasswordValidationProvider']['reset']()
    },
    onBlurPasswordField() {
      this.$refs['passwordField']['blur']()
    }
  }
}
</script>
