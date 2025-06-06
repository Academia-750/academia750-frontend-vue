<template>
  <div class="pa-0" style="width: 100% !important">
    <v-app-bar
      :bottom="!isFixedMenu"
      :fixed="isFixedMenu"
      style="z-index: 10 !important"
    >
      <!-- :bottom="!isFixedMenu" :fixed="isFixedMenu" -->
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
    <!-- Add a navigation bar -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      style="z-index: 12 !important"
    >
      <v-list>
        <logo-list-menu />
        <title-list-menu />
      </v-list>
      <v-list rounded nav dense style="z-index: 12 !important">
        <v-list-item-group style="z-index: 12 !important">
          <v-list-item style="z-index: 12 !important" @click="scrollToTop">
            <icon-arrow-link-list-menu />
            <v-list-item-subtitle>Inicio</v-list-item-subtitle>
          </v-list-item>
          <v-list-item
            style="z-index: 12 !important"
            @click="$emit('emitScrollToSectionHomePage', 'OurServiceSection')"
          >
            <icon-arrow-link-list-menu />
            <v-list-item-subtitle>Qué ofrecemos</v-list-item-subtitle>
          </v-list-item>
          <v-list-item
            style="z-index: 12 !important"
            @click="$emit('emitScrollToSectionHomePage', 'tarifasSection')"
          >
            <icon-arrow-link-list-menu />
            <v-list-item-subtitle>Tarifas</v-list-item-subtitle>
          </v-list-item>
          <v-list-item
            style="z-index: 12 !important"
            @click="$emit('emitScrollToSectionHomePage', 'ContactUsForm')"
          >
            <icon-arrow-link-list-menu />
            <v-list-item-subtitle>Contáctanos</v-list-item-subtitle>
          </v-list-item>
          <v-list-item
            style="z-index: 12 !important"
            @click="scrollToSecondLandingPage"
          >
            <icon-arrow-link-list-menu />
            <v-list-item-subtitle>Nueva Landing Page</v-list-item-subtitle>
          </v-list-item>
        </v-list-item-group>
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
import TitleListMenu from './Menu/ListMenu/TitleListMenu'
import IconArrowLinkListMenu from './Menu/ListMenu/IconArrowLinkListMenu'

export default {
  components: {
    LogoMenu,
    LinksMenu,
    LogoListMenu,
    TitleListMenu,
    IconArrowLinkListMenu
  },
  data() {
    return {
      drawer: false,
      items: [
        { text: 'Inicio', key: '' },
        { text: 'Qué ofrecemos', key: 'OurServiceSection' },
        { text: 'Tarifas', key: 'tarifasSection' },
        { text: 'Contáctanos', key: 'ContactUsForm' },
        { text: 'Nueva Landing Page', key: 'SecondLandingPage' }
      ],
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
      //console.log('openNavigationDrawer')
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
      //this.$emit('emitShowLoginDialog')
    },
    handleScroll() {
      this.isFixedMenu = window.scrollY >= 100
    },
    scrollToTop() {
      this.$vuetify.goTo(0)
      this.drawer = false
    },
    scrollToSecondLandingPage() {
      this.$router.push({ name: 'opsiciones-bomberos-alicante' })
      this.drawer = false
    }
  }
}
</script>

<style scoped>
/* .menu_estilo .v-btn:before{
  display: none!important;
}
.menu_estilo button.v-app-bar__nav-icon:hover{
  background-color: #f2f5f8!important;
}
@media(min-width:1025px){
  .menu_estilo header > .v-toolbar__content{
    max-width: 1320px!important;
    margin: auto;
  }
  .menu_estilo header{
    background: #f2f5f8!important;
  }
}
@media(max-width:1024px){
  .boton-acceso{
    display: none;
  }
  .menu_estilo .v-app-bar__nav-icon{
    width: auto;
    justify-content: center;
    position: absolute;
    right: 0;
  }
} */
</style>
