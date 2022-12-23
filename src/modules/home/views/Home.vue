<template>
  <div class="ma-0 pa-0 overflow-hidden">
    <TopMenu />
    <Menu />
    <BannerMenu />
    <!-- <div>
      <v-img src="/images/academia750/portada.png"></v-img>
    </div> -->
  </div>
</template>

<script>
import TopMenu from '../components/TopMenu'
import Menu from '../components/Menu'
import BannerMenu from '../components/BannerMenu'

export default {
  name: 'HomeView',
  components: {
    TopMenu,
    Menu,
    BannerMenu
  }
}
</script>
