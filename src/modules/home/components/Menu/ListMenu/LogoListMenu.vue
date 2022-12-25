<template>
  <v-list-item>
    <v-list-item-avatar size="60">
      <v-img :src="uriLogo"></v-img>
    </v-list-item-avatar>
  </v-list-item>
</template>

<script>
export default {
  name: 'LogoListMenu',
  props: {
    uriLogo: {
      type: String,
      default: '/images/academia750/logo.svg'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
