<template>
  <SectionWrapper padding-y="large" background-color="#ffffff">
    <div class="testimonials-content">
      <div class="testimonials-header">
        <h2 class="section-title">Testimonios de nuestros alumnos</h2>
        <p class="section-description">
          Descubre las experiencias de quienes ya han conseguido su plaza como bombero con Academia 750.
        </p>
      </div>
      
      <div class="testimonials-container">
        <div class="testimonials-slider">
          <div class="slider-track" :style="sliderStyle">
            <!-- Testimonial Cards (6 total) -->
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="testimonial-slide"
            >
              <div class="testimonial-card">
                <div class="star-rating">
                  <span v-for="star in 5" :key="star" class="star">★</span>
                </div>
                
                <blockquote class="testimonial-quote">
                  {{ testimonial.quote }}
                </blockquote>
                
                <div class="testimonial-author">
                  <div class="author-avatar">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="20" fill="#E0E0E0"/>
                      <circle cx="20" cy="15" r="6" fill="#9E9E9E"/>
                      <path d="M8 32c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="#9E9E9E"/>
                    </svg>
                  </div>
                  <div class="author-info">
                    <div class="author-name">{{ testimonial.name }}</div>
                    <div class="author-title">{{ testimonial.position }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation Controls -->
        <div class="navigation-controls">
          <div class="pagination-dots">
            <span 
              v-for="(dot, index) in totalSlides" 
              :key="index"
              class="dot"
              :class="{ active: index === currentSlide }"
              @click="goToSlide(index)"
            ></span>
          </div>
          
          <div class="navigation-arrows">
            <button 
              class="nav-arrow prev-arrow" 
              aria-label="Previous testimonial"
              :disabled="currentSlide === 0"
              @click="previousSlide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button 
              class="nav-arrow next-arrow" 
              aria-label="Next testimonial"
              :disabled="currentSlide === totalSlides - 1"
              @click="nextSlide"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
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
  data() {
    return {
      currentSlide: 0,
      cardsPerSlide: 3,
      testimonials: [
        {
          quote: 'Academia 750 proporcionó una excelente preparación para mi examen de bombero. Los instructores fueron expertos y los materiales de estudio fueron exhaustivos. No lo hubiera conseguido sin su apoyo.',
          name: 'Laura Martínez',
          position: 'Bombero, Alicante'
        },
        {
          quote: 'Gracias a Academia 750, aprobé mi examen en la primera oportunidad. La asesoría personalizada y las pruebas de práctica fueron invaluables. El enfoque híbrido de aprendizaje funcionó perfectamente para mi horario.',
          name: 'Carlos Rodriguez',
          position: 'Bombero, Valencia'
        },
        {
          quote: 'Lo recomiendo ampliamente Academia 750 a cualquier persona que se prepare para exámenes de seguridad pública. Su tasa de éxito habla por sí misma y la calidad de la instrucción es excepcional.',
          name: 'Ana González',
          position: 'Policía, Alicante'
        },
        {
          quote: 'La plataforma en línea fue fácil de usar y el contenido fue exactamente lo que necesitaba para tener éxito en mi carrera como bombero. Gran apoyo a lo largo del proceso.',
          name: 'Miguel Torres',
          position: 'Bombero, Murcia'
        },
        {
          quote: 'Excelente academia con instructores profesionales. El enfoque híbrido de aprendizaje funcionó perfectamente para mi horario y logré alcanzar mi objetivo.',
          name: 'Elena López',
          position: 'Respuesta de Emergencia, Alicante'
        },
        {
          quote: 'Programa de preparación excepcional que me ayudó a lograr mi sueño de convertirse en bombero. La capacitación práctica fue especialmente valiosa.',
          name: 'David Sánchez',
          position: 'Capitán de Bombero, Valencia'
        },
        {
          quote: 'Entrenamiento profesional con excelentes resultados. La academia proporciona todo lo que necesitas para tener éxito en exámenes de seguridad pública.',
          name: 'Carmen Ruiz',
          position: 'Policía, Valencia'
        },
        {
          quote: 'Preparación de alta calidad que hizo toda la diferencia en mi éxito en el examen. Lo recomiendo Academia 750 a todos.',
          name: 'Antonio García',
          position: 'Bombero, Alicante'
        },
        {
          quote: 'Programa de preparación integral con instructores dedicados. La academia me ayudó a lograr mis metas profesionales de manera eficiente.',
          name: 'María Fernández',
          position: 'Respuesta de Emergencia, Murcia'
        },
        {
          quote: 'Academia 750 superó mis expectativas. La calidad del entrenamiento y la atención personalizada hicieron que mi viaje de preparación fuera exitoso.',
          name: 'Isabel Moreno',
          position: 'Policía, Alicante'
        },
        {
          quote: 'Excelencia profesional y resultados excepcionales. Esta academia es la mejor opción para cualquier persona seria sobre carreras de seguridad pública.',
          name: 'Francisco Jiménez',
          position: 'Capitán de Bombero, Murcia'
        },
        {
          quote: 'Preparación de alta efectividad. La experiencia y la guía de los instructores y los materiales integrales aseguraron mi éxito en el examen.',
          name: 'Pilar Romero',
          position: 'Respuesta de Emergencia, Valencia'
        },
        {
          quote: 'Academia excepcional que entrega resultados reales. Logré alcanzar mi objetivo de convertirse en bombero gracias a su excelente preparación.',
          name: 'Manuel Herrera',
          position: 'Bombero, Alicante'
        },
        {
          quote: 'Entrenamiento de alta calidad y apoyo profesional a lo largo de todo el proceso de preparación. Altamente recomendado para todos.',
          name: 'Rosa Castro',
          position: 'Policía, Murcia'
        },
        {
          quote: 'Academia excepcional con resultados comprobados. El apoyo y la orientación que recibí fueron fundamentales para mi éxito.',
          name: 'José Luis Pérez',
          position: 'Bombero, Valencia'
        }
      ]
    }
  },
  computed: {
    totalSlides() {
      return Math.ceil(this.testimonials.length / this.cardsPerSlide)
    },
    sliderStyle() {
      const translateX = -(this.currentSlide * 100)
      
      return {
        transform: `translateX(${translateX}%)`,
        transition: 'transform 0.3s ease-in-out'
      }
    }
  },
  mounted() {
    // Auto-slide every 5 seconds (optional)
    // setInterval(() => {
    //   if (this.currentSlide < this.totalSlides - 1) {
    //     this.nextSlide()
    //   } else {
    //     this.currentSlide = 0
    //   }
    // }, 5000)
  },
  methods: {
    nextSlide() {
      if (this.currentSlide < this.totalSlides - 1) {
        this.currentSlide++
      }
    },
    previousSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--
      }
    },
    goToSlide(index) {
      this.currentSlide = index
    }
  }
}
</script>

<style scoped>
.testimonials-content {
  font-family: 'Roboto', sans-serif !important;
}

.testimonials-content *,
.testimonials-content *::before,
.testimonials-content *::after {
  font-family: 'Roboto', sans-serif !important;
}

.testimonials-header {
  text-align: center;
  margin-bottom: 60px;
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

.testimonials-container {
  position: relative;
  overflow: hidden;
}

.testimonials-slider {
  width: 100%;
  overflow: hidden;
  margin-bottom: 60px;
}

.slider-track {
  display: flex;
  width: 500%;
  transition: transform 0.3s ease-in-out;
}

.testimonial-slide {
  flex: 0 0 6.667%;
  padding: 0 12px;
  box-sizing: border-box;
}

.testimonial-card {
  background-color: #ffffff;
  padding: 32px 24px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
  border: 1px solid #cccccc;
  border-radius: 0;
  box-shadow: none;
  transition: none;
}

.testimonial-card:hover {
  transform: none;
  box-shadow: none;
  border-color: #cccccc;
}

.star-rating {
  margin-bottom: 24px;
  text-align: center;
}

.star {
  font-size: 1.2rem;
  color: #FFD700;
  margin-right: 2px;
}

.testimonial-quote {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  line-height: 1.6;
  color: #333333;
  font-weight: 400;
  margin: 0 0 24px 0;
  flex-grow: 1;
  font-style: normal;
  position: relative;
}

.testimonial-quote::before {
  content: '"';
  font-size: 1.5rem;
  color: #666;
  position: absolute;
  top: -5px;
  left: -5px;
  font-family: Georgia, serif;
}

.testimonial-quote::after {
  content: '"';
  font-size: 1.5rem;
  color: #666;
  position: absolute;
  bottom: -10px;
  right: -5px;
  font-family: Georgia, serif;
}

.testimonial-author {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #e8e8e8;
}

.author-avatar {
  flex-shrink: 0;
  margin-bottom: 0;
}

.author-avatar svg {
  border-radius: 50%;
  background-color: #f0f0f0;
}

.author-info {
  text-align: left;
  flex: 1;
}

.author-name {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 4px;
  line-height: 1.4;
}

.author-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #666666;
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
}

.navigation-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.pagination-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #E0E0E0;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dot.active {
  background-color: #000000;
}

.dot:hover {
  background-color: #BDBDBD;
}

.navigation-arrows {
  display: flex;
  gap: 12px;
}

.nav-arrow {
  width: 48px;
  height: 48px;
  border: 1px solid #E0E0E0;
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666666;
}

.nav-arrow:hover {
  border-color: #000000;
  color: #000000;
  background-color: #f5f5f5;
}

.nav-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  border-color: #f0f0f0;
  color: #ccc;
}

.nav-arrow:disabled:hover {
  border-color: #f0f0f0;
  color: #ccc;
  background-color: #ffffff;
}

/* Responsive Design */
@media (min-width: 960px) {
  .testimonials-header {
    margin-bottom: 80px;
  }
  
  .section-title {
    font-size: 3rem;
  }
  
  .testimonial-slide {
    padding: 0 16px;
  }
}

@media (min-width: 768px) and (max-width: 959px) {
  .testimonial-slide {
    padding: 0 8px;
  }
  
  .navigation-controls {
    flex-direction: column;
    gap: 20px;
  }
}

@media (max-width: 767px) {
  .testimonials-header {
    margin-bottom: 40px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-description {
    font-size: 1rem;
  }
  
  .testimonial-slide {
    padding: 0 20px;
  }
  
  .testimonial-quote {
    font-size: 0.95rem;
    margin-bottom: 24px;
  }
  
  .author-name {
    font-size: 0.95rem;
  }
  
  .author-title {
    font-size: 0.8rem;
  }
  
  .navigation-controls {
    padding: 0 12px;
    flex-direction: column;
    gap: 24px;
  }
  
  .nav-arrow {
    width: 44px;
    height: 44px;
  }
}
</style> 