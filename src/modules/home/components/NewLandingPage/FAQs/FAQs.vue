<template>
  <SectionWrapper padding-y="large" background-color="#ffffff">
    <div class="faqs-content">
      <!-- FAQs Header -->
      <div class="faqs-header">
        <h2 class="section-title">Preguntas Frecuentes</h2>
        <p class="section-description">
          Encuentra respuestas a tus dudas sobre las oposiciones de bombero y nuestros cursos de preparación.
        </p>
      </div>
      
      <!-- FAQ Items -->
      <div class="faq-list">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="faq-item"
          :class="{ active: activeIndex === index }"
        >
          <button 
            class="faq-question"
            @click="toggleFAQ(index)"
            :aria-expanded="activeIndex === index"
          >
            <span class="question-text">{{ faq.question }}</span>
            <svg 
              class="chevron-icon"
              :class="{ rotated: activeIndex === index }"
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <div 
            class="faq-answer"
            :class="{ expanded: activeIndex === index }"
          >
            <div class="answer-content">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Section -->
      <div class="contact-section">
        <h3 class="contact-title">¿Todavía tienes preguntas?</h3>
        <p class="contact-description">¡Estamos aquí para ayudarte!</p>
        <button class="contact-button">Contactar</button>
      </div>
    </div>
  </SectionWrapper>
</template>

<script>
import SectionWrapper from '../Shared/SectionWrapper'

export default {
  name: 'FAQs',
  components: {
    SectionWrapper
  },
  data() {
    return {
      activeIndex: -1,
      faqs: [
        {
          question: '¿Qué es el examen de bombero?',
          answer: 'El examen de bombero evalúa a los candidatos en varias habilidades y áreas de conocimiento. Incluye pruebas escritas, evaluaciones físicas y entrevistas. La preparación es clave para el éxito.'
        },
        {
          question: '¿Cómo me puedo inscribir?',
          answer: 'Inscribirse en nuestro curso es sencillo. Visita nuestro sitio web y completa el formulario de inscripción. Nuestro equipo te guiará a través del proceso.'
        },
        {
          question: '¿Qué está incluido en el curso?',
          answer: 'Nuestro curso de preparación incluye materiales de estudio completos, exámenes de práctica y coaching experto. También recibirás retroalimentación personalizada para mejorar tu rendimiento. Nos aseguramos de que estés completamente equipado para el examen.'
        },
        {
          question: '¿Cuándo empiezan las clases?',
          answer: 'Las clases típicamente comienzan cada trimestre. Consulta nuestro sitio web para el horario más reciente y disponibilidad. Se recomienda la inscripción temprana para asegurar tu lugar.'
        },
        {
          question: '¿Hay política de reembolso?',
          answer: 'Sí, ofrecemos una política de reembolso bajo ciertas condiciones. Si te retiras antes de que comience el curso, puedes recibir un reembolso completo. Por favor consulta nuestros términos y condiciones para más detalles.'
        }
      ]
    }
  },
  methods: {
    toggleFAQ(index) {
      this.activeIndex = this.activeIndex === index ? -1 : index
    }
  }
}
</script>

<style scoped>
.faqs-content {
  font-family: 'Roboto', sans-serif !important;
  max-width: 800px;
  margin: 0 auto;
}

.faqs-content *,
.faqs-content *::before,
.faqs-content *::after {
  font-family: 'Roboto', sans-serif !important;
}

.faqs-header {
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

.faq-list {
  margin-bottom: 80px;
}

.faq-item {
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 0;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: 'Roboto', sans-serif !important;
  font-size: 1.125rem;
  font-weight: 600;
  color: #000000;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.faq-question:hover {
  color: #333333;
}

.question-text {
  flex: 1;
  margin-right: 16px;
}

.chevron-icon {
  flex-shrink: 0;
  color: #666666;
  transition: transform 0.3s ease;
}

.chevron-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-answer.expanded {
  max-height: 200px;
}

.answer-content {
  padding: 0 0 24px 0;
}

.answer-content p {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  line-height: 1.6;
  color: #555555;
  font-weight: 400;
  margin: 0;
}

.contact-section {
  text-align: center;
  padding: 40px 0;
  border-top: 1px solid #e8e8e8;
}

.contact-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: 2rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 12px;
  line-height: 1.3;
}

.contact-description {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1.125rem;
  color: #666666;
  font-weight: 400;
  margin-bottom: 32px;
  line-height: 1.5;
}

.contact-button {
  font-family: 'Roboto', sans-serif !important;
  background-color: transparent;
  color: #000000;
  border: 2px solid #000000;
  border-radius: 0;
  padding: 16px 32px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: none;
}

.contact-button:hover {
  background-color: #000000;
  color: #ffffff;
}

/* Responsive Design */
@media (min-width: 960px) {
  .faqs-header {
    margin-bottom: 80px;
  }
  
  .section-title {
    font-size: 3rem;
  }
  
  .contact-section {
    padding: 60px 0;
  }
}

@media (max-width: 767px) {
  .faqs-header {
    margin-bottom: 40px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-description {
    font-size: 1rem;
  }
  
  .faq-question {
    font-size: 1rem;
    padding: 20px 0;
  }
  
  .contact-title {
    font-size: 1.5rem;
  }
  
  .contact-description {
    font-size: 1rem;
  }
  
  .contact-button {
    padding: 14px 28px;
    font-size: 0.95rem;
  }
  
  .contact-section {
    padding: 32px 0;
    margin-bottom: 20px;
  }
}
</style> 