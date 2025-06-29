<template>
  <SectionWrapper padding-y="normal" background-color="#ffffff">
    <div class="why-choose-us-content">
      <!-- Main Content Row -->
      <v-row align="start" no-gutters class="main-content-row">
        <!-- Left Column - Main Question -->
        <v-col cols="12" md="5" class="question-col">
          <h2 class="section-question">
            ¿Por qué prepararte con nosotros en Alicante?
          </h2>
        </v-col>
        
        <!-- Right Column - Benefits List -->
        <v-col cols="12" md="7" class="benefits-col">
          <div class="benefits-list">
            <div class="benefit-item">
              <span class="benefit-text">
                Todo el temario está elaborado por nosotros, con documentos de ayuda 
                y anotaciones que te ayuden a comprender conceptos.
              </span>
            </div>
            
            <div class="benefit-item">
              <span class="benefit-text">
                Contamos con autoevaluaciones con miles de preguntas de todos los 
                temas del IVASPE.
              </span>
            </div>
            
            <div class="benefit-item">
              <span class="benefit-text">
                Os guiamos con el estudio diario. Cada semana os pasamos una 
                propuesta de estudio para cada día.
              </span>
            </div>
            
            <div class="benefit-item">
              <span class="benefit-text">
                No dejamos ninguna prueba al azar, las preparamos desde el principio.
              </span>
            </div>
            
            <div class="benefit-item">
              <span class="benefit-text">
                Contamos con amplia experiencia en la formación y la preparación de 
                oposiciones, principalmente en la Comunidad Valenciana.
              </span>
            </div>
          </div>
          <!-- Success Stats Row -->
          <v-row align="center" no-gutters class="success-row">
            <v-col cols="12" md="7" class="success-stats-col">
              <div class="success-stats">
                <span class="success-percentage">Éxito por encima del 90%</span>
                <br>
                <span class="success-description">Porcentaje de alumnos aprobados en la última convocatoria</span>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </SectionWrapper>
</template>

<script>
import SectionWrapper from '../Shared/SectionWrapper'

export default {
  name: 'WhyChooseUs',
  components: {
    SectionWrapper
  }
}
</script>

<style scoped>
.why-choose-us-content {
  padding-top: 40px;
  padding-bottom: 40px;
  font-family: 'Roboto', sans-serif;
}

.main-content-row {
  align-items: flex-start;
  margin-bottom: 60px;
}

.success-row {
  align-items: center;
}

.question-col {
  padding-right: 160px;
}

.section-question {
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #AD0000;
  margin-bottom: 0;
}

.benefits-col {
  padding-left: 160px;
  padding-right: 6rem;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  position: relative;
}

.benefit-item::before {
  content: '•';
  color: #000000;
  font-weight: 600;
  font-size: 1.2rem;
  font-family: 'Roboto', sans-serif;
  margin-right: 12px;
  margin-top: -2px;
  flex-shrink: 0;
}

.benefit-text {
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #000000;
  font-weight: 400;
}

.success-label-col {
  display: flex;
  align-items: center;
  padding-right: 80px;
}

.success-label {
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #AD0000;
  margin: 0;
}

.success-stats-col {
  padding-left: 80px;
}

.success-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.success-percentage {
  font-family: 'Roboto', sans-serif;
  font-size: 4rem;
  font-weight: 700;
  color: #000000;
  line-height: 1;
  margin-top: 40px;
}

.success-description {
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  color: #000000;
  line-height: 1.4;
  font-weight: 400;
}

/* Responsive Design */
@media (min-width: 960px) {
  .section-question {
    font-size: 3rem;
  }
  
  .question-col {
    padding-right: 200px;
  }
  
  .benefits-col {
    padding-left: 200px;
    padding-right: 8rem;
  }
  
  .success-stats-col {
    padding-left: 200px;
    padding-right: 8rem;
  }
  
  .benefit-text {
    font-size: 1.1rem;
  }
}

@media (max-width: 959px) {
  .question-col {
    padding-right: 0;
    margin-bottom: 40px;
  }
  
  .benefits-col {
    padding-left: 0;
  }
  
  .success-label-col {
    padding-right: 0;
    margin-bottom: 20px;
  }
  
  .success-stats-col {
    padding-left: 0;
  }
  
  .section-question {
    font-size: 2rem;
    text-align: center;
  }
  
  .success-label {
    text-align: center;
    width: 100%;
  }
  
  .success-stats {
    align-items: center;
  }
}

@media (max-width: 600px) {
  .why-choose-us-content {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  
  .main-content-row {
    margin-bottom: 40px;
  }
  
  .section-question {
    font-size: 1.75rem;
  }
  
  .benefit-text {
    font-size: 0.95rem;
  }
  
  .success-percentage {
    font-size: 2rem;
  }
  
  .success-description {
    font-size: 0.85rem;
  }
}
</style>
