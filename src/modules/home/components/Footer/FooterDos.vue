<template>
  <div>
    <ul class="lista_footer mt-2">
      <li style="cursor: pointer" @click="scrollToSection('top')">
        <v-icon dark> mdi-chevron-right </v-icon> Inicio
      </li>
      <li
        style="cursor: pointer"
        @click="scrollToSection('why-choose-us')"
      >
        <v-icon dark> mdi-chevron-right </v-icon> Qué ofrecemos
      </li>
      <li
        style="cursor: pointer"
        @click="scrollToSection('pricing')"
      >
        <v-icon dark> mdi-chevron-right </v-icon> Tarifas
      </li>
      <li
        style="cursor: pointer"
        @click="scrollToSection('contact')"
      >
        <v-icon dark> mdi-chevron-right </v-icon> Contáctanos
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'FooterDos',
  methods: {
    scrollToSection(section) {
      const route = this.$route.name
      let targetElement

      if (route === 'oposiciones-bomberos-alicante') {
        // Bomberos Alicante landing page sections
        switch (section) {
          case 'top':
            this.$vuetify.goTo(0, { duration: 600, offset: 0 })

            return

          case 'why-choose-us':
            targetElement = document.querySelector('.why-choose-us-content')
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

          case 'what-includes':
            targetElement = document.querySelector('.why-choose-us-content')
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
          offset: 80,
          easing: 'easeInOutCubic'
        })
      }
    }
  }
}
</script>
<style scoped>
.lista_footer {
  list-style: none;
  padding: 0;
}

.lista_footer li {
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  color: white;
  transition: opacity 0.2s ease;
}

.lista_footer li:hover {
  opacity: 0.8;
}

.lista_footer .v-icon {
  margin-right: 8px;
  font-size: 20px;
}
</style>
