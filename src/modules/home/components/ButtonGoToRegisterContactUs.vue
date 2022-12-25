<template>
  <v-btn
    rounded
    dark
    color="blue darken-1"
    class="pa-3"
    @click="executeRegisterContactUs"
  >
    Únete
  </v-btn>
</template>

<script>
export default {
  name: 'ButtonGoToRegisterContactUs',
  methods: {
    executeRegisterContactUs () {

      this.$emit('executeRegisterContactUs')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
