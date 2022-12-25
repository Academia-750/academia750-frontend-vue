<template>
  <div class="ma-0 pa-0 overflow-hidden">
    <TopMenu />
    <Menu @emitShowLoginDialog="showDialogLoginAction" />
    <BannerMenu />
    <DialogLogin ref="DialogLoginForm" />
    <OurServices />
  </div>
</template>

<script>
import TopMenu from '../components/TopMenu'
import Menu from '../components/Menu'
import BannerMenu from '../components/BannerMenu'
import DialogLogin from '../components/Login/DialogLogin'
import OurServices from '../components/OurServices'

export default {
  name: 'HomeView',
  components: {
    TopMenu,
    Menu,
    BannerMenu,
    DialogLogin,
    OurServices
  },
  methods: {
    showDialogLoginAction () {
      this.$refs['DialogLoginForm'].showDialogLogin = true
    }
  }
}
</script>
