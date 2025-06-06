<template>
  <div class="hero-background">
    <v-row align="center" no-gutters class="hero-row">
      <!-- Single Column - Content with full width -->
      <v-col cols="12" class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            Oposiciones a Bombero en Alicante con Academia 750
          </h1>
            
          <p class="hero-subtitle">
            Tu camino hacia una plaza fija empieza aquí, con una preparación a medida
          </p>
            
          <div class="hero-actions">
            <v-btn
              class="hero-cta-btn"
              large
              dark
              @click="$emit('reservarPlaza')"
            >
              Reserva tu plaza
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'HeroSection',
  emits: ['reservarPlaza']
}
</script>

<style scoped>
.hero-background {
  position: relative;
  background-image: url('/images/academia750/bgImage.jpg');
  background-size: cover;
  background-position: center;
  min-height: 85vh;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000;
  opacity: 0.5;
}

.hero-row {
  position: relative;
  z-index: 2;
  min-height: 85vh;
  align-items: center;
  padding: 20px 40px 60px 40px;
}

.hero-content {
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: flex-start;
}

.hero-text {
  width: 100%;
  max-width: 450px;
}

.hero-title {
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-family: 'Roboto', sans-serif;
  font-size: 1.25rem;
  line-height: 1.6;
  color: #f5f5f5;
  margin-bottom: 40px;
  font-weight: 400;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.hero-actions {
  margin-top: 40px;
}

.hero-cta-btn {
  font-family: 'Roboto', sans-serif;
  background-color: #ffffff !important;
  color: #000000 !important;
  font-weight: 600;
  font-size: 1rem;
  padding: 20px 40px;
  transition: all 0.3s ease;
  text-transform: none;
  border-radius: 0 !important;
}

.hero-cta-btn:hover {
  background-color: #000000 !important;
  color: #ffffff !important;
}

/* Responsive Design */
@media (min-width: 960px) {
  .hero-title {
    font-size: 4rem;
  }
  
  .hero-subtitle {
    font-size: 1.375rem;
  }
  
  .hero-row {
    padding: 80px 60px;
  }
  
  .hero-text {
    max-width: 550px;
  }
}

@media (min-width: 1264px) {
  .hero-title {
    font-size: 4.5rem;
  }
  
  .hero-row {
    padding: 100px 80px;
  }
  
  .hero-text {
    max-width: 746px;
  }
}

/* Mobile adjustments */
@media (max-width: 959px) {
  .hero-background {
    min-height: 60vh;
  }
  
  .hero-row {
    text-align: center;
    min-height: 60vh;
    padding: 10px 20px 40px 20px;
  }
  
  .hero-content {
    justify-content: center;
  }
  
  .hero-title {
    font-size: 2.25rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
}

@media (max-width: 600px) {
  .hero-background {
    min-height: 50vh;
  }
  
  .hero-row {
    min-height: 50vh;
    padding: 5px 16px 30px 16px;
  }
  
  .hero-title {
    font-size: 1.875rem;
    margin-bottom: 20px;
  }
  
  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 32px;
  }
  
  .hero-actions {
    margin-top: 32px;
  }
  
  .hero-cta-btn {
    padding: 18px 36px;
    font-size: 0.95rem;
    border-radius: 0 !important;
  }
}
</style>
