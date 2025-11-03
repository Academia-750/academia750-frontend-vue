<template>
  <div>
    <progress-circular-loading-app
      v-if="displayProgressCircularLoading || !user"
    />
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
            <div
              class="d-flex justify-start"
              style="cursor: pointer"
              @click="redirectToHomePage"
            >
              <span style="cursor: pointer">
                <v-img
                  class="align-self-center"
                  :src="require('@/assets/images/logo.png')"
                  max-height="40"
                  max-width="40"
                ></v-img>
              </span>
              <span
                class="text-uppercase white--text font-weight-bold text-xs-caption text-sm-h6 align-self-center"
                to="/"
                >{{ product.name }}</span
              >
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
            <v-btn dark block color="#FF0000" @click="logoutAccount">
              <v-icon left> mdi-logout </v-icon>
              {{ $t('menu.logout') }}
            </v-btn>
          </div>
          <!-- Version Display -->
          <version-display />
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
        <v-card
          class="flex-grow-1 d-flex"
          :class="[isToolbarDetached ? 'pa-1 mt-3 mx-1' : 'pa-0 ma-0']"
          :flat="!isToolbarDetached"
        >
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
              <v-app-bar-nav-icon
                style="z-index: 100 !important"
                @click.stop="drawer = !drawer"
              ></v-app-bar-nav-icon>
              <v-spacer style="z-index: 100 !important"></v-spacer>
              <progress-linear-state-test
                v-if="$router.currentRoute.name === 'fetch-questionnaire'"
                :number-questions-resolved="
                  fetchTestModuleNumberQuestionsResolved
                "
                :total-number-questions-test="
                  fetchTestModuleTotalNumberQuestionsTest
                "
              />
              <v-spacer style="z-index: 100 !important"></v-spacer>
              <div
                :class="[$vuetify.rtl ? 'ml-1' : 'mr-1']"
                style="z-index: 100 !important"
              >
                <toolbar-notifications style="z-index: 100 !important" />
              </div>
              <toolbar-user style="z-index: 100 !important" />
            </div>
          </div>
        </v-card>
      </v-app-bar>
      <v-main>
        <progress-linear-loading-app v-if="displayProgressLinearLoading" />
        <v-container
          :class="'fill-height ' + (isMobile ? 'pa-0' : '')"
          :fluid="!isContentBoxed"
        >
          <v-layout>
            <slot></slot>
          </v-layout>
        </v-container>
        <v-footer app inset>
          <v-spacer></v-spacer>
          <div class="overline">
            <span class="caption d-none d-sm-none d-md-inline">
              👨‍🚒👩‍🚒Academia de oposiciones a Bomber@s
            </span>
            .<!-- <v-icon small color="pink">mdi-heart</v-icon> -->
            <span style="cursor: pointer" class="text-decoration-none">
              @{{ product.name }}
            </span>
          </div>
          <version-display />
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
/* import ToolbarLanguage from '../components/toolbar/ToolbarLanguage' */
/* import ToolbarCurrency from '../components/toolbar/ToolbarCurrency' */
import ToolbarNotifications from '../components/toolbar/ToolbarNotifications'
import ProgressCircularLoadingApp from '@/modules/loading/components/ProgressCircularLoadingApp.vue'
import ProgressLinearLoadingApp from '@/modules/loading/components/ProgressLinearLoadingApp.vue'
import ProgressLinearStateTest from '@/modules/tests/views/FetchTest/components/progressLinearStateTest'
import VersionDisplay from '@/components/common/VersionDisplay.vue'

export default {
  components: {
    MainMenu,
    ToolbarUser,
    /* ToolbarApps, */
    /* ToolbarLanguage, */
    /* ToolbarCurrency, */
    ToolbarNotifications,
    ProgressCircularLoadingApp,
    ProgressLinearLoadingApp,
    ProgressLinearStateTest,
    VersionDisplay
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
    ...mapState('app', [
      'product',
      'isContentBoxed',
      'menuTheme',
      'toolbarTheme',
      'isToolbarDetached'
    ]),
    ...mapState('loadingService', [
      'displayProgressCircularLoading',
      'displayProgressLinearLoading'
    ]),
    ...mapState('profileService', ['user']),
    ...mapState('testsService', [
      'fetchTestModuleNumberQuestionsResolved',
      'fetchTestModuleTotalNumberQuestionsTest'
    ]),
    classTextByTheme() {
      return {
        'white--text': this.$vuetify.theme.isDark,
        'black--text': !this.$vuetify.theme.isDark
      }
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  mounted() {
    this.$loadUserAuth()
    localize(this.$i18n.locale)
  },
  methods: {
    onKeyup(e) {
      this.$refs.search.focus()
    },
    redirectToHomePage() {
      this.$router.push({
        name: 'home-website'
      })
    }
  }
}
</script>

<style scoped>
.buy-button {
  box-shadow: 1px 1px 18px #ee44aa;
}
</style>
