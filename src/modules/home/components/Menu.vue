<template>
  <div class="pa-0" style="width: 100% !important">
    <v-app-bar
      :bottom="!isFixedMenu"
      :fixed="isFixedMenu"
      style="z-index: 10 !important"
    >
      <v-app-bar-nav-icon
        class="d-flex d-sm-flex d-md-none"
        @click="openNavigationDrawer"
      ></v-app-bar-nav-icon>
      <logo-menu />
      <v-spacer></v-spacer>
      <links-menu
        @emitScrollToSectionHomePage="
          $emit('emitScrollToSectionHomePage', $event)
        "
      />
      <v-spacer></v-spacer>
      <v-btn class="mr-lg-0 mr-4" @click="executeLoginAccountAction">
        <v-icon>mdi-account-circle</v-icon>
        <span class="ml-1">Área privada</span>
      </v-btn>
    </v-app-bar>
    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      style="z-index: 12 !important"
    >
      <v-list>
        <logo-list-menu />
      </v-list>
      <v-list class="pa-4">
        <v-btn
          text
          block
          class="justify-start mb-2"
          @click="scrollToSection('top')"
        >
          <v-icon left>mdi-chevron-right</v-icon>
          Inicio
        </v-btn>
        <v-btn
          text
          block
          class="justify-start mb-2"
          @click="scrollToSection('why-choose-us')"
        >
          <v-icon left>mdi-chevron-right</v-icon>
          Qué ofrecemos
        </v-btn>
        <v-btn
          text
          block
          class="justify-start mb-2"
          @click="scrollToSection('pricing')"
        >
          <v-icon left>mdi-chevron-right</v-icon>
          Tarifas
        </v-btn>
        <v-btn
          text
          block
          class="justify-start mb-2"
          @click="scrollToSection('contact')"
        >
          <v-icon left>mdi-chevron-right</v-icon>
          Contáctanos
        </v-btn>
        <v-divider class="my-4"></v-divider>
        <v-btn
          block
          class="justify-start"
          @click="executeLoginAccountAction"
        >
          <v-icon left>mdi-account-circle</v-icon>
          Área privada
        </v-btn>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Cookies from 'js-cookie'
import LogoMenu from './Menu/LogoMenu'
import LinksMenu from './Menu/LinksMenu'
import LogoListMenu from './Menu/ListMenu/LogoListMenu'

export default {
  components: {
    LogoMenu,
    LinksMenu,
    LogoListMenu
  },
  data() {
    return {
      drawer: false,
      isFixedMenu: false,
      allowedFixedMenu: true
    }
  },
  computed: {
    ...mapState('profileService', ['user'])
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations('profileService', ['set_user']),
    openNavigationDrawer() {
      this.drawer = true
    },
    executeLoginAccountAction() {
      if (Cookies.get('authorization')) {
        this.$router.push({
          name: this.$initialPage()
        })

        return
      }
      this.$router.push({
        name: 'login'
      })
    },
    handleScroll() {
      this.isFixedMenu = window.scrollY >= 100
    },
    scrollToSection(section) {
      const route = this.$route.name
      let targetElement

      if (route === 'oposiciones-bomberos-alicante') {
        // Bomberos Alicante landing page sections
        switch (section) {
          case 'top':
            this.$vuetify.goTo(0, { duration: 600, offset: 0 })
            this.drawer = false

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
            this.drawer = false

            return

          case 'why-choose-us':
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
        this.drawer = false
      }
    }
  }
}
</script>

<style scoped>
.v-btn {
  text-transform: none !important;
  letter-spacing: normal !important;
}
</style>
