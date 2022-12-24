<template>
  <div>
    <v-app-bar bottom elevate-on-scroll>
      <v-app-bar-nav-icon
        class="d-flex d-sm-flex d-md-none"
        @click="drawer = true"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img src="/images/academia750/logo.svg"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="d-none d-sm-none d-md-flex justify-center">
        <v-btn text>
          Inicio
        </v-btn>
        <v-btn text>
          Qué ofrecemos
        </v-btn>
        <v-btn text>
          Tarifas
        </v-btn>
        <v-btn text>
          Contáctanos
        </v-btn>
      </div>
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
        <v-list-item>
          <v-list-item-avatar size="60">
            <v-img src="/images/academia750/logo.svg"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Menú
            </v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
      <v-list
        rounded
        nav
        dense
      >
        <v-list-item-group>
          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-icon>
              <v-icon>mdi-arrow-right-drop-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-subtitle @click="tab = index">{{ item }}</v-list-item-subtitle>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      drawer: false,
      tab: null,
      items: [
        'Inicio', 'Qué ofrecemos', 'Tarifas', 'Contáctanos'
      ]
    }
  },
  computed: {
    ...mapState('profileService', ['user'])
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
    }
  }
}
</script>
