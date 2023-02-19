<template>
  <div class="mt-2">
    <div class="d-flex justify-center">
      <span class="font-weight-bold caption">
        Si necesitas ayuda escribenos a
      </span>
    </div>
    <div class="d-flex justify-center">
      <v-btn
        text
        color="primary"
        class="ma-0 pa-0 ml-1 font-weight-bold caption"
        @click="openMailerAcademia"
      >
        {{ mailAcademia }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FooterDialogLogin',
  props: {
    mailAcademia: {
      type: String,
      default: 'hola@academia750.es'
    }
  },
  methods: {
    openMailerAcademia () {
      window.open(`mailto:${this.mailAcademia}`, '_self')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
