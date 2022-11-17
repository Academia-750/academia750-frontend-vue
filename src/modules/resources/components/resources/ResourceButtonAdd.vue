<template>
  <v-btn
    small
    color="primary"
    dark
    class="mx-1 align-self-center"
    @click="goToRouteCreateRecord"
  >
    <span v-if="$vuetify.breakpoint.width >= widthLimit" class="font-weight-bold mr-1">{{ textButton }}</span>
    <v-icon small dark>{{ iconButton }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ResourceButtonAdd',
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
      default: 'mdi-plus'
    },
    configRoute: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToRouteCreateRecord () {
      this.$router.push(
        this.configRoute
      )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
