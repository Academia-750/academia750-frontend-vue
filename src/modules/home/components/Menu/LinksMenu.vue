<template>
  <div class="d-none d-sm-none d-md-flex justify-center">
    <v-btn text @click="$vuetify.goTo(0)"> Inicio </v-btn>
    <v-btn
      text
      @click="$emit('emitScrollToSectionHomePage', 'OurServiceSection')"
    >
      Qué ofrecemos
    </v-btn>
    <v-btn text @click="navigateToNewLandingPage"> Bomberos Alicante </v-btn>

    <v-btn text @click="$emit('emitScrollToSectionHomePage', 'tarifasSection')">
      Tarifas
    </v-btn>
    <v-btn text @click="$emit('emitScrollToSectionHomePage', 'ContactUsForm')">
      Contáctanos
    </v-btn>
    <v-btn text @click="navigateToNewLandingPage"> Join us </v-btn>
  </div>
</template>

<script>
export default {
  name: 'LinksMenu',
  methods: {
    navigateToNewLandingPage() {
      this.$router.push({ name: 'opsiciones-bomberos-alicante' })
    }
  }
  //.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style lang="scss" scoped></style>
