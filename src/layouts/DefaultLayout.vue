<template>
  <div>
    <progress-circular-loading-app v-if="displayProgressCircularLoading"/>
    <section
      v-else
      v-shortkey="['ctrl', '/']"
      class="d-flex flex-grow-1"
      @shortkey="onKeyup"
    >
      <!-- Navigation -->
      <v-navigation-drawer
        v-model="drawer"
        app
        floating
        class="elevation-1"
        :right="$vuetify.rtl"
        :light="menuTheme === 'light'"
        :dark="menuTheme === 'dark'"
      >
        <!-- Navigation menu info -->
        <template v-slot:prepend>
          <div class="pa-2">
            <div class="d-flex justify-start">
              <span
                style="cursor: pointer;"
                to="/"
              >
                <v-img
                  class="align-self-center"
                  :src="require('@/assets/images/logo.png')"
                  max-height="40"
                  max-width="40"
                ></v-img>
              </span>
              <span
                class="text-uppercase white--text font-weight-bold text-xs-caption text-sm-h6 align-self-center"
                style="cursor: pointer;"
                to="/"
              >{{ product.name }}</span>
            </div>
            <!-- <div class="overline grey--text">{{ product.version }}</div> -->
          </div>
        </template>
        <v-divider dark></v-divider>
        <!-- Navigation menu -->
        <main-menu :menu="navigation.menu" />
        <!-- Navigation menu footer -->
        <template v-slot:append>
          <!-- Footer navigation links -->
          <div class="pa-1 text-center">
            <v-btn
              v-for="(item, index) in navigation.footer"
              :key="index"
              :href="item.href"
              :target="item.target"
              small
              text
            >
              {{ item.key ? $t(item.key) : item.text }}
            </v-btn>
          </div>
          <!-- REMOVE ME - Shop Demo purposes -->
          <div class="pa-2 pt-1 text-center">
            <v-btn
              class="buy-button"
              dark
              block
              color="#EE44AA"
              @click="logoutAccount"
            >
              <v-icon left>
                mdi-logout
              </v-icon>
              {{ $t('menu.logout') }}
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
      <!-- Toolbar -->
      <v-app-bar
        app
        :color="isToolbarDetached ? 'surface' : undefined"
        :flat="isToolbarDetached"
        :light="toolbarTheme === 'light'"
        :dark="toolbarTheme === 'dark'"
      >
        <v-card class="flex-grow-1 d-flex" :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']" :flat="!isToolbarDetached">
          <div class="d-flex flex-grow-1 align-center">
            <!-- search input mobile -->
            <v-text-field
              v-if="showSearch"
              append-icon="mdi-close"
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
              hide-details
              solo
              flat
              autofocus
              @click:append="showSearch = false"
            ></v-text-field>
            <div v-else class="d-flex flex-grow-1 align-center">
              <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
              <v-spacer class="d-none d-lg-block"></v-spacer>
              <!-- search input desktop -->
              <v-text-field
                ref="search"
                class="mx-1 hidden-xs-only"
                :placeholder="$t('menu.search')"
                prepend-inner-icon="mdi-magnify"
                hide-details
                filled
                rounded
                dense
              ></v-text-field>
              <v-spacer class="d-block d-sm-none"></v-spacer>
              <v-btn class="d-block d-sm-none" icon @click="showSearch = true">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <toolbar-language />
              <!-- <div class="hidden-xs-only mx-1">
                <toolbar-currency />
              </div> -->
              <!-- <toolbar-apps /> -->
              <div :class="[$vuetify.rtl ? 'ml-1' : 'mr-1']">
                <toolbar-notifications />
              </div>
              <toolbar-user />
            </div>
          </div>
        </v-card>
      </v-app-bar>
      <v-main>
        <progress-linear-loading-app v-if="displayProgressLinearLoading" />
        <v-container class="fill-height" :fluid="!isContentBoxed">
          <v-layout>
            <slot></slot>
          </v-layout>
        </v-container>
        <v-footer app inset>
          <v-spacer></v-spacer>
          <div class="overline">
            <span class="caption d-none d-sm-none d-md-inline">
              Preparación integral de las oposiciones a bomber@
            </span>
            .<v-icon small color="pink">mdi-heart</v-icon>
            <span
              style="cursor: pointer;"
              class="text-decoration-none"
            >@{{ product.name }}</span>
          </div>
        </v-footer>
      </v-main>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// navigation menu configurations
import config from '../configs'
import { localize } from 'vee-validate'
import logoutActionsMixin from '@/modules/auth/login/resources/logoutActionsMixins'

import MainMenu from '../components/navigation/MainMenu'
import ToolbarUser from '../components/toolbar/ToolbarUser'
/* import ToolbarApps from '../components/toolbar/ToolbarApps' */
import ToolbarLanguage from '../components/toolbar/ToolbarLanguage'
/* import ToolbarCurrency from '../components/toolbar/ToolbarCurrency' */
import ToolbarNotifications from '../components/toolbar/ToolbarNotifications'
import ProgressCircularLoadingApp from '@/modules/loading/components/ProgressCircularLoadingApp.vue'
import ProgressLinearLoadingApp from '@/modules/loading/components/ProgressLinearLoadingApp.vue'

export default {
  components: {
    MainMenu,
    ToolbarUser,
    /* ToolbarApps, */
    ToolbarLanguage,
    /* ToolbarCurrency, */
    ToolbarNotifications,
    ProgressCircularLoadingApp,
    ProgressLinearLoadingApp
  },
  mixins: [logoutActionsMixin],
  data() {
    return {
      drawer: null,
      showSearch: false,

      navigation: config.navigation
    }
  },
  computed: {
    ...mapState('app', ['product', 'isContentBoxed', 'menuTheme', 'toolbarTheme', 'isToolbarDetached']),
    ...mapState('loadingService', ['displayProgressCircularLoading', 'displayProgressLinearLoading']),
    classTextByTheme () {

      return {
        'white--text': this.$vuetify.theme.isDark,
        'black--text': !this.$vuetify.theme.isDark
      }
    }
  },
  mounted () {
    localize(this.$i18n.locale)
  },
  methods: {
    onKeyup(e) {
      this.$refs.search.focus()
    }
  }
}
</script>

<style scoped>
.buy-button {
  box-shadow: 1px 1px 18px #ee44aa;
}
</style>
