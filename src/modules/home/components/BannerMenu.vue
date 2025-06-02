<template>
  <section class="hero-section">
    <!-- Background Image with Overlay -->
    <div class="hero-background">
      <div class="background-image"></div>
      <div class="background-overlay"></div>
      <!-- Fallback firefighter elements for visual interest -->
      <div class="background-placeholder">
        <div class="firefighter-silhouettes">
          <div class="silhouette silhouette-1">🚒</div>
          <div class="silhouette silhouette-2">👨‍🚒</div>
          <div class="silhouette silhouette-3">🔥</div>
          <div class="silhouette silhouette-4">🚨</div>
        </div>
      </div>
    </div>

    <!-- Hero Content -->
    <v-container class="hero-container">
      <v-row align="center" justify="center" class="hero-row">
        <v-col cols="12" lg="8" xl="7" class="text-center">
          <!-- Badge/Announcement -->
          <div class="hero-badge mb-4 mb-md-6" data-aos="fade-up">
            <v-chip
              large
              color="rgba(255,255,255,0.2)"
              text-color="white"
              class="hero-chip"
            >
              <v-icon left color="#1E88E5" size="18">mdi-fire</v-icon>
              <span class="chip-text">CONVOCATORIA 2025 ABIERTA</span>
            </v-chip>
          </div>

          <!-- Main Headline -->
          <h1 class="hero-title mb-4 mb-md-6" data-aos="fade-up" data-aos-delay="200">
            <span class="title-line-1">Oposiciones a Bombero en</span>
            <span class="title-line-2 highlight-text">Alicante</span> 
            <span class="title-line-3">con <span class="location-text">Academia 750</span></span>
          </h1>

          <!-- Subtitle -->
          <p class="hero-subtitle mb-6 mb-md-8" data-aos="fade-up" data-aos-delay="400">
            Descubre la fórmula para obtener el MÁXIMO RENDIMIENTO en tu oposición. Preparación integral con los mejores profesionales.
          </p>

          <!-- Key Features -->
          <div class="hero-features mb-6 mb-md-8" data-aos="fade-up" data-aos-delay="600">
            <div class="feature-item" v-for="feature in heroFeatures" :key="feature.text">
              <v-icon :color="feature.color" size="16" class="feature-icon">{{ feature.icon }}</v-icon>
              <span class="feature-text">{{ feature.text }}</span>
            </div>
          </div>

          <!-- Call to Action Buttons -->
          <div class="hero-cta mb-6 mb-md-8" data-aos="fade-up" data-aos-delay="800">
            <v-btn
              x-large
              color="#1E88E5"
              class="cta-primary mb-3 mb-md-0 mr-md-4"
              rounded
              elevation="8"
              @click="scrollToInfo"
            >
              <v-icon left>mdi-fire-truck</v-icon>
              <span class="cta-text">Quiero Ser Bombero</span>
              <button-go-to-register-contact-us
                 @executeRegisterContactUs="$emit('executeRegisterContactUs')"
               />
            </v-btn>
            
            <v-btn
              x-large
              outlined
              color="white"
              class="cta-secondary"
              rounded
            >
              <v-icon left>mdi-information-outline</v-icon>
              <span class="cta-text">Información Gratuita</span>
            </v-btn>
          </div>

          <!-- Trust Indicators -->
          <div class="trust-indicators mt-6 mt-md-8" data-aos="fade-up" data-aos-delay="1000">
            <div class="trust-item" v-for="indicator in trustIndicators" :key="indicator.label">
              <div class="trust-number">{{ indicator.number }}</div>
              <div class="trust-label">{{ indicator.label }}</div>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Floating Info Cards - Hidden on mobile -->
      <div class="floating-cards d-none d-lg-block">
        <div class="info-card card-1" data-aos="slide-right" data-aos-delay="1200">
          <v-icon color="#1E88E5" size="24">mdi-calendar-check</v-icon>
          <div class="card-content">
            <div class="card-title">Próxima Convocatoria</div>
            <div class="card-subtitle">Marzo 2024</div>
          </div>
        </div>
        
        <div class="info-card card-2" data-aos="slide-left" data-aos-delay="1400">
          <v-icon color="#42A5F5" size="24">mdi-account-group</v-icon>
          <div class="card-content">
            <div class="card-title">Plazas Disponibles</div>
            <div class="card-subtitle">25 Plazas</div>
          </div>
        </div>
        
        <div class="info-card card-3" data-aos="slide-up" data-aos-delay="1600">
          <v-icon color="#1976D2" size="24">mdi-clock-time-four</v-icon>
          <div class="card-content">
            <div class="card-title">Tiempo Preparación</div>
            <div class="card-subtitle">6-8 Meses</div>
          </div>
        </div>
      </div>

      <!-- Mobile Info Cards - Clean Simple Layout -->
      <div class="mobile-info-cards d-lg-none mt-8">
        <v-row class="mobile-stats">
          <v-col cols="4" v-for="(card, index) in mobileCards" :key="index">
            <div class="mobile-stat-item">
              <div class="mobile-stat-number">{{ card.number }}</div>
              <div class="mobile-stat-label">{{ card.label }}</div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'FirefighterHeroSection',
  data() {
    return {
      heroFeatures: [
        { icon: 'mdi-shield-check', color: '#1E88E5', text: 'Preparación Completa' },
        { icon: 'mdi-account-tie', color: '#42A5F5', text: 'Profesores Expertos' },
        { icon: 'mdi-dumbbell', color: '#1976D2', text: 'Preparación Física' },
        { icon: 'mdi-book-open-variant', color: '#1E88E5', text: 'Temario Actualizado' }
      ],
      trustIndicators: [
        { number: '500+', label: 'Bomberos Formados' },
        { number: '89%', label: 'Tasa de Éxito' },
        { number: '15+', label: 'Años de Experiencia' }
      ],
      mobileCards: [
        { number: 'Mar 2024', label: 'Convocatoria' },
        { number: '25', label: 'Plazas' },
        { number: '6-8M', label: 'Preparación' }
      ]
    }
  },
  methods: {
    scrollToInfo() {
      // Scroll to information section
      this.$vuetify.goTo('#info-section', {
        duration: 1000,
        offset: 0,
        easing: 'easeInOutCubic'
      })
    }
  },
  mounted() {
    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        once: true
      })
    }
  }
}
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

/* Background Setup */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* Background Image - Replace this URL with your actual image */
.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/academia750/bg-image1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(30, 136, 229, 0.2) 0%,
    rgba(66, 165, 245, 0.15) 25%,
    rgba(0, 0, 0, 0.3) 75%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 2;
}

.background-placeholder {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

.firefighter-silhouettes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.silhouette {
  position: absolute;
  font-size: 4rem;
  opacity: 0.05;
  animation: float 8s ease-in-out infinite;
}

.silhouette-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.silhouette-2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.silhouette-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

.silhouette-4 {
  top: 40%;
  left: 70%;
  animation-delay: 6s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-20px) rotate(2deg); }
  50% { transform: translateY(-10px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(1deg); }
}

/* Hero Container */
.hero-container {
  position: relative;
  z-index: 3;
  height: 100vh;
  display: flex;
  align-items: center;
  padding: 2rem 1rem;
}

.hero-row {
  min-height: 80vh;
}

/* Hero Badge */
.hero-badge {
  margin-bottom: 2rem;
}

.hero-chip {
  font-weight: bold;
  font-size: 1rem;
  padding: 0 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.chip-text {
  font-size: 0.9rem;
}

/* Hero Title */
.hero-title {
  font-size: 4rem;
  font-weight: 900;
  color: white;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  margin-bottom: 2rem;
}

.title-line-1,
.title-line-2,
.title-line-3 {
  display: block;
}

.highlight-text {
  background: linear-gradient(135deg, #1E88E5 0%, #42A5F5 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: none;
  position: relative;
}

.location-text {
  color: #42A5F5;
  position: relative;
}

.location-text::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #1E88E5 0%, #42A5F5 100%);
  border-radius: 2px;
}

/* Hero Subtitle */
.hero-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto 3rem auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

/* Hero Features */
.hero-features {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.feature-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1.25rem;
  border-radius: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  flex: 1;
  min-width: 140px;
  max-width: 200px;
}

.feature-item:hover {
  background: rgba(30, 136, 229, 0.2);
  border-color: rgba(30, 136, 229, 0.3);
  transform: translateY(-2px);
}

.feature-icon {
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.feature-text {
  color: white;
  font-weight: 600;
  font-size: 0.85rem;
  text-align: center;
  flex: 1;
}

/* CTA Buttons */
.hero-cta {
  margin-bottom: 3rem;
}

.cta-primary,
.cta-secondary {
  min-width: 280px;
  font-size: 1.1rem;
  font-weight: bold;
  height: 56px;
  text-transform: none;
  letter-spacing: 0.5px;
}

.cta-primary {
  padding: 0 2rem;
}

.cta-secondary {
  padding: 0 2rem;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.8);
}

.cta-secondary:hover {
  background: rgba(30, 136, 229, 0.1);
  border-color: #1E88E5;
}

.cta-text {
  font-size: 1rem;
}

/* Trust Indicators */
.trust-indicators {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.trust-item {
  text-align: center;
  flex: 1;
  max-width: 150px;
}

.trust-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: #42A5F5;
  line-height: 1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.trust-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  margin-top: 0.5rem;
}

/* Floating Cards - Desktop Only */
.floating-cards {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.info-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid rgba(30, 136, 229, 0.2);
  animation: cardFloat 6s ease-in-out infinite;
  pointer-events: auto;
}

.card-1 {
  top: 15%;
  right: 5%;
  animation-delay: 0s;
}

.card-2 {
  bottom: 25%;
  left: 5%;
  animation-delay: 2s;
}

.card-3 {
  top: 50%;
  right: 2%;
  animation-delay: 4s;
}

@keyframes cardFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
}

.card-content {
  flex: 1;
}

.card-title {
  font-weight: 700;
  color: #374151;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.card-subtitle {
  color: #6b7280;
  font-size: 0.8rem;
  font-weight: 600;
}

/* Mobile Stats - Clean and Simple */
.mobile-info-cards {
  margin-top: 2rem;
}

.mobile-stats {
  display: none;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1.5rem;
}

.mobile-stat-item {
  text-align: center;
  padding: 0.5rem;
}

.mobile-stat-number {
  font-size: 1.4rem;
  font-weight: 800;
  color: #42A5F5;
  line-height: 1.2;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 0.25rem;
}

.mobile-stat-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Mobile Responsive Styles */
@media (max-width: 599px) {
  .hero-container {
    padding: 1rem;
  }
  
  .hero-title {
    font-size: 2.2rem;
    margin-bottom: 1rem;
  }
  
  .title-line-1 {
    font-size: 2rem;
  }
  
  .title-line-2 {
    font-size: 2.5rem;
    margin: 0.5rem 0;
  }
  
  .title-line-3 {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
  
  .hero-features {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    padding: 0 0.5rem;
  }
  
  .feature-item {
    flex: 1;
    min-width: auto;
    max-width: none;
    justify-content: center;
    padding: 0.5rem 0.25rem;
    font-size: 0.7rem;
  }
  
  .feature-text {
    font-size: 0.65rem;
    text-align: center;
    line-height: 1.2;
  }
  
  .feature-icon {
    margin-right: 0.25rem;
    margin-bottom: 0.25rem;
  }
  
  .hero-cta {
    margin-bottom: 2rem;
  }
  
  .cta-primary,
  .cta-secondary {
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
    font-size: 1rem;
    height: 48px;
  }
  
  .cta-text {
    font-size: 0.9rem;
  }
  
  .trust-indicators {
    flex-direction: row;
    justify-content: space-around;
    gap: 1rem;
    margin-top: 2rem;
    padding: 1.5rem 0.5rem 0 0.5rem;
  }
  
  .trust-item {
    flex: 1;
    max-width: none;
  }
  
  .trust-number {
    font-size: 1.6rem;
  }
  
  .trust-label {
    font-size: 0.7rem;
  }
  
  .chip-text {
    font-size: 0.8rem;
  }
  
  .silhouette {
    font-size: 2rem;
    opacity: 0.03;
  }
}

/* Tablet Responsive */
@media (min-width: 600px) and (max-width: 959px) {
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .hero-features {
    gap: 1.5rem;
  }
  
  .feature-item {
    min-width: 160px;
  }
  
  .trust-indicators {
    gap: 2.5rem;
  }
  
  .cta-primary,
  .cta-secondary {
    min-width: 240px;
  }
}

/* Large Mobile Landscape */
@media (max-width: 959px) and (orientation: landscape) and (max-height: 500px) {
  .hero-container {
    height: auto;
    min-height: 100vh;
    padding: 1rem;
  }
  
  .hero-row {
    min-height: auto;
  }
  
  .hero-title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  
  .hero-subtitle {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .hero-features,
  .trust-indicators {
    margin-bottom: 1rem;
  }
  
  .mobile-info-cards {
    margin-top: 1rem;
  }
  
  .mobile-stats {
    padding-top: 1rem;
  }
  
  .mobile-stat-number {
    font-size: 1.1rem;
  }
  
  .mobile-stat-label {
    font-size: 0.65rem;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .background-overlay {
    background: rgba(0, 0, 0, 0.9);
  }
  
  .hero-chip {
    background: rgba(255, 255, 255, 0.9);
    color: #000;
  }
  
  .feature-item {
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .silhouette,
  .info-card {
    animation: none;
  }
}

/* Print styles */
@media print {
  .hero-section {
    background: white;
    color: black;
    min-height: auto;
  }
  
  .background-overlay,
  .background-image,
  .silhouette {
    display: none;
  }
}
</style>
