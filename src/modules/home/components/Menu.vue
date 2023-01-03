<template>
  <v-container class="pa-0 menu_estilo">
    <v-app-bar :bottom="!isFixedMenu" :fixed="isFixedMenu" elevate-on-scroll>
      <v-app-bar-nav-icon
        class="d-flex d-sm-flex d-md-none"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <logo-menu />
      <v-spacer></v-spacer>
      <links-menu />
      <v-spacer></v-spacer>
      <v-btn @click="executeLoginAccountAction">
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
          <v-list-item v-for="(item, index) in items" :key="index">
            <icon-arrow-link-list-menu />

            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
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
        'Inicio', 'Qué ofrecemos', 'Tarifas', 'Contáctanos'
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
<style>
@media(min-width:1025px){
  .menu_estilo header > .v-toolbar__content{
    max-width: 1320px!important;
    margin: auto;
  }
  header{
    background: #f2f5f8!important;
  }
}

</style> 
