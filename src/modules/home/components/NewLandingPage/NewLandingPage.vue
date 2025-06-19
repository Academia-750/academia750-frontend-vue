<template>
  <div class="new-landing-page">
    <!-- Navbar Component -->
    <NavbarMenu 
      @navigateTo="handleNavigation"
      @goToPrivateArea="handlePrivateArea"
    />
    
    <!-- Hero Section -->
    <HeroSection 
      @reservarPlaza="handleReservarPlaza"
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
    <Pricing />

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
import NavbarMenu from './Navbar/Menu'
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
import Footer from './Footer/Footer'
import Cookies from 'js-cookie'

export default {
  name: 'NewLandingPage',
  components: {
    NavbarMenu,
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
    Footer
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
