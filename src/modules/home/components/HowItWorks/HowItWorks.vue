<template>
  <v-row dense class="ma-0 pa-0 d-flex justify-center">
    <v-col cols="12" sm="12" md="10" lg="10">
      <!-- Our Story Timeline -->
      <div class="story-section">
        <v-container>
          <div class="section-header text-center mb-12">
            <h3 class="section-title">¿Cómo Funciona?</h3>
            <p class="section-subtitle">
              Sigue estos simples pasos para comenzar tu camino hacia el éxito
            </p>
          </div>
          
          <div class="timeline-container">
            <div class="timeline-line"></div>
            <div 
              v-for="(milestone, index) in timeline" 
              :key="milestone.year"
              class="timeline-item"
              :class="{ 'timeline-right': index % 2 === 1 }"
            >
              <div class="timeline-dot">
                <span class="timeline-year">{{ milestone.year }}</span>
              </div>
              <div class="timeline-content">
                <h4 class="timeline-title">{{ milestone.title }}</h4>
                <p class="timeline-description">{{ milestone.description }}</p>
                <div class="timeline-achievement">
                  <v-chip small color="primary" outlined>
                    {{ milestone.achievement }}
                  </v-chip>
                </div>
              </div>
            </div>
          </div>
        </v-container>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'EnhancedRoadmapSection',
  data() {
    return {
      timeline: [
        {
          year: 'Paso 1',
          title: 'Explora nuestros cursos',
          description: 'Navega por nuestras categorías y encuentra el curso que se adapta a tus necesidades y metas.',
          achievement: '100+ opciones disponibles'
        },
        {
          year: 'Paso 2',
          title: 'Inscríbete fácilmente',
          description: 'Completa tu registro en minutos y accede a nuestra plataforma desde cualquier dispositivo.',
          achievement: 'Proceso 100% en línea'
        },
        {
          year: 'Paso 3',
          title: 'Aprende a tu ritmo',
          description: 'Disfruta de clases dinámicas, materiales descargables y seguimiento personalizado.',
          achievement: 'Soporte continuo'
        },
        {
          year: 'Paso 4',
          title: 'Aprueba tu oposición',
          description: 'Pon a prueba tus conocimientos con simulacros reales y alcanza tu plaza soñada.',
          achievement: 'Miles de aprobados'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Header Styles */
.header-section {
  padding: 4rem 0;
}

.badge-container {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.process-badge {
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 0.75rem;
}

.timeline-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin: 3rem 0;
  display: flex;
  align-items: center;
}

.timeline-right {
  flex-direction: row-reverse;
}

.timeline-dot {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 25px;
  font-weight: bold;
  z-index: 2;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.timeline-content {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  margin: 0 2rem;
  flex: 1;
  max-width: 300px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.08);
}

.timeline-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.timeline-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.main-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #2c3e50;
  line-height: 1.2;
}

.highlight {
  position: relative;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 8px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  opacity: 0.3;
  border-radius: 4px;
}

.main-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Roadmap Styles */
.roadmap-container {
  position: relative;
  padding: 3rem 0;
  max-width: 900px;
  margin: 0 auto;
}

.roadmap-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
  transform: translateX(-50%);
  border-radius: 2px;
}

.roadmap-step {
  position: relative;
  margin: 3rem 0;
  display: flex;
  align-items: center;
}

.step-left {
  flex-direction: row;
}

.step-right {
  flex-direction: row-reverse;
}

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

.timeline-dot {
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.dot-inner {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  position: relative;
  z-index: 3;
}

.dot-pulse {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(102, 126, 234, 0.2);
  animation: pulse 2s infinite;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.3;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.7;
  }
}

.step-number {
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
}

.step-card-modern {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  margin: 0 2rem;
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  flex: 1;
  max-width: 350px;
  position: relative;
  overflow: hidden;
}

.step-card-modern::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.step-card-modern:hover::before {
  opacity: 1;
}

.step-card-modern:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0,0,0,0.12);
}

.step-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.step-icon-modern {
  font-size: 2.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.step-meta {
  flex: 1;
}

.step-duration {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.step-title-modern {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
  line-height: 1.3;
}

.step-description-modern {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.progress-indicator {
  height: 4px;
  background: #f0f0f0;
  border-radius: 2px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, #f8f9ff, #f0f4ff);
  border-radius: 20px;
  padding: 3rem 2rem;
}

.stat-card {
  text-align: center;
  padding: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #666;
  font-weight: 600;
}

/* Enhanced CTA */
.cta-section-modern {
  margin-top: 4rem;
}

.cta-background {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  border-radius: 24px;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.cta-background::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.cta-title-modern {
  font-size: 2.2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
}

.cta-description-modern {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 2rem;
  line-height: 1.5;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.cta-btn-primary {
  font-size: 1.1rem;
  padding: 0 2rem;
  height: 56px;
}

.cta-btn-secondary {
  font-size: 1.1rem;
  text-decoration: underline;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .main-title {
    font-size: 2.2rem;
  }
  
  .main-subtitle {
    font-size: 1rem;
  }
  
  .roadmap-line {
    display: none;
  }
  
  .roadmap-step {
    flex-direction: column !important;
    text-align: center;
    margin: 2rem 0;
  }
  
  .step-card-modern {
    margin: 1rem 0;
    max-width: 100%;
  }
  
  .step-header {
    flex-direction: column;
    text-align: center;
  }
  
  .step-icon-modern {
    margin: 0 0 1rem 0;
  }
  
  .cta-title-modern {
    font-size: 1.8rem;
  }
  
  .cta-buttons {
    flex-direction: column;
  }
  
  .cta-btn-secondary {
    margin-left: 0 !important;
  }
  
  .stats-section {
    padding: 2rem 1rem;
  }
  
  .stat-number {
    font-size: 2rem;
  }
}

@media (max-width: 1024px) and (min-width: 769px) {
  .step-card-modern {
    max-width: 300px;
    padding: 1.5rem;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
}
</style>
