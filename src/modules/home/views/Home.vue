<template>
  <div class="ma-0 pa-0 overflow-hidden">
    <TopMenu />
    <Menu ref="MenuHomePage" @emitShowLoginDialog="showDialogLoginAction" @emitScrollToSectionHomePage="scrollToSectionOfHomePage" />
    <BannerMenu @executeRegisterContactUs="scrollToContactUsFormForRegister"/>
    <DialogLogin ref="DialogLoginForm" @scrollToResetPasswordSection="scrollToResetPasswordSection" />
    <div ref="OurServiceSection" style="padding-top: 100px;">
      <OurServices />
    </div>
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
    <div ref="tarifasSection" style="padding-top: 100px;">
      <Tarifas @emitClickInscriptionContactUs="scrollToContactUsFormForRegisterWithReasonInscription" />
    </div>
    <Nosotros @emitScrollToSectionHomePage="scrollToSectionOfHomePage"/>
    <div ref="ContactUsForm">
      <Formulario ref="ContactUsFormComponent"/>
    </div>
    <Footer @emitShowLoginDialog="showDialogLoginAction"/>
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
import Tarifas from '../components/Tarifas'
import Nosotros from '../components/Nosotros'
import Formulario from '../components/Formulario'
import Footer from '../components/Footer'
export default {
  name: 'HomeView',
  components: {
    Tarifas,
    Formulario,
    Footer,
    Nosotros,
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
      this.$refs['ContactUsForm'].scrollIntoView({ behavior: 'smooth', block: 'start' })
      this.$refs['ContactUsFormComponent'].form.message = null
      this.$refs['ContactUsFormComponent'].form.reason = 'inscription'
    },
    scrollToSectionOfHomePage ($refElement) {
      this.$refs['MenuHomePage'].drawer = false

      //console.log(this.$refs[$refElement].offsetHeight)
      this.$refs[$refElement].scrollIntoView({ behavior: 'smooth', block: 'start' })
      this.$refs['ContactUsFormComponent'].form.message = null
      this.$refs['ContactUsFormComponent'].form.reason = null

      console.info('scrollToSectionOfHomePage')
    },
    scrollToContactUsFormForRegisterWithReasonInscription ( reasonInscription ) {
      this.$refs['ContactUsForm'].scrollIntoView({ behavior: 'smooth', block: 'start' })
      this.$refs['ContactUsFormComponent'].form.message = `tarifa: ${reasonInscription}`
      this.$refs['ContactUsFormComponent'].form.reason = 'inscription'
    },
    scrollToResetPasswordSection () {
      this.$refs['DialogLoginForm'].showDialogLogin = false

      this.$refs['ContactUsForm'].scrollIntoView({ behavior: 'smooth', block: 'start' })

      this.$refs['ContactUsFormComponent'].form.reason = 'reset-password'
      this.$refs['ContactUsFormComponent'].form.message = 'He olvidado mi contraseña'
    }
  }

}
</script>
