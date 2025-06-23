<template>
  <div class="d-none d-sm-none d-md-flex justify-center">
    <v-btn text @click="scrollToSection('top')"> Inicio </v-btn>
    <v-btn
      text
      @click="scrollToSection('services')"
    >
      Qué ofrecemos
    </v-btn>
    <v-btn text @click="navigateToNewLandingPage"> Bomberos Alicante </v-btn>
    <v-btn text @click="scrollToSection('pricing')">
      Tarifas
    </v-btn>
    <v-btn text @click="scrollToSection('contact')">
      Contáctanos
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'LinksMenu',
  methods: {
    navigateToNewLandingPage() {
      this.$router.push({ name: 'opsiciones-bomberos-alicante' })
    },

    scrollToSection(section) {
      const route = this.$route.name
      let targetElement

      if (route === 'opsiciones-bomberos-alicante') {
        // Bomberos Alicante landing page sections
        switch (section) {
          case 'top':
            this.$vuetify.goTo(0, { duration: 600, offset: 0 })

            return

          case 'services':
            targetElement = document.querySelector('.what-includes-content')
            break

          case 'pricing':
            targetElement = document.querySelector('.pricing-content')
            break

          case 'contact':
            targetElement = document.querySelector('.contact-content')
            break
        }
      } else {
        // Home page sections
        switch (section) {
          case 'top':
            this.$vuetify.goTo(0, { duration: 600, offset: 0 })

            return

          case 'services':
            targetElement = document.getElementById('OurServiceSection')
            break

          case 'pricing':
            targetElement = document.getElementById('tarifasSection')
            break

          case 'contact':
            targetElement = document.getElementById('ContactUsForm')
            break
        }
      }

      if (targetElement) {
        this.$vuetify.goTo(targetElement, {
          duration: 600,
          offset: -80,
          easing: 'easeInOutCubic'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
