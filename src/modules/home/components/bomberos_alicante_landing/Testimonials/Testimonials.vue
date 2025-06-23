<template>
  <SectionWrapper padding-y="large" background-color="#f7f9fc">
    <div class="testimonials-content">
      <!-- Header -->
      <div class="testimonials-header">
        <h2 class="section-title">Historias reales de éxito</h2>
        <p class="section-description">
          Nuestros alumnos comparten su camino hasta conseguir su plaza como bombero en Alicante. 
          Síguenos en 
          <a 
            href="https://instagram.com/academia750" 
            target="_blank" 
            rel="noopener noreferrer"
            class="instagram-link"
          >
            @academia750
          </a> 
          para ver más testimonios.
        </p>
      </div>

      <!-- Instagram Posts Grid -->
      <div class="instagram-grid">
        <div class="instagram-post-wrapper">
          <iframe 
            src="https://www.instagram.com/reel/DHWGHBWOfz9/embed" 
            width="320" 
            height="400" 
            frameborder="0" 
            scrolling="no" 
            allowtransparency="true"
            class="instagram-post"
          ></iframe>
        </div>
        <div class="instagram-post-wrapper">
          <iframe 
            src="https://www.instagram.com/reel/DHJiswMt11r/embed" 
            width="320" 
            height="400" 
            frameborder="0" 
            scrolling="no" 
            allowtransparency="true"
            class="instagram-post"
          ></iframe>
        </div>
        <div class="instagram-post-wrapper">
          <iframe 
            src="https://www.instagram.com/reel/DFs3zKxIWXf/embed" 
            width="320" 
            height="400" 
            frameborder="0" 
            scrolling="no" 
            allowtransparency="true"
            class="instagram-post"
          ></iframe>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="cta-container">
        <v-btn
          class="cta-button"
          large
          @click="scrollToContact"
        >
          <span class="fire-emoji">🔥</span> Quiero ser el próximo
        </v-btn>
      </div>
    </div>
  </SectionWrapper>
</template>

<script>
import SectionWrapper from '../Shared/SectionWrapper'

export default {
  name: 'Testimonials',
  components: {
    SectionWrapper
  },

  methods: {
    scrollToContact() {
      const element = document.querySelector('.contact-content')

      if (element) {
        this.$vuetify.goTo(element, {
          duration: 600,
          offset: -80,
          easing: 'easeInOutCubic'
        })
      }
    }
  }
}
</script>

<style scoped>
.testimonials-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 2rem 1rem;
}

.testimonials-header {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5em;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
  font-weight: 700;
  line-height: 1.2;
}

.section-description {
  font-size: 1.2em;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
}

.instagram-link {
  color: #0077cc;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.instagram-link:hover {
  color: #005fa3;
  text-decoration: underline;
}

.instagram-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 4rem;
  padding: 0 1rem;
}

.instagram-post-wrapper {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.instagram-post-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.12);
}

.instagram-post {
  border-radius: 12px;
  background: #fff;
  display: block;
}

.cta-container {
  margin-top: 3rem;
}

.cta-button {
  background-color: #0077cc !important;
  color: #ffffff !important;
  padding: 0.75rem 2rem !important;
  font-size: 1.2em !important;
  border-radius: 8px !important;
  text-transform: none !important;
  font-weight: 500 !important;
  letter-spacing: 0.3px !important;
  box-shadow: 0 4px 15px rgba(0, 119, 204, 0.3) !important;
  transition: all 0.3s ease !important;
}

.fire-emoji {
  margin-right: 8px;
  font-size: 1.2em;
}

.cta-button:hover {
  background-color: #005fa3 !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 119, 204, 0.4) !important;
}

/* Responsive Design */
@media (min-width: 1200px) {
  .testimonials-content {
    padding: 4rem 2rem;
  }

  .instagram-grid {
    gap: 3rem;
  }
}

@media (max-width: 1024px) {
  .instagram-grid {
    gap: 1.5rem;
  }

  .instagram-post {
    width: 300px;
    height: 375px;
  }
}

@media (max-width: 768px) {
  .testimonials-content {
    padding: 2rem 1rem;
  }

  .section-title {
    font-size: 2em;
  }

  .section-description {
    font-size: 1.1em;
    padding: 0 1rem;
  }

  .instagram-post {
    width: 280px;
    height: 350px;
  }

  .instagram-grid {
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .testimonials-header {
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 1.75em;
  }

  .section-description {
    font-size: 1em;
  }

  .instagram-post-wrapper {
    width: 100%;
    max-width: 320px;
  }

  .instagram-post {
    width: 100%;
    height: 400px;
  }

  .cta-button {
    width: 90%;
    max-width: 300px;
    font-size: 1.1em !important;
  }
}
</style> 