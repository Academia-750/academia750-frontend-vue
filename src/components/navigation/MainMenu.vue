<template>
  <div v-if="user">
    <v-divider></v-divider>
    <v-list-item class="py-1 px-3" two-line>
      <v-list-item-avatar
        class="ml-n1"
        min-width="40"
        height="40"
        width="40"
      >
        <v-img v-if="pathImageAccount" :src="pathImageAccount" @error="loadImageProfileDefault"/>
        <v-skeleton-loader
          v-else-if="!pathImageAccount && !hasErrorImage"
          class="mx-auto"
          max-width="40"
          type="avatar"
        ></v-skeleton-loader>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title
          class="text-16 font-weight-regular"
        >
          {{ user.attributes.first_name }}
        </v-list-item-title>
        <!-- <v-divider class="d-block" /> -->
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list v-if="user" nav dense>
      <div v-for="(item, index) in menu" :key="index">
        <div v-if="(item.key || item.text) && ( $can(item.can) || $hasRoles(item.roles) )" class="pa-1 mt-2 overline">{{ item.key ? $t(item.key) : item.text }}</div>
        <nav-menu :menu="item.items" />
      </div>
    </v-list>
  </div>
</template>

<script>
import NavMenu from './NavMenu'
import { mapState } from 'vuex'

export default {
  components: {
    NavMenu
  },
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
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
  created () {
    this.loadImageAccount()
    /* //console.log(this.$userAuth())
    //console.log(this.$rolesUserAuth())
    //console.log(this.$permissionsUserAuth()) */
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
      const { image } = this.user?.relationships

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

      //console.log(this.pathImageAccount)
    }
  }
}
</script>
