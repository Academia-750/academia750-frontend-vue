<template>
  <div>
    <p>
      Cambiar contraseña
      <v-btn @click="redirectToBug">
        sdpgsadg
      </v-btn>
    </p>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToBug () {
      this.$router.push({
        name: 'update-my-profile'
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
