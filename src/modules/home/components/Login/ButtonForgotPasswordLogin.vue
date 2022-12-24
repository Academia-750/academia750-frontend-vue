<template>
  <div class="d-flex justify-center mt-2">
    <v-btn
      text
      small
      dark
      :color="colorButton"
    >
      {{ textButton }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ButtonForgotPasswordLogin',
  props: {
    textButton: {
      type: String,
      default: 'Olvidé mi contraseña'
    },
    colorButton: {
      type: String,
      default: 'blue darken-3'
    }
  }
}
</script>
