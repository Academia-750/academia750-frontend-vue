<template>
  <v-menu offset-y left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon class="elevation-2" v-on="on">
        <v-badge
          color="success"
          dot
          bordered
          offset-x="10"
          offset-y="10"
        >
          <v-avatar size="40">
            <v-img v-if="pathImageAccount" :src="pathImageAccount"></v-img>
          </v-avatar>
        </v-badge>
      </v-btn>
    </template>

    <!-- user menu list -->
    <v-list dense nav>
      <v-list-item
        v-for="(item, index) in menu"
        :key="index"
        :to="item.link"
        :exact="item.exact"
        :disabled="item.disabled"
        link
      >
        <v-list-item-icon>
          <v-icon small :class="{ 'grey--text': item.disabled }">{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.key ? $t(item.key) : item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-1"></v-divider>

      <v-list-item @click="logoutAccount">
        <v-list-item-icon>
          <v-icon small>mdi-logout-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('menu.logout') }}</v-list-item-title>
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
      pathImageAccount: null
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
