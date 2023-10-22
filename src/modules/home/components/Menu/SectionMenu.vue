<template>
  <div>
    <logo-menu />
    <v-spacer></v-spacer>
    <links-menu />
    <v-spacer></v-spacer>
    <v-btn @click="$emit('executeLoginAccountAction')">
      <v-icon>mdi-account-circle</v-icon> <span class="ml-1">Acceso</span>
    </v-btn>
  </div>
</template>

<script>
import LogoMenu from './LogoMenu'
import LinksMenu from './LinksMenu'

export default {
  components: {
    LogoMenu,
    LinksMenu
  }
}
</script>

<style lang="scss" scoped></style>
