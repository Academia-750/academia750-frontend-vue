<template>
  <v-btn small color="success" dark class="mx-1 align-self-center">
    <span v-if="$vuetify.breakpoint.width >= widthLimit" class="font-weight-bold mr-1">{{ textButton }}</span>
    <v-icon small dark>{{ iconButton }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ResourceButtonImport',
  props: {
    widthLimit: {
      type: Number,
      default: 425
    },
    textButton: {
      type: String,
      default: 'Agregar'
    },
    iconButton: {
      type: String,
      default: 'mdi-file-import'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
