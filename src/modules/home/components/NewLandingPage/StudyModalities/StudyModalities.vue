<template>
  <SectionWrapper padding-y="large" background-color="#ffffff">
    <div class="study-modalities-content">
      <v-row class="modalities-row">
        <v-col cols="12" md="5" class="title-col">
          <h2 class="section-title">
            Modalidad de estudio: Híbrida
          </h2>
        </v-col>
        
        <v-col cols="12" md="7" class="description-col">
          <p class="description-text">
            Toda nuestra preparación tiene como base las clases presenciales. En cualquiera de los grupos tendrás una clase por semana para tratar los temas planificados.
          </p>
          <p class="description-text">
            Esta clase, además de poder acudir de forma presencial, podrás seguirla a través de nuestra plataforma en directo y también podrás verla en diferido porque las clases se quedan grabadas de forma indefinida.
          </p>
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
  padding: 40px 0;
  font-family: 'Roboto', sans-serif !important;
}

.study-modalities-content *,
.study-modalities-content *::before,
.study-modalities-content *::after {
  font-family: 'Roboto', sans-serif !important;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #000000;
  margin-bottom: 0;
  text-align: left;
}

.description-text {
  font-size: 1.125rem;
  line-height: 1.6;
  color: #666666;
  margin-bottom: 24px;
}

.description-text:last-child {
  margin-bottom: 0;
}

/* Responsive Design */
@media (max-width: 959px) {
  .section-title {
    font-size: 2rem;
    margin-bottom: 24px;
  }

  .description-text {
    font-size: 1rem;
  }
}

@media (max-width: 599px) {
  .study-modalities-content {
    padding: 32px 0;
  }

  .section-title {
    font-size: 1.75rem;
  }
}
</style> 