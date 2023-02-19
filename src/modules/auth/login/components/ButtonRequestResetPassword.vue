<template>
  <div class="mt-5">
    <router-link :to="pathObjectRoute" class="font-weight-bold caption">
      {{ textButton }}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ButtonResetPassword',
  props: {
    textButton: {
      type: String,
      default: '¿Se te olvidó tu contraseña?'
    },
    pathObjectRoute: {
      type: Object,
      default: function () {
        return {
          name: 'request-reset-password'
        }
      }
    }
  }
}
</script>
