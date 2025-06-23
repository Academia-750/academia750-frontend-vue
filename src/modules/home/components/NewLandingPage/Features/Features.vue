<template>
  <SectionWrapper padding-y="large" background-color="#ffffff">
    <div class="features-content">
      <v-row class="features-row" align="center">
        <!-- Left Column - Image -->
        <v-col cols="12" md="6" class="image-col">
          <div class="image-container">
            <div class="background-image">
              <div class="overlay"></div>
            </div>
          </div>
        </v-col>
        
        <!-- Right Column - Content -->
        <v-col cols="12" md="6" class="content-col">
          <div class="features-content-wrapper">
            <!-- Feature 1 -->
            <div class="feature-item">
              <div class="feature-icon">
                <img src="/images/academia750/boxIcon.png" alt="Feature Icon" class="icon-image" />
              </div>
              <div class="feature-text">
                <h3 class="feature-title main-title">Grupos por Nivel</h3>
                <p class="feature-description">
                  Estructuramos nuestra formación en dos grupos: Iniciación para nuevos opositores y Avanzado para consolidar conocimientos.
                </p>
                <a href="#" class="feature-link">
                  Más información >
                </a>
              </div>
            </div>
            
            <!-- Feature 2 -->
            <div class="feature-item">
              <div class="feature-icon">
                <img src="/images/academia750/boxIcon.png" alt="Feature Icon" class="icon-image" />
              </div>
              <div class="feature-text">
                <h3 class="feature-title">Iniciación</h3>
                <p class="feature-description">
                  Aclimatación al temario, técnicas de estudio y disciplina. Aprende a distinguir lo importante y organízate para el proceso opositor.
                </p>
                <a href="#" class="feature-link">
                  Más información >
                </a>
              </div>
            </div>
            
            <!-- Feature 3 -->
            <div class="feature-item">
              <div class="feature-icon">
                <img src="/images/academia750/boxIcon.png" alt="Feature Icon" class="icon-image" />
              </div>
              <div class="feature-text">
                <h3 class="feature-title">Avanzado</h3>
                <p class="feature-description">
                  Trabajo detallado del temario con test, tarjetas de memoria y ejercicios. Preparación específica para que domines todas las preguntas.
                </p>
                <a href="#" class="feature-link">
                  Más información >
                </a>
              </div>
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
  name: 'Features',
  components: {
    SectionWrapper
  }
}
</script>

<style scoped>
.features-content {
  font-family: 'Roboto', sans-serif !important;
}

.features-content *,
.features-content *::before,
.features-content *::after {
  font-family: 'Roboto', sans-serif !important;
}

.features-row {
  align-items: center;
}

.image-col {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-container {
  width: 100%;
  max-width: 600px;
  height: 600px;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/academia750/sidepic.jpg');
  background-size: cover;
  background-position: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.content-col {
  padding-left: 0;
}

.features-content-wrapper {
  padding-left: 0;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 48px;
}

.feature-item:last-child {
  margin-bottom: 0;
}

.feature-icon {
  flex-shrink: 0;
  margin-right: 24px;
  margin-top: 4px;
}

.icon-image {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.feature-text {
  flex: 1;
}

.feature-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 12px;
  line-height: 1.3;
}

.feature-title.main-title {
  font-size: 2rem;
  color: #AD0000;
  font-weight: 800;
  margin-bottom: 16px;
}

.feature-description {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  line-height: 1.6;
  color: #666666;
  font-weight: 400;
  margin-bottom: 16px;
}

.feature-link {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease;
}

.feature-link:hover {
  color: #AD0000;
  text-decoration: none;
}

/* Responsive Design */
@media (min-width: 1200px) {
  .content-col {
    padding-left: 60px;
  }
  
  .features-content-wrapper {
    padding-left: 40px;
  }
  
  .feature-title {
    font-size: 1.75rem;
  }
  
  .feature-description {
    font-size: 1.125rem;
  }
  
  .image-container {
    height: 700px;
    max-width: 700px;
  }
  
  .feature-title.main-title {
    font-size: 2.5rem;
  }
}

@media (min-width: 960px) and (max-width: 1199px) {
  .content-col {
    padding-left: 40px;
  }
  
  .features-content-wrapper {
    padding-left: 20px;
  }
  
  .feature-title {
    font-size: 1.6rem;
  }
  
  .feature-description {
    font-size: 1rem;
  }
  
  .image-container {
    height: 600px;
    max-width: 600px;
  }
  
  .feature-title.main-title {
    font-size: 2.25rem;
  }
}

@media (min-width: 768px) and (max-width: 959px) {
  .content-col {
    padding-left: 20px;
  }
  
  .features-content-wrapper {
    padding-left: 0;
  }
  
  .feature-item {
    margin-bottom: 36px;
  }
  
  .image-container {
    height: 500px;
    max-width: 500px;
  }
  
  .feature-title.main-title {
    font-size: 2rem;
  }
}

@media (max-width: 767px) {
  .image-col {
    margin-bottom: 40px;
    padding: 0 20px;
  }
  
  .content-col {
    padding-left: 0;
    padding-right: 0;
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .features-content-wrapper {
    padding-left: 0;
    padding-right: 0;
  }
  
  .feature-item {
    margin-bottom: 32px;
  }
  
  .feature-icon {
    margin-right: 16px;
  }
  
  .feature-title {
    font-size: 1.375rem;
  }
  
  .feature-description {
    font-size: 0.95rem;
  }
  
  .image-container {
    height: 400px;
    max-width: 100%;
  }
  
  .feature-title.main-title {
    font-size: 1.75rem;
  }
}
</style> 