<template>
  <v-container class="pa-0 menu_estilo">
    <v-app-bar elevate-on-scroll> <!-- :bottom="!isFixedMenu" :fixed="isFixedMenu" -->
      <v-app-bar-nav-icon
        class="d-flex d-sm-flex d-md-none"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <logo-menu />
      <v-spacer></v-spacer>
      <links-menu @emitScrollToSectionHomePage="$emit('emitScrollToSectionHomePage', $event)"/>
      <v-spacer></v-spacer>
      <v-btn class="mr-lg-0 mr-4" @click="executeLoginAccountAction">
        <v-icon>mdi-account-circle</v-icon> <span class="ml-1">Acceso</span>
      </v-btn>
    </v-app-bar>
    <!-- Add a navigation bar -->
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list>
        <logo-list-menu />
        <title-list-menu />
      </v-list>
      <v-list
        rounded
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item>
            <icon-arrow-link-list-menu />
            <v-list-item-subtitle @click="$vuetify.goTo(0)">Inicio</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <icon-arrow-link-list-menu />
            <v-list-item-subtitle @click="$emit('emitScrollToSectionHomePage', 'OurServiceSection')">Qué ofrecemos</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <icon-arrow-link-list-menu />
            <v-list-item-subtitle @click="$emit('emitScrollToSectionHomePage', 'tarifasSection')">Tarifas</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <icon-arrow-link-list-menu />
            <v-list-item-subtitle @click="$emit('emitScrollToSectionHomePage', 'ContactUsForm')">Contáctanos</v-list-item-subtitle>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-container>
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
  data () {
    return {
      drawer: false,
      items: [
        { text: 'Inicio',
          key: ''
        },
        { text: 'Qué ofrecemos',
          key: 'OurServiceSection'
        },
        { text: 'Tarifas',
          key: 'tarifasSection'
        },
        { text: 'Contáctanos',
          key: 'ContactUsForm'
        }
      ],
      isFixedMenu: false
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
    executeLoginAccountAction () {
      if (Cookies.get('authorization')) {
        this.$router.push({
          name: 'update-my-profile'
        })

        return
      }

      this.$emit('emitShowLoginDialog')
    },
    handleScroll() {
      this.isFixedMenu = window.scrollY >= 100
    }
  }
}
</script>

<style scoped>
.menu_estilo .v-btn:before{
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
}

</style>
