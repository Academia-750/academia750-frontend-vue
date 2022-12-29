<template>
  <div class="ma-0 pa-0 overflow-hidden">
    <TopMenu />
    <Menu @emitShowLoginDialog="showDialogLoginAction" />
    <BannerMenu @executeRegisterContactUs="scrollToContactUsFormForRegister"/>
    <DialogLogin ref="DialogLoginForm" />
    <OurServices />
    <GroupsByLevel @executeRegisterContactUs="scrollToContactUsFormForRegister" />
    <Testimonials />
    <v-fab-transition>
      <v-btn
        class="my-5 mx-2"
        color="blue darken-1"
        dark
        fixed
        small
        bottom
        right
        fab
        @click="$vuetify.goTo(0)"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-fab-transition>
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
  data() {
    return {
    }
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
