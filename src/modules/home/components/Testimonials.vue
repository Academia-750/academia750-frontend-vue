<template>
  <div class="section-testimonials">
    <!-- Animated background elements -->
    <div class="background-pattern">
      <div class="floating-element element-1"></div>
      <div class="floating-element element-2"></div>
      <div class="floating-element element-3"></div>
    </div>
    
    <v-container class="testimonials-container">
      <!-- Enhanced Header Section -->
      <div class="header-section">
        <div class="header-content">
          <span class="section-badge">Testimonios</span>
          <h3 class="section-title">
            Opinión de nuestros 
            <span class="title-highlight">alumnos</span>
          </h3>
          <p class="section-subtitle">
            Descubre lo que dicen quienes ya han confiado en nosotros para alcanzar sus objetivos
          </p>
          <div class="title-decoration">
            <div class="decoration-line"></div>
            <div class="decoration-dot"></div>
            <div class="decoration-line"></div>
          </div>
        </div>
      </div>

      <!-- Testimonials Grid -->
      <div class="testimonials-grid">
        <v-row class="testimonials-row">
          <v-col
            v-for="(testimonial, index) in testimonialsData"
            :key="index"
            cols="12"
            md="6"
            lg="4"
            class="testimonial-col"
          >
            <div class="testimonial-card" :class="`card-${index + 1}`">
              <div class="card-header">
                <div class="avatar-container">
                  <img 
                    :src="testimonial.image" 
                    :alt="testimonial.alt"
                    class="avatar-image"
                  />
                  <div class="avatar-ring"></div>
                </div>
                <div class="person-info">
                  <h4 class="person-name">{{ testimonial.name }}</h4>
                  <div class="rating-stars">
                    <span v-for="star in 5" :key="star" class="star">★</span>
                  </div>
                </div>
              </div>
              
              <div class="testimonial-content">
                <div class="quote-icon">"</div>
                <p class="testimonial-text">{{ testimonial.testimonial }}</p>
              </div>
              
              <div class="card-footer">
                <div class="academy-badge">Academia 750</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Call to Action -->
      <div class="cta-section">
        <div class="cta-content">
          <h4 class="cta-title">¿Listo para ser el próximo?</h4>
          <p class="cta-text">Únete a nuestros alumnos exitosos</p>
          <button class="cta-button">
            <span>Comenzar ahora</span>
            <i class="button-icon">→</i>
          </button>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Testimonials',
  data() {
    return {
      testimonialsData: [
        {
          image: '/images/academia750/testimonio_3.png',
          alt: 'Testimonio 1 - Academia 750',
          name: 'Alvaro Esteban',
          testimonial: 'Sin duda la mejor academia para bomberos de Alicante, la dedicación es máxima, no se puede pedir más. El trato de 10 y el nivel tanto del material como de las clases es inmejorable.'
        },
        {
          image: '/images/academia750/testimonio_4.png',
          alt: 'Testimonio 2 - Academia 750',
          name: 'José Lledo',
          testimonial: 'He estado en diferentes academias tanto online como presencial y con diferencia es la que más nivel le ha exigido a los alumnos. Además del trato cercano y de calidad, es el primero en ponerse al día con cualquier modificación que haya en cuanto al temario, legislación... Ojalá hubiera empezado antes en una academia como esta.'
        },
        {
          image: '/images/academia750/testimonio_5.png',
          alt: 'Testimonio 3 - Academia 750',
          name: 'Alvaro Cardona',
          testimonial: 'Academia de bomberos con un nivel muy alto tanto en calidad humana como en lo académico. Grandes compañeros y siempre muy buen ambiente. Manu se involucra mucho desde el principio y eleva tu nivel como opositor dándote las máximas facilidades.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.section-testimonials {
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 100px 0;
  overflow: hidden;
}

/* Animated Background */
.background-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(25, 118, 210, 0.05));
  animation: float 6s ease-in-out infinite;
}

.element-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.element-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.element-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 15%;
  animation-delay: 4s;
}

.testimonials-container {
  position: relative;
  z-index: 2;
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 80px;
}

.header-content {
  max-width: 600px;
  margin: 0 auto;
}

.section-badge {
  display: inline-block;
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
  padding: 8px 20px;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}

.section-title {
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #1a202c;
  margin-bottom: 20px;
  line-height: 1.2;
}

.title-highlight {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #64748b;
  margin-bottom: 30px;
  line-height: 1.6;
}

.title-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.decoration-line {
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, #2196F3, #1976D2);
  border-radius: 1px;
}

.decoration-dot {
  width: 8px;
  height: 8px;
  background: #2196F3;
  border-radius: 50%;
}

/* Testimonials Grid */
.testimonials-grid {
  margin-bottom: 60px;
}

.testimonials-row {
  align-items: stretch;
}

.testimonial-col {
  display: flex;
}

.testimonial-card {
  background: white;
  border-radius: 25px;
  padding: 35px 30px;
  height: 100%;
  position: relative;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.testimonial-card::before {
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

.testimonial-card:hover {
  transform: translateY(-15px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.testimonial-card:hover::before {
  transform: scaleX(1);
}

/* Card Header */
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.avatar-container {
  position: relative;
  margin-right: 20px;
}

.avatar-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
}

.avatar-ring {
  position: absolute;
  top: -3px;
  left: -3px;
  width: 66px;
  height: 66px;
  border: 2px solid transparent;
  background: linear-gradient(135deg, #2196F3, #1976D2);
  border-radius: 50%;
  z-index: 1;
}

.person-info {
  flex: 1;
}

.person-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 8px;
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.star {
  color: #fbbf24;
  font-size: 1.1rem;
}

/* Testimonial Content */
.testimonial-content {
  flex: 1;
  position: relative;
  margin-bottom: 25px;
}

.quote-icon {
  position: absolute;
  top: -10px;
  left: -5px;
  font-size: 4rem;
  color: rgba(33, 150, 243, 0.1);
  font-family: serif;
  line-height: 1;
  z-index: 1;
}

.testimonial-text {
  color: #4a5568;
  line-height: 1.7;
  font-size: 1rem;
  position: relative;
  z-index: 2;
  font-style: italic;
}

/* Card Footer */
.card-footer {
  text-align: right;
}

.academy-badge {
  display: inline-block;
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(25, 118, 210, 0.05));
  color: #2196F3;
  padding: 6px 15px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Call to Action */
.cta-section {
  text-align: center;
  padding: 50px 30px;
  background: linear-gradient(135deg, #2196F3, #1976D2);
  border-radius: 30px;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.cta-text {
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.cta-button {
  background: white;
  color: #2196F3;
  border: none;
  padding: 18px 40px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
}

.button-icon {
  font-style: normal;
  transition: transform 0.3s ease;
}

.cta-button:hover .button-icon {
  transform: translateX(5px);
}

/* Animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(5deg);
  }
  66% {
    transform: translateY(-10px) rotate(-5deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.2;
  }
}

/* Responsive Design */
@media (max-width: 960px) {
  .section-testimonials {
    padding: 80px 0;
  }
  
  .header-section {
    margin-bottom: 60px;
  }
  
  .testimonial-card {
    margin-bottom: 30px;
  }
  
  .cta-title {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .testimonial-card {
    padding: 25px 20px;
  }
  
  .card-header {
    flex-direction: column;
    text-align: center;
    margin-bottom: 20px;
  }
  
  .avatar-container {
    margin: 0 0 15px 0;
  }
  
  .cta-section {
    padding: 40px 20px;
  }
  
  .cta-button {
    padding: 15px 30px;
    font-size: 1rem;
  }
}
</style>
