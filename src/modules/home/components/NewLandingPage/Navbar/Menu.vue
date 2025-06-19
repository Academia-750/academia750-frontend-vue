<template>
  <nav class="navbar">
    <SectionWrapper padding-y="small">
      <v-row align="center" no-gutters class="navbar-row">
        <!-- Left Column - Logo -->
        <v-col cols="auto" class="logo-col">
          <LogoMenu />
        </v-col>
        <!-- Right Column - CTA Buttons -->
        <v-col cols="auto" class="nav-right-col">
          <div class="nav-menu-center">
            <v-btn
              text
              class="nav-item"
              @click="$emit('navigateTo', 'home')"
            >
              Home Page
            </v-btn>
            <v-btn
              text
              class="nav-item"
              @click="$emit('navigateTo', 'que-ofrecemos')"
            >
              About Us
            </v-btn>
            <v-btn
              text
              class="nav-item"
              @click="$emit('navigateTo', 'contacta')"
            >
              Contact Us
            </v-btn>
            <v-select
              v-model="selectedCourse"
              :items="courseOptions"
              label="Courses Offered"
              class="course-select"
              outlined
              dense
              hide-details
              @change="handleCourseSelection"
            ></v-select>
          </div>
          <div class="nav-cta-buttons d-none d-md-flex">
            <v-btn
              outlined
              class="join-btn"
              @click="$emit('goToPrivateArea')"
            >
              Join
            </v-btn>
            <v-btn
              class="learn-more-btn"
              @click="$emit('reservarPlaza')"
            >
              Learn More
            </v-btn>
          </div>

          <!-- Mobile Menu Button -->
          <v-btn
            icon
            class="mobile-menu-btn d-flex d-md-none"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </SectionWrapper>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer
      v-if="mobileMenuOpen"
      v-model="mobileMenuOpen"
      temporary
      right
      fixed
      class="mobile-nav"
      width="280"
    >
      <v-list>
        <v-list-item @click="handleMobileNavigation('home')">
          <v-list-item-content>
            <v-list-item-title>Home Page</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="handleMobileNavigation('que-ofrecemos')">
          <v-list-item-content>
            <v-list-item-title>About Us</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="handleMobileNavigation('contacta')">
          <v-list-item-content>
            <v-list-item-title>Contact Us</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="handleMobileNavigation('courses')">
          <v-list-item-content>
            <v-list-item-title>Courses Offered</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-2"></v-divider>
        
        <v-list-item @click="handleMobileAction('goToPrivateArea')">
          <v-list-item-content>
            <v-list-item-title>Join</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item @click="handleMobileAction('reservarPlaza')">
          <v-list-item-content>
            <v-list-item-title>Learn More</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import LogoMenu from './LogoMenu'
import SectionWrapper from '../Shared/SectionWrapper'

export default {
  name: 'NavbarMenu',
  components: {
    LogoMenu,
    SectionWrapper
  },
  data() {
    return {
      mobileMenuOpen: false,
      selectedCourse: null,
      courseOptions: [
        { text: 'Oposiciones Bombero', value: 'bombero' },
        { text: 'Policía Local', value: 'policia-local' },
        { text: 'Guardia Civil', value: 'guardia-civil' },
        { text: 'Policía Nacional', value: 'policia-nacional' },
        { text: 'Administrativo', value: 'administrativo' },
        { text: 'Auxiliar Enfermería', value: 'auxiliar-enfermeria' }
      ]
    }
  },
  methods: {
    closeMobileMenu() {
      this.mobileMenuOpen = false
    },
    handleMobileNavigation(section) {
      this.$emit('navigateTo', section)
      this.mobileMenuOpen = false
    },
    handleCourseSelection(courseValue) {
      this.$emit('navigateTo', courseValue)
    },
    handleMobileAction(action) {
      this.$emit(action)
      this.mobileMenuOpen = false
    }
  },
  emits: ['navigateTo', 'goToPrivateArea', 'reservarPlaza']
}
</script>

<style scoped>
.navbar {
  background: white;
  position: relative;
  font-family: 'Roboto', sans-serif;
  border-bottom: 1px solid #e0e0e0;
  z-index: 300;
}

.navbar-row {
  margin: 0;
  flex-wrap: nowrap;
  min-width: 0;
  align-items: center;
}

.logo-col {
  flex: 0 0 auto;
  min-width: 0;
}

.nav-right-col {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
}

.nav-menu-center {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: nowrap;
  min-width: 0;
}

.nav-item {
  font-family: 'Roboto', sans-serif;
  color: #333 !important;
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
  padding: 8px 16px;
  margin: 0;
  min-width: auto;
  white-space: nowrap;
  font-size: 1rem;
  transition: color 0.2s ease;
}

.nav-item:hover {
  background-color: transparent !important;
  color: #007bff !important;
}

.course-select {
  min-width: 160px;
  max-width: 180px;
}

.course-select >>> .v-input__control {
  min-height: 40px;
}

.course-select >>> .v-text-field__details {
  display: none;
}

.course-select >>> .v-label {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #333;
  font-weight: 400;
}

.course-select >>> .v-input__slot {
  border: none !important;
  background-color: transparent !important;
}

.course-select >>> .v-input__slot:hover {
  border: none !important;
}

.course-select >>> .v-input--is-focused .v-input__slot {
  border: none !important;
}

.course-select >>> .v-text-field__slot {
  border: none !important;
}

.course-select >>> .v-text-field.v-text-field--outlined fieldset {
  border: none !important;
}

.course-select >>> .v-text-field.v-text-field--outlined .v-input__slot {
  border: none !important;
}

.course-select >>> .v-input--is-focused fieldset {
  border: none !important;
}

.course-select >>> fieldset {
  border: none !important;
}

.nav-cta-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;
  min-width: 0;
}

.join-btn {
  font-family: 'Roboto', sans-serif;
  color: #333 !important;
  border: 1px solid #333 !important;
  background-color: transparent !important;
  text-transform: none;
  font-weight: 400;
  padding: 8px 24px;
  min-width: auto;
  white-space: nowrap;
  font-size: 1rem;
  border-radius: 0;
  transition: all 0.2s ease;
}

.join-btn:hover {
  background-color: #333 !important;
  color: white !important;
}

.learn-more-btn {
  font-family: 'Roboto', sans-serif;
  color: white !important;
  background-color: #333 !important;
  text-transform: none;
  font-weight: 400;
  padding: 8px 24px;
  min-width: auto;
  white-space: nowrap;
  font-size: 1rem;
  border-radius: 0;
  transition: all 0.2s ease;
  box-shadow: none;
}

.learn-more-btn:hover {
  background-color: #555 !important;
}

.mobile-menu-btn {
  margin-left: 16px;
  flex-shrink: 0;
}

.mobile-nav {
  z-index: 250;
}

.mobile-nav .v-list-item-title {
  font-family: 'Roboto', sans-serif;
  color: #333;
  font-weight: 400;
}

.mobile-nav .v-list-item {
  min-height: 48px;
}

.mobile-nav .v-list-item:hover {
  background-color: #f5f5f5;
}

/* Hide mobile nav on larger screens */
@media (min-width: 960px) {
  .mobile-nav {
    display: none !important;
  }
}

/* Responsive adjustments */
@media (max-width: 1400px) {
  .nav-right-col {
    gap: 32px;
  }
  
  .nav-menu-center {
    gap: 12px;
  }
  
  .nav-item {
    font-size: 0.9rem;
  }
  
  .course-select {
    min-width: 140px;
    max-width: 160px;
  }
  
  .course-select >>> .v-label {
    font-size: 0.9rem;
  }
  
  .join-btn, .learn-more-btn {
    font-size: 0.9rem;
    padding: 8px 20px;
  }
}

@media (max-width: 1200px) {
  .nav-right-col {
    gap: 24px;
  }
  
  .nav-menu-center {
    gap: 8px;
  }
  
  .nav-item {
    font-size: 0.85rem;
    padding: 8px 8px;
  }
  
  .course-select {
    min-width: 120px;
    max-width: 140px;
  }
  
  .course-select >>> .v-label {
    font-size: 0.85rem;
  }
  
  .join-btn, .learn-more-btn {
    font-size: 0.85rem;
    padding: 8px 16px;
  }
  
  .nav-cta-buttons {
    gap: 8px;
  }
}

@media (max-width: 960px) {
  .nav-menu-center {
    display: none !important;
  }
  
  .nav-right-col {
    gap: 12px;
  }
  
  .nav-cta-buttons {
    gap: 12px;
  }
  
  .join-btn, .learn-more-btn {
    font-size: 0.9rem;
    padding: 8px 20px;
  }
}

@media (max-width: 600px) {
  .navbar {
    min-height: auto;
  }
  
  .navbar-row {
    min-height: 48px;
  }
  
  .logo-col {
    margin-right: 8px;
  }
  
  .nav-right-col {
    gap: 6px;
  }
  
  .join-btn, .learn-more-btn {
    font-size: 0.8rem;
    padding: 6px 12px;
    min-height: 32px;
  }
  
  .nav-cta-buttons {
    gap: 6px;
  }
  
  .mobile-menu-btn {
    margin-left: 8px;
    width: 36px;
    height: 36px;
  }
}

/* Prevent horizontal scroll */
* {
  box-sizing: border-box;
}
</style>
