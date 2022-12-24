<template>
  <v-btn
    :loading="isLoading"
    :disabled="isDisabled"
    block
    x-large
    color="primary"
    @click="$emit('submitForm')"
  >
    Iniciar Sesión
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
    }
  },
  data() {
    return {}
  }
}
</script>
