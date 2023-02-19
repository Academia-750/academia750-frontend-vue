<template>
  <v-btn
    :loading="isLoading"
    :disabled="isDisabled"
    is-button-block
    large
    color="primary"
    @click="$emit('submitForm')"
  >
    {{ buttonText }}
  </v-btn>
</template>

<script>
export default {
  name: 'LoginFormButtonSubmit',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    buttonText: {
      type: String,
      default: 'Iniciar sesión'
    },
    isButtonBlock: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  }
}
</script>
