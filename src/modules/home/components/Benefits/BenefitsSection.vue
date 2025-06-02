<template>
  <v-row dense class="ma-0 pa-0 d-flex justify-center">
    <v-col cols="12" sm="12" md="10" lg="10">
      <div class="mission-section">
        <v-container>
          <div class="section-header text-center mb-12">
            <h3 class="section-title">Beneficios</h3>
            <p class="section-subtitle">
              Ofrecemos un servicio integral al opositor/a, adaptándonos al nivel y necesidades de cada uno de ell@s. 
              Todos nuestros servicios se ofrecen de forma presencial y online para que puedas llevar el ritmo que mejor te convenga.
            </p>
          </div>
          
          <v-row>
            <v-col cols="12" md="4" v-for="benefit in benefits" :key="benefit.id">
              <div class="value-card">
                <div class="value-icon">
                  <v-icon size="48" :color="benefit.color">{{ benefit.icon }}</v-icon>
                </div>
                <h4 class="value-title">{{ benefit.title }}</h4>
                <p class="value-description">{{ benefit.description }}</p>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'BenefitsSection',
  data() {
    return {
      benefits: [
        {
          id: 1,
          icon: '🧠',
          title: 'Material Exclusivo y de Calidad',
          description: 'Todo el temario está elaborado por nuestro equipo con apuntes y anotaciones para facilitar la comprensión.'
        },
        {
          id: 2,
          icon: '🎯',
          title: 'Planificación Diaria de Estudio',
          description: 'Cada semana te damos un plan de estudio día a día para que no te pierdas en el proceso.'
        },
        {
          id: 3,
          icon: '💪',
          title: 'Preparación Integral',
          description: 'Abordamos todas las pruebas: teoría, física, test, psicotécnicos y supuestos prácticos.'
        },
        {
          id: 4,
          icon: '🧍‍♂️',
          title: 'Modalidad Híbrida',
          description: 'Asiste a clases presenciales, en directo online o en diferido, como prefieras.'
        },
        {
          id: 5,
          icon: '🔄',
          title: 'Grupos por Nivel',
          description: 'Dividimos la formación en niveles: Iniciación y Avanzado, para adaptar el ritmo de aprendizaje.'
        },
        {
          id: 6,
          icon: '🧑‍🏫',
          title: 'Seguimiento Personalizado',
          description: 'Opcionalmente, puedes tener tutorías mensuales para resolver dudas y mejorar tu rendimiento.'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Mission Section */
.section-header {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

.value-card {
  text-align: center;
  padding: 2rem;
  height: 100%;
  transition: transform 0.3s ease;
}

.value-card:hover {
  transform: translateY(-8px);
}

.value-icon {
  margin-bottom: 1.5rem;
}

.value-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.value-description {
  color: #666;
  line-height: 1.6;
}
.titulo_1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 800px;
  line-height: 1.6;
}

.benefits-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.benefits-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
  justify-items: center;
}

.benefit-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
  min-height: 180px;
  width: 100%;
  max-width: 280px;
}

.benefit-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.08) !important;
}

.benefit-icon {
  font-size: 2.2rem;
  display: block;
  margin: 0 auto;
}

.benefit-title {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.2;
}

.benefit-description {
  font-size: 0.85rem;
  color: #666;
  line-height: 1.4;
  margin: 0;
}

.success-highlight {
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.success-icon {
  font-size: 2rem;
}

.success-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
}

.success-description {
  font-size: 1.1rem;
  opacity: 0.9;
  line-height: 1.4;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .benefits-row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .titulo_1 {
    font-size: 2rem;
  }

  .benefits-row {
    grid-template-columns: 1fr;
  }

  .benefit-card {
    min-height: 160px;
  }

  .benefit-icon {
    font-size: 2rem;
  }

  .benefit-title {
    font-size: 0.95rem;
  }

  .benefit-description {
    font-size: 0.8rem;
  }
}
</style>
