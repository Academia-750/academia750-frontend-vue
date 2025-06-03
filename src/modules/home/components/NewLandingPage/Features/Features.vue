<template>
  <SectionWrapper padding-y="large" background-color="#ffffff">
    <div class="features-content">
      <v-row class="features-row" align="center">
        <!-- Left Column - Image -->
        <v-col cols="12" md="6" class="image-col">
          <div class="image-container">
            <div class="placeholder-image">
              <div class="image-icon">
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <rect width="120" height="120" fill="#E0E0E0"/>
                  <path d="M30 45L60 75L90 45" stroke="#9E9E9E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="45" cy="35" r="8" fill="#9E9E9E"/>
                </svg>
              </div>
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
                <h3 class="feature-title">Why Choose Us?</h3>
                <p class="feature-description">
                  Expert instructors with proven success in preparing candidates for the firefighter exams in Alicante.
                </p>
                <a href="#" class="feature-link">
                  Learn More >
                </a>
              </div>
            </div>
            
            <!-- Feature 2 -->
            <div class="feature-item">
              <div class="feature-icon">
                <img src="/images/academia750/boxIcon.png" alt="Feature Icon" class="icon-image" />
              </div>
              <div class="feature-text">
                <h3 class="feature-title">Tailored Training</h3>
                <p class="feature-description">
                  Customized study plans that fit your schedule and learning style for optimal exam preparation.
                </p>
                <a href="#" class="feature-link">
                  Button >
                </a>
              </div>
            </div>
            
            <!-- Feature 3 -->
            <div class="feature-item">
              <div class="feature-icon">
                <img src="/images/academia750/boxIcon.png" alt="Feature Icon" class="icon-image" />
              </div>
              <div class="feature-text">
                <h3 class="feature-title">Short heading here</h3>
                <p class="feature-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                </p>
                <a href="#" class="feature-link">
                  Button >
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
  max-width: 500px;
}

.placeholder-image {
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e0e0e0;
}

.image-icon svg {
  opacity: 0.6;
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
  
  .placeholder-image {
    height: 500px;
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
  
  .placeholder-image {
    height: 450px;
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
  
  .placeholder-image {
    height: 350px;
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
  
  .placeholder-image {
    height: 250px;
  }
}
</style> 