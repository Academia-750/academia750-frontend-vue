<template>
  <div class="d-flex justify-center">
    <v-btn
      color="blue darken-3 white--text"
      elevation="10"
      :loading="isLoading"
      :disabled="isDisabled"

      @click="$emit('emitActionLogin')"
    >
      {{ textButton }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ButtonActionLogin',
  props: {
    textButton: {
      type: String,
      default: 'Acceder'
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
