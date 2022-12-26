<template>
  <div class="ma-0 pa-0 overflow-hidden">
    <TopMenu />
    <Menu @emitShowLoginDialog="showDialogLoginAction" />
    <BannerMenu @executeRegisterContactUs="scrollToContactUsFormForRegister"/>
    <DialogLogin ref="DialogLoginForm" />
    <OurServices />
    <GroupsByLevel @executeRegisterContactUs="scrollToContactUsFormForRegister" />
    <Testimonials />
  </div>
</template>

<script>
import TopMenu from '../components/TopMenu'
import Menu from '../components/Menu'
import BannerMenu from '../components/BannerMenu'
import DialogLogin from '../components/Login/DialogLogin'
import OurServices from '../components/OurServices'
import GroupsByLevel from '../components/GroupsByLevel'
import Testimonials from '../components/Testimonials'

export default {
  name: 'HomeView',
  components: {
    TopMenu,
    Menu,
    BannerMenu,
    DialogLogin,
    OurServices,
    GroupsByLevel,
    Testimonials
  },
  mounted () {

  },
  methods: {
    showDialogLoginAction () {
      this.$refs['DialogLoginForm'].showDialogLogin = true
    },
    scrollToContactUsFormForRegister () {
      //this.$refs['GroupsByLevelComponent'].scrollIntoViewContainerGroupLevel()
    }
  }

}
</script>
