<template>
  <div class="d-none d-sm-none d-md-flex justify-center">
    <v-btn text @click="$vuetify.goTo(0)">
      Inicio
    </v-btn>
    <v-btn text @click="$emit('emitScrollToSectionHomePage', 'OurServiceSection')">
      Qué ofrecemos
    </v-btn>
    <v-btn text @click="$emit('emitScrollToSectionHomePage', 'tarifasSection')">
      Tarifas
    </v-btn>
    <v-btn text @click="$emit('emitScrollToSectionHomePage', 'ContactUsForm')">
      Contáctanos
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'LinksMenu'
  //.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style lang="scss" scoped>

</style>
