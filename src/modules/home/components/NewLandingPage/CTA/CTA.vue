<template>
  <SectionWrapper padding-y="large" background-color="#666666">
    <div class="cta-content">
      <h2 class="cta-title">Start Your Journey Today!</h2>
      <p class="cta-description">
        Sign up for a free consultation and discover how we can help you succeed.
      </p>
      
      <div class="cta-buttons">
        <button class="cta-button primary">Enroll</button>
        <button class="cta-button secondary">Learn More</button>
      </div>
    </div>
  </SectionWrapper>
</template>

<script>
import SectionWrapper from '../Shared/SectionWrapper'

export default {
  name: 'CTA',
  components: {
    SectionWrapper
  }
}
</script>

<style scoped>
.cta-content {
  font-family: 'Roboto', sans-serif !important;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.cta-content *,
.cta-content *::before,
.cta-content *::after {
  font-family: 'Roboto', sans-serif !important;
}

.cta-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #ffffff;
  margin-bottom: 16px;
}

.cta-description {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1.125rem;
  line-height: 1.6;
  color: #e0e0e0;
  font-weight: 400;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.cta-button {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  font-weight: 500;
  padding: 16px 32px;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: none;
  border: 2px solid transparent;
  min-width: 140px;
}

.cta-button.primary {
  background-color: #ffffff;
  color: #666666;
  border-color: #ffffff;
}

.cta-button.primary:hover {
  background-color: #f5f5f5;
  border-color: #f5f5f5;
}

.cta-button.secondary {
  background-color: transparent;
  color: #ffffff;
  border-color: #ffffff;
}

.cta-button.secondary:hover {
  background-color: #ffffff;
  color: #666666;
}

/* Responsive Design */
@media (min-width: 960px) {
  .cta-title {
    font-size: 3rem;
  }
  
  .cta-buttons {
    gap: 24px;
  }
  
  .cta-button {
    padding: 18px 36px;
    font-size: 1.1rem;
    min-width: 160px;
  }
}

@media (max-width: 767px) {
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-description {
    font-size: 1rem;
    margin-bottom: 32px;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  .cta-button {
    padding: 14px 28px;
    font-size: 0.95rem;
    min-width: 200px;
  }
}
</style> 