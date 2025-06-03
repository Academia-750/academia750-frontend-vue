<template>
  <SectionWrapper padding-y="large" background-color="#ffffff">
    <div class="contact-content">
      <!-- Left Side - Contact Info -->
      <div class="contact-info">
        <div class="welcome-text">Bienvenido</div>
        <h2 class="section-title">Ponte en Contacto</h2>
        <p class="section-description">
          Visítanos en Alicante para formación personalizada y apoyo en tu carrera profesional como bombero.
        </p>
        
        <div class="contact-details">
          <!-- Email -->
          <div class="contact-item">
            <div class="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="contact-info-text">
              <div class="contact-label">Email</div>
              <div class="contact-value">info@academia750.com</div>
            </div>
          </div>
          
          <!-- Phone -->
          <div class="contact-item">
            <div class="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92V19.92C22 21.9 20.11 23.48 18.14 23.38C9.81 22.48 3.19 15.84 2.29 7.51C2.19 5.54 3.77 3.65 5.77 3.65H8.77C9.66 3.65 10.41 4.31 10.51 5.19L11.05 8.7C11.13 9.45 10.85 10.19 10.31 10.66L8.87 11.9C10.25 14.53 12.47 16.75 15.1 18.13L16.34 16.69C16.81 16.15 17.55 15.87 18.3 15.95L21.81 16.49C22.69 16.59 23.35 17.34 23.35 18.23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="contact-info-text">
              <div class="contact-label">Teléfono</div>
              <div class="contact-value">+34 965 000 000</div>
            </div>
          </div>
          
          <!-- Office -->
          <div class="contact-item">
            <div class="contact-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.03 7.03 1 12 1S21 5.03 21 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="contact-info-text">
              <div class="contact-label">Oficina</div>
              <div class="contact-value">Av. Mare Nostrum 6 (Entrada por C/Estrella fugaz), 03007 Alicante</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Side - Google Map -->
      <div class="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3133.5947!2d-0.4906!3d38.3460!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDIwJzQ1LjYiTiAwwrAyOSczOS43Ilc!5e0!3m2!1sen!2ses!4v1234567890!5m2!1sen!2ses"
          width="100%"
          height="100%"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  </SectionWrapper>
</template>

<script>
import SectionWrapper from '@/modules/home/components/NewLandingPage/Shared/SectionWrapper.vue'

export default {
  name: 'Contact',
  components: {
    SectionWrapper
  }
}
</script>

<style scoped>
.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.contact-info {
  padding-right: 2rem;
}

.welcome-text {
  color: #666666;
  font-size: 0.9rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-description {
  font-size: 1rem;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  flex-shrink: 0;
}

.contact-info-text {
  display: flex;
  flex-direction: column;
}

.contact-label {
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 0.25rem;
}

.contact-value {
  font-size: 0.9rem;
  font-weight: 400;
  color: #666666;
}

.map-container {
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-info {
    padding-right: 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .map-container {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }
  
  .section-description {
    font-size: 0.9rem;
  }
  
  .contact-item {
    gap: 0.75rem;
  }
}
</style> 