<template>
  <div class="ma-0 pa-0">
    <TopMenu />
    <Menu />
    <div>
      <v-img src="/images/academia750/portada.png"></v-img>
    </div>
  </div>
</template>

<script>
import TopMenu from '../components/TopMenu'
import Menu from '../components/Menu'

export default {
  name: 'HomeView',
  components: {
    TopMenu,
    Menu
  }
}
</script>
