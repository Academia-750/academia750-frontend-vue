<template>
  <SectionWrapper padding-y="large" background-color="#ffffff">
    <div class="pricing-content">
      <div class="pricing-header">
        <h2 class="section-title">Opciones de Precios</h2>
        <p class="section-description">
          Elige el plan que mejor se adapte a tus necesidades
        </p>
      </div>
      
      <v-row class="pricing-cards-row" justify="center">
        <!-- Iniciación Card -->
        <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pricing-col">
          <div class="pricing-card">
            <div class="card-header">
              <div class="header-top">
                <div class="card-icon">
                  <img src="/images/academia750/boxIcon.png" alt="Package Icon" class="icon-image" />
                </div>
                <div class="price-section">
                  <span class="price">80€<span class="price-period">/mes</span></span>
                </div>
              </div>
              <h3 class="package-title">Iniciación</h3>
              <p class="package-subtitle">Si lo que buscas es comenzar a preparar la oposición</p>
            </div>
            
            <hr class="card-divider" />
            
            <div class="card-content">
              <p class="includes-text">Si lo que buscas es comenzar a preparar la oposición y necesitas comprender y asimilar los conceptos para conseguir una buena base te ofrecemos la siguiente tarifa con todo esto incluido:</p>
              
              <div class="features-grid">
                <div class="feature-column">
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Preparación teórica</span>
                  </div>
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Preparación física</span>
                  </div>
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Supuestos prácticos</span>
                  </div>
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Psicotécnicos</span>
                  </div>
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Generador de test</span>
                  </div>
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Clases de forma presencial u online</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card-footer">
              <button class="cta-button" @click="$emit('emitClickInscriptionContactUs')">Comenzar</button>
            </div>
          </div>
        </v-col>
        
        <!-- Avanzado Card -->
        <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pricing-col">
          <div class="pricing-card">
            <div class="card-header">
              <div class="header-top">
                <div class="card-icon">
                  <img src="/images/academia750/boxIcon.png" alt="Package Icon" class="icon-image" />
                </div>
                <div class="price-section">
                  <span class="price">80€<span class="price-period">/mes</span></span>
                </div>
              </div>
              <h3 class="package-title">Avanzado</h3>
              <p class="package-subtitle">Si lo que necesitas es exprimirte al máximo</p>
            </div>
            
            <hr class="card-divider" />
            
            <div class="card-content">
              <p class="includes-text">Si lo que necesitas es exprimirte al máximo, llegar a partes del temario donde otros no llegan y no dejar nada al azar, te ofrecemos un grupo para mejorar con todo lo siguiente incluido:</p>
              
              <div class="features-grid">
                <div class="feature-column">
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Preparación teórica</span>
                  </div>
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Preparación física</span>
                  </div>
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Supuestos prácticos</span>
                  </div>
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Psicotécnicos</span>
                  </div>
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Generador de test</span>
                  </div>
                  <div class="feature-item">
                    <span class="checkmark">✓</span>
                    <span class="feature-text">Clases de forma presencial u online</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="card-footer">
              <button class="cta-button" @click="$emit('emitClickInscriptionContactUs')">Comenzar</button>
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </SectionWrapper>
</template>

<script>
import SectionWrapper from '../Shared/SectionWrapper'

export default {
  name: 'Pricing',
  components: {
    SectionWrapper
  },
  emits: ['emitClickInscriptionContactUs']
}
</script>

<style scoped>
.pricing-content {
  font-family: 'Roboto', sans-serif !important;
}

.pricing-content *,
.pricing-content *::before,
.pricing-content *::after {
  font-family: 'Roboto', sans-serif !important;
}

.pricing-header {
  text-align: center;
  margin-bottom: 60px;
}

.pricing-subtitle {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  font-weight: 400;
  color: #666666;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.section-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #000000;
  margin-bottom: 16px;
}

.section-description {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #666666;
  font-weight: 400;
  max-width: 600px;
  margin: 0 auto;
}

.pricing-cards-row {
  justify-content: center;
  align-items: stretch;
}

.pricing-col {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.pricing-card {
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  width: 100%;
  max-width: none;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-header {
  padding: 30px 24px 20px 24px;
  text-align: left;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.card-icon {
  flex-shrink: 0;
}

.icon-image {
  width: 32px;
  height: 32px;
  object-fit: contain;
}

.price-section {
  text-align: right;
  flex-shrink: 0;
}

.price {
  font-family: 'Roboto', sans-serif !important;
  font-size: 3rem;
  font-weight: 700;
  color: #000000;
  line-height: 1;
}

.price-period {
  font-size: 1.25rem;
  font-weight: 700;
}

.package-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 8px;
  line-height: 1.3;
}

.package-subtitle {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  line-height: 1.5;
  color: #666666;
  font-weight: 400;
  margin: 0;
}

.card-divider {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 0;
}

.card-content {
  padding: 24px;
  flex: 1;
}

.includes-text {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 20px;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 20px;
}

.feature-column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.checkmark {
  font-family: 'Roboto', sans-serif !important;
  color: #4CAF50;
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.5;
  flex-shrink: 0;
  margin-top: 1px;
}

.feature-text {
  font-family: 'Roboto', sans-serif !important;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #000000;
  font-weight: 400;
}

.card-footer {
  padding: 0 24px 30px 24px;
}

.cta-button {
  font-family: 'Roboto', sans-serif !important;
  width: 100%;
  background-color: #000000;
  color: #ffffff;
  border: none;
  padding: 16px 24px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 0;
}

.cta-button:hover {
  background-color: #333333;
}

/* Responsive Design */
@media (min-width: 1200px) {
  .pricing-header {
    margin-bottom: 80px;
  }
  
  .section-title {
    font-size: 3rem;
  }
  
  .pricing-cards-row {
    gap: 24px;
  }
  
  .pricing-col {
    margin-bottom: 0;
  }
  
  .pricing-card {
    max-width: none;
  }
}

@media (min-width: 960px) and (max-width: 1199px) {
  .pricing-header {
    margin-bottom: 70px;
  }
  
  .section-title {
    font-size: 2.75rem;
  }
  
  .pricing-cards-row {
    gap: 16px;
  }
  
  .pricing-col {
    margin-bottom: 0;
  }
  
  .pricing-card {
    max-width: none;
  }
}

@media (min-width: 768px) and (max-width: 959px) {
  .pricing-cards-row {
    gap: 12px;
  }
  
  .pricing-col {
    margin-bottom: 0;
    padding: 0 6px;
  }
  
  .pricing-card {
    max-width: none;
  }
  
  .card-header {
    padding: 20px 16px 16px 16px;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .card-footer {
    padding: 0 16px 20px 16px;
  }
}

@media (max-width: 767px) {
  .pricing-header {
    margin-bottom: 40px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-description {
    font-size: 1rem;
  }
  
  .pricing-cards-row {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  
  .pricing-col {
    max-width: 100%;
    width: 100%;
    padding: 0 20px;
    margin-bottom: 24px;
  }
  
  .pricing-card {
    max-width: 100%;
    margin: 0 auto;
  }
  
  .price {
    font-size: 2.5rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .card-header {
    padding: 24px 20px 16px 20px;
  }
  
  .card-content {
    padding: 20px;
  }
  
  .card-footer {
    padding: 0 20px 24px 20px;
  }
}
</style> 