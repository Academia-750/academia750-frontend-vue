<template>
  <v-menu offset-y left transition="slide-y-transition" style="z-index: 100 !important;">
    <template v-slot:activator="{ on }">
      <v-btn icon class="elevation-2" style="z-index: 100 !important;" v-on="on">
        <v-badge
          color="success"
          dot
          bordered
          offset-x="10"
          offset-y="10"
          style="z-index: 100 !important;"
        >
          <v-avatar v-if="pathImageAccount" size="40" style="z-index: 100 !important;">
            <v-img
              :src="pathImageAccount"
              style="z-index: 100 !important;"
              @error="loadImageProfileDefault"
            ></v-img>
          </v-avatar>
          <v-skeleton-loader
            v-else-if="!pathImageAccount && !hasErrorImage"
            style="z-index: 100 !important;"
            class="mx-auto"
            max-width="40"
            type="avatar"
          ></v-skeleton-loader>
        </v-badge>
      </v-btn>
    </template>

    <!-- user menu list -->
    <v-list dense nav style="z-index: 100 !important;">
      <v-list-item
        v-for="(item, index) in menu"
        :key="index"
        style="z-index: 100 !important;"
        :to="item.link"
        :exact="item.exact"
        :disabled="item.disabled"
        link
      >
        <v-list-item-icon style="z-index: 100 !important;">
          <v-icon style="z-index: 100 !important;" small :class="{ 'grey--text': item.disabled }">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content style="z-index: 100 !important;">
          <v-list-item-title style="z-index: 100 !important;">{{ item.key ? $t(item.key) : item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1"></v-divider>

      <v-list-item style="z-index: 100 !important;" @click="logoutAccount">
        <v-list-item-icon style="z-index: 100 !important;">
          <v-icon style="z-index: 100 !important;" small>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content style="z-index: 100 !important;">
          <v-list-item-title style="z-index: 100 !important;">{{ $t('menu.logout') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import config from '../../configs'
import logoutActionsMixin from '@/modules/auth/login/resources/logoutActionsMixins'
import { mapState } from 'vuex'
/*
|---------------------------------------------------------------------
| Toolbar User Component
|---------------------------------------------------------------------
|
| Quickmenu for user menu shortcuts on the toolbar
|
*/
export default {
  mixins: [logoutActionsMixin],
  data() {
    return {
      menu: config.toolbar.user,
      pathImageAccount: null,
      hasErrorImage: false
    }
  },
  computed: {
    ...mapState('profileService', ['user'])
  },
  watch: {
    user (value) {
      if (!value) {
        return
      }

      this.loadImageAccount()
    }
  },
  beforeMount () {
    this.loadImageAccount()
  },
  methods: {
    loadImageProfileDefault () {
      this.hasErrorImage = true
      this.pathImageAccount = '/images/academia750/avatar_default_photo.svg'
    },
    loadImageAccount () {
      const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
      const serverApiDevelopment = process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
      const serverApiProduction = process.env.VUE_APP_BASE_URL_API_PRODUCTION
      const { image } = this.$userAuth()?.relationships

      if (!image) {
        this.pathImageAccount = '/images/academia750/avatar_default_photo.svg'

        return
      }

      if (image.attributes.type_path === 'url') {
        this.pathImageAccount = image.attributes.path

        return
      }

      if (image.attributes.type_path === 'local') {
        this.pathImageAccount = `${IsDevelopmentEnviroment ? serverApiDevelopment : serverApiProduction}${image.attributes.path}`

        return
      }
    }
  }
}
</script>
