<template>
  <SectionWrapper padding-y="large" background-color="#008C95">
    <div class="what-includes-content">
      <h2 class="section-title">
        ¿Qué incluye nuestra preparación?
      </h2>
      
      <div class="content-text">
        <p class="content-paragraph">
          Nuestra preparación abarca todas las pruebas que tendrás en una oposición a bombero o bombera. Comenzamos con la parte teórica en paralelo con la parte física, pero vamos intercalando supuestos prácticos y psicotécnicos para trabajarlos poco a poco y que los conozcamos desde el primer momento.
        </p>
        
        <p class="content-paragraph">
          El preparador físico elabora todas las semanas dos tipos de entrenamiento, uno para los alumnos y alumnas que tiene menos básica, y otro para los que ya la tienen y necesitan afinar más.
        </p>
        
        <p class="content-paragraph">
          La parte psicotécnica no la dejamos para el final, la vamos trabajando desde el principio con test preparados por nuestra psicóloga.
        </p>
        
        <p class="content-paragraph">
          Además, si lo necesitas, disponemos de una opción de seguimiento personalizado, con tutorías mensuales con nosotros para acompañarte y darte soluciones y herramientas en los momentos en los que te encuentres más obtuso.
        </p>
      </div>
    </div>
  </SectionWrapper>
</template>

<script>
import SectionWrapper from '../Shared/SectionWrapper'

export default {
  name: 'WhatIncludes',
  components: {
    SectionWrapper
  }
}
</script>

<style scoped>
.what-includes-content {
  padding-top: 40px;
  padding-bottom: 40px;
  font-family: 'Roboto', sans-serif !important;
}

.what-includes-content *,
.what-includes-content *::before,
.what-includes-content *::after {
  font-family: 'Roboto', sans-serif !important;
}

.section-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: #FFA500;
  margin-bottom: 60px;
  text-align: left;
}

.content-text {
  max-width: 100%;
}

.content-paragraph {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1.125rem;
  line-height: 1.7;
  color: #ffffff;
  font-weight: 400;
  margin-bottom: 32px;
  text-align: left;
}

.content-paragraph:last-child {
  margin-bottom: 0;
}

/* Responsive Design */
@media (min-width: 960px) {
  .what-includes-content {
    padding-top: 60px;
    padding-bottom: 60px;
  }
  
  .section-title {
    font-size: 3.5rem;
    margin-bottom: 80px;
  }
  
  .content-paragraph {
    font-size: 1.25rem;
    margin-bottom: 40px;
  }
}

@media (max-width: 600px) {
  .what-includes-content {
    padding-top: 30px;
    padding-bottom: 30px;
  }
  
  .section-title {
    font-size: 2rem;
    margin-bottom: 40px;
  }
  
  .content-paragraph {
    font-size: 1rem;
    margin-bottom: 24px;
  }
}
</style> 