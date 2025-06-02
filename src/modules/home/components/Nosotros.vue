<template>
  <div class="nosotros_seccion">
    <!-- Background overlay for better text readability -->
    <div class="background-overlay"></div>
    
    <v-container class="position-relative">
      <!-- Header Section with improved spacing and animation -->
      <v-row align="center" class="header-row">
        <v-col md="8" cols="12" class="text-lg-start text-center">
          <div class="header-content">
            <h3 class="titulo_principal">
              <span class="titulo_highlight">Sobre</span> nosotros
            </h3>
            <p class="subtitulo">Nos gustaría que nos conocieses un poco mejor</p>
            <div class="decorative-line"></div>
          </div>
        </v-col>
        <v-col md="4" cols="12" class="text-lg-end text-center">
          <button 
            class="boton-contacto" 
            @click="$emit('emitScrollToSectionHomePage', 'ContactUsForm')"
          >
            <span>Contacto</span>
            <i class="contact-icon">→</i>
          </button>
        </v-col>
      </v-row>

      <!-- Main Content Section -->
      <v-row class="content-row">
        <!-- Cards Section -->
        <v-col lg="7" md="6" cols="12">
          <div class="cards-container">
            <v-row>
              <v-col lg="6" sm="6" cols="12" v-for="(item, index) in nosotrosItems" :key="index">
                <div class="nosotros-card" :class="`card-${index + 1}`">
                  <div class="card-number">{{ item.numero }}</div>
                  <div class="card-content">
                    <h3 class="card-title">{{ item.titulo }}</h3>
                    <p class="card-description">{{ item.contenido }}</p>
                  </div>
                  <div class="card-accent"></div>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>

        <!-- Image Section -->
        <v-col lg="5" md="6" cols="12" class="image-col">
          <div class="image-container">
            <div class="image-frame">
              <ImagenNosotrosUnidad/>
            </div>
            <div class="floating-badge">
              <span>+10 años</span>
              <small>de experiencia</small>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ImagenNosotrosUnidad from './Nosotros/NosotrosImagen'

export default {
  name: 'Nosotros',
  components: {
    ImagenNosotrosUnidad
  },
  data() {
    return {
      nosotrosItems: [
        {
          numero: '01',
          titulo: '¿Quiénes somos?',
          contenido: 'Grupo humano con años de experiencia en la preparación de oposiciones y en el sector de las emergencias.'
        },
        {
          numero: '02', 
          titulo: '¿Qué hacemos?',
          contenido: 'Nos encargamos de preparar todas las pruebas de la oposición de bomberos sin dejar nada al azar, puliendo todos los detalles.'
        },
        {
          numero: '03',
          titulo: '¿Cómo formamos?',
          contenido: 'Nuestro método permite facilitar al alumno/a múltiples herramientas y recursos para desenvolverse en cualquier situación siempre exigiéndonos la máxima calidad.'
        },
        {
          numero: '04',
          titulo: 'Nuestra meta',
          contenido: 'Obtener el máximo rendimiento de nuestros alumnos/as en la preparación de cualquier prueba o situación.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.nosotros_seccion {
  background-image: url(/images/academia750/quienesSomos.png);
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  padding: 80px 0;
}

.v-container {
  z-index: 2;
}

/* Header Styles */
.header-row {
  margin-bottom: 60px;
}

.header-content {
  animation: fadeInUp 0.8s ease-out;
}

.titulo_principal {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: white;
  margin-bottom: 20px;
  line-height: 1.1;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.titulo_highlight {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitulo {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  font-weight: 300;
  line-height: 1.6;
}

.decorative-line {
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, #2196F3, #1976D2);
  border-radius: 2px;
  margin: 0 auto;
}

@media (min-width: 960px) {
  .decorative-line {
    margin: 0;
  }
}

/* Contact Button */
.boton-contacto {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  border: none;
  padding: 18px 35px;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(33, 150, 243, 0.3);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.boton-contacto:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(33, 150, 243, 0.4);
}

.contact-icon {
  font-style: normal;
  transition: transform 0.3s ease;
}

.boton-contacto:hover .contact-icon {
  transform: translateX(5px);
}

/* Cards Container */
.content-row {
  align-items: stretch;
}

.cards-container {
  height: 100%;
}

.nosotros-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px 25px;
  margin-bottom: 25px;
  position: relative;
  transition: all 0.4s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  height: calc(100% - 25px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.nosotros-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #2196F3, #1976D2);
  transform: scaleX(0);
  transition: transform 0.4s ease;
}

.nosotros-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.nosotros-card:hover::before {
  transform: scaleX(1);
}

.card-number {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #2196F3, #1976D2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 15px;
  line-height: 1;
}

.card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
  line-height: 1.3;
}

.card-description {
  color: #5a6c7d;
  line-height: 1.6;
  font-size: 1rem;
  flex-grow: 1;
}

.card-accent {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(25, 118, 210, 0.1));
  border-radius: 20px 0 20px 0;
}

/* Image Section */
.image-col {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container {
  position: relative;
  width: 100%;
  max-width: 450px;
}

.image-frame {
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  transform: perspective(1000px) rotateY(-5deg);
  transition: transform 0.4s ease;
}

.image-frame:hover {
  transform: perspective(1000px) rotateY(0deg) scale(1.02);
}

.floating-badge {
  position: absolute;
  top: 30px;
  right: -20px;
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
  padding: 20px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(33, 150, 243, 0.4);
  animation: float 3s ease-in-out infinite;
}

.floating-badge span {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
}

.floating-badge small {
  font-size: 0.8rem;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive Design */
@media (max-width: 1264px) {
  .image-frame {
    transform: none;
  }
  
  .floating-badge {
    position: static;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
  }
}

@media (max-width: 960px) {
  .nosotros_seccion {
    min-height: auto;
    padding: 60px 0;
  }
  
  .header-row {
    margin-bottom: 40px;
  }
  
  .titulo_principal {
    text-align: center;
  }
  
  .decorative-line {
    margin: 0 auto;
  }
  
  .image-container {
    margin-top: 40px;
  }
}

@media (max-width: 600px) {
  .nosotros-card {
    padding: 25px 20px;
  }
  
  .card-number {
    font-size: 2rem;
  }
  
  .card-title {
    font-size: 1.2rem;
  }
  
  .boton-contacto {
    padding: 15px 30px;
    font-size: 1rem;
  }
}
</style>
