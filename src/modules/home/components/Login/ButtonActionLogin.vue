<template>
  <div class="d-flex justify-center">
    <v-btn
      dark
      color="blue darken-3"
      elevation="10"
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
