<template>
  <v-toolbar-title>
    <v-img src="/images/academia750/logo.png" width="60" height="60" class="logo-image"></v-img>
  </v-toolbar-title>
</template>

<script>
export default {
  name: 'LogoMenu'
}
</script>

<style scoped>
@media (max-width: 600px) {
  .logo-image {
    width: 35px !important;
    height: 35px !important;
  }
}
</style>
