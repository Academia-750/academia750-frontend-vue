<template>
  <div class="new-landing-page ma-0 pa-0 overflow-hidden">
    <!-- Navbar Component -->
    <TopMenu />
    <Menu
      ref="MenuHomePage"
      @emitShowLoginDialog="showDialogLoginAction"
      @emitScrollToSectionHomePage="scrollToSectionOfHomePage"
    />
    
    <!-- Hero Section -->
    <HeroSection 
      @reservarPlaza="handleReservarPlaza"
    />
    
    <DialogLogin
      ref="DialogLoginForm"
      @scrollToResetPasswordSection="scrollToResetPasswordSection"
    />
    <!-- Why Choose Us Section -->
    <WhyChooseUs />

    <!-- What Includes Section -->
    <WhatIncludes />

    <!-- Study Modalities Section -->
    <StudyModalities />

    <!-- Features Section -->
    <Features />

    <!-- Pricing Section -->
    <Pricing 
      @emitClickInscriptionContactUs="handleReservarPlaza"
    />

    <!-- Testimonials Section -->
    <Testimonials />

    <!-- FAQs Section -->
    <FAQs />

    <!-- Contact Section -->
    <Contact />

    <!-- Contact Form Section -->
    <Formulario ref="ContactUsFormComponent" />

    <!-- Footer Section -->
    <Footer />
  </div>
</template>

<script>
import HeroSection from './HeroSection/HeroSection'
import WhyChooseUs from './WhyChooseUs/WhyChooseUs'
import WhatIncludes from './WhatIncludes/WhatIncludes'
import StudyModalities from './StudyModalities/StudyModalities'
import Features from './Features/Features'
import Pricing from './Pricing/Pricing'
import Testimonials from './Testimonials/Testimonials'
import FAQs from './FAQs/FAQs'
import Contact from './Contact/Contact'
import Formulario from '../Formulario'
import Footer from '../Footer'
import Cookies from 'js-cookie'
import TopMenu from '../TopMenu'
import Menu from '../Menu'
import DialogLogin from '../Login/DialogLogin'

export default {
  name: 'BomberosAlicanteLandingPage',
  components: {
    TopMenu,
    Menu,
    HeroSection,
    WhyChooseUs,
    WhatIncludes,
    StudyModalities,
    Features,
    Pricing,
    Testimonials,
    FAQs,
    Contact,
    Formulario,
    Footer,
    DialogLogin
  },
  data() {
    return {
      // Data will be added as needed
    }
  },
  methods: {
    handleNavigation(section) {
      console.log('Navigate to:', section)
      // Will implement smooth scrolling to sections
      // this.$vuetify.goTo(`#${section}`, { duration: 800, offset: 100 })
    },
    handlePrivateArea() {
      if (Cookies.get('authorization')) {
        this.$router.push({
          name: this.$initialPage()
        })
        
        return
      }

      this.$router.push({
        name: 'login'
      })
    },
    handleReservarPlaza() {
      console.log('Reservar plaza clicked')
      // Scroll to the contact form section
      this.$vuetify.goTo(this.$refs.ContactUsFormComponent.$el, { 
        duration: 800, 
        offset: 100 
      })
      
      // Pre-fill the form with inscription reason
      if (this.$refs.ContactUsFormComponent) {
        this.$refs.ContactUsFormComponent.form.message = null
        this.$refs.ContactUsFormComponent.form.reason = 'inscription'
      }
    },
    showDialogLoginAction() {
      this.$refs['DialogLoginForm'].showDialogLogin = true
    },
    scrollToSectionOfHomePage($refElement) {
      this.$refs['MenuHomePage'].drawer = false

      ////console.log(this.$refs[$refElement].offsetHeight)
      /* const elemento = document.getElementById($refElement)
      const altura = elemento?.clientHeight
      const posicion = elemento?.getBoundingClientRect().top + window.pageYOffset - altura

      window.scrollTo({ top: posicion, behavior: 'smooth' }) */

      document.getElementById($refElement)?.scrollIntoView()
      /* setTimeout(() => {
        this.$refs[$refElement].scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }, 50) */

      this.$refs['ContactUsFormComponent'].form.message = null
      this.$refs['ContactUsFormComponent'].form.reason = null

      console.info('scrollToSectionOfHomePage')
    },
    scrollToResetPasswordSection() {
      this.$refs['DialogLoginForm'].showDialogLogin = false

      this.$refs['ContactUsForm'].scrollIntoView(/* {
        behavior: 'smooth',
        block: 'start'
      } */)

      this.$refs['ContactUsFormComponent'].form.reason = 'reset-password'
      this.$refs['ContactUsFormComponent'].form.message =
        'He olvidado mi contraseña'
    }
  }
}
</script>

<style scoped>
.new-landing-page {
  min-height: 100vh;
  background: #ffffff;
  width: 100%;
  overflow-x: hidden;
  font-family: 'Roboto', sans-serif !important;
}

.new-landing-page *,
.new-landing-page *::before,
.new-landing-page *::after {
  font-family: 'Roboto', sans-serif !important;
}

/* Override any Vuetify or other component fonts */
.new-landing-page .v-application,
.new-landing-page .v-btn,
.new-landing-page .v-input,
.new-landing-page .v-select,
.new-landing-page .v-text-field,
.new-landing-page .v-list-item,
.new-landing-page .v-card,
.new-landing-page h1,
.new-landing-page h2,
.new-landing-page h3,
.new-landing-page h4,
.new-landing-page h5,
.new-landing-page h6,
.new-landing-page p,
.new-landing-page span,
.new-landing-page div,
.new-landing-page a {
  font-family: 'Roboto', sans-serif !important;
}

.example-section {
  text-align: center;
  color: #666666;
}

.example-section h2 {
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: #333333;
}

.example-section p {
  font-size: 1rem;
  line-height: 1.6;
}

/* Prevent horizontal scroll globally */
* {
  box-sizing: border-box;
}
</style>
