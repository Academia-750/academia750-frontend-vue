<template>
  <v-list v-if="user" nav dense>
    <div v-for="(item, index) in menu" :key="index">
      <div v-if="(item.key || item.text) && ( $can(item.can) || $hasRoles(item.roles) )" class="pa-1 mt-2 overline">{{ item.key ? $t(item.key) : item.text }}</div>
      <nav-menu :menu="item.items" />
    </div>
  </v-list>
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
  computed: {
    ...mapState('profileService', ['user'])
  },
  created () {
    /* console.log(this.$userAuth())
    console.log(this.$rolesUserAuth())
    console.log(this.$permissionsUserAuth()) */
  }
}
</script>
