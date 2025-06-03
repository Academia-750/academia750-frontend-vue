<template>
  <SectionWrapper padding-y="large" background-color="#ffffff">
    <div class="study-modalities-content">
      <h2 class="section-title">
        Modalidades de estudio
      </h2>
      
      <v-row class="modalities-row">
        <!-- Presencial Card -->
        <v-col cols="12" sm="6" md="4" class="modality-col">
          <div class="modality-card">
            <div class="card-icon">
              <img src="/images/academia750/boxIcon.png" alt="Box Icon" class="icon-image" />
            </div>
            <h3 class="card-title">Presencial</h3>
            <p class="card-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <a href="#" class="card-link">
              Sign Up >
            </a>
          </div>
        </v-col>
        
        <!-- Online Card -->
        <v-col cols="12" sm="6" md="4" class="modality-col">
          <div class="modality-card">
            <div class="card-icon">
              <img src="/images/academia750/boxIcon.png" alt="Box Icon" class="icon-image" />
            </div>
            <h3 class="card-title">Online</h3>
            <p class="card-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <a href="#" class="card-link">
              Sign Up >
            </a>
          </div>
        </v-col>
        
        <!-- Híbrido Card -->
        <v-col cols="12" sm="12" md="4" class="modality-col">
          <div class="modality-card">
            <div class="card-icon">
              <img src="/images/academia750/boxIcon.png" alt="Box Icon" class="icon-image" />
            </div>
            <h3 class="card-title">Híbrido</h3>
            <p class="card-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <a href="#" class="card-link">
              Sign Up >
            </a>
          </div>
        </v-col>
      </v-row>
    </div>
  </SectionWrapper>
</template>

<script>
import SectionWrapper from '../Shared/SectionWrapper'

export default {
  name: 'StudyModalities',
  components: {
    SectionWrapper
  }
}
</script>

<style scoped>
.study-modalities-content {
  padding-top: 40px;
  padding-bottom: 40px;
  font-family: 'Roboto', sans-serif !important;
}

.study-modalities-content *,
.study-modalities-content *::before,
.study-modalities-content *::after {
  font-family: 'Roboto', sans-serif !important;
}

.section-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #AD0000;
  margin-bottom: 60px;
  text-align: center;
}

.modalities-row {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.modality-col {
  display: flex;
  justify-content: center;
  padding: 0 8px;
}

.modality-card {
  border: 2px solid #000000;
  padding: 24px 20px;
  background-color: #ffffff;
  width: 100%;
  max-width: 300px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.card-icon {
  margin-bottom: 24px;
}

.icon-image {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.card-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 16px;
  line-height: 1.3;
}

.card-description {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  line-height: 1.6;
  color: #000000;
  font-weight: 400;
  margin-bottom: 32px;
  flex-grow: 1;
}

.card-link {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

.card-link:hover {
  color: #AD0000;
  text-decoration: none;
}

/* Responsive Design */
@media (min-width: 1200px) {
  .study-modalities-content {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  
  .section-title {
    font-size: 3rem;
    margin-bottom: 80px;
  }
  
  .modalities-row {
    justify-content: space-between;
  }
  
  .modality-col {
    flex: 0 0 33.333%;
    max-width: 33.333%;
    padding: 0 12px;
  }
  
  .modality-card {
    max-width: 320px;
  }
  
  .card-title {
    font-size: 1.75rem;
  }
  
  .card-description {
    font-size: 1.125rem;
  }
}

@media (min-width: 960px) and (max-width: 1199px) {
  .study-modalities-content {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  
  .section-title {
    font-size: 2.75rem;
    margin-bottom: 70px;
  }
  
  .modalities-row {
    justify-content: space-between;
  }
  
  .modality-col {
    flex: 0 0 33.333%;
    max-width: 33.333%;
    padding: 0 8px;
  }
  
  .modality-card {
    max-width: 280px;
  }
  
  .card-title {
    font-size: 1.6rem;
  }
  
  .card-description {
    font-size: 1rem;
  }
}

@media (min-width: 768px) and (max-width: 959px) {
  .modalities-row {
    justify-content: center;
  }
  
  .modality-col {
    padding: 0 8px;
    margin-bottom: 20px;
  }
  
  .modality-card {
    max-width: 280px;
  }
}

@media (max-width: 767px) {
  .study-modalities-content {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  .modalities-row {
    flex-direction: column;
    justify-content: center;
  }
  
  .modality-col {
    padding: 0 20px;
    margin-bottom: 20px;
    flex: none;
    max-width: 100%;
  }
  
  .modality-card {
    padding: 30px 24px;
    min-height: 250px;
    max-width: 100%;
    margin: 0 auto;
  }
  
  .card-title {
    font-size: 1.375rem;
  }
  
  .card-description {
    font-size: 0.95rem;
  }
}
</style> 