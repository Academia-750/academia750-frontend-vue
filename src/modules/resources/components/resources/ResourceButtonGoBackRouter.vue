<template>
  <v-btn
    color="blue lighten-4 mr-1"
    elevation="24"
    small
    @click="goBackRouter"
  >
    <v-icon dark small>
      mdi-arrow-left
    </v-icon>
    <span v-if="$vuetify.breakpoint.width >= widthNumberLimit" class="ml-1 font-weight-bold">Volver</span>
  </v-btn>
</template>

<script>
export default {
  name: 'ResourceButtonGoBackRouter',
  props: {
    pathRouteGoBack: {
      type: [Object],
      default: undefined
    },
    numbersPagesGoBack: {
      type: Number,
      default: -1
    },
    widthNumberLimit: {
      type: Number,
      default: 420
    }
  },
  methods: {
    goBackRouter () {
      if (this.pathRouteGoBack) {
        this.$router.push(this.pathRouteGoBack)

        return
      }

      this.$router.go(this.numbersPagesGoBack)

      return
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
