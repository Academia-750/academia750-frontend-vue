<template>
  <footer class="footer">
    <!-- Main Footer Content -->
    <div class="footer-content">
      <div class="footer-grid">
        <!-- Newsletter Section -->
        <div class="newsletter-section">
          <div class="logo">
            <img 
              src="/images/academia750/logo.png" 
              alt="Academia 750 Logo"
              class="logo-image"
            />
          </div>
          <p class="newsletter-description">
            Únete a nuestro boletín para recibir actualizaciones y ofertas exclusivas.
          </p>
          
          <div class="newsletter-form">
            <div class="email-input-container">
              <input 
                type="email" 
                placeholder="Ingresa tu email"
                class="email-input"
                v-model="email"
              >
              <button class="subscribe-button">Suscribirse</button>
            </div>
          </div>
          
          <p class="privacy-text">
            Al suscribirte aceptas nuestra 
            <a href="#" class="privacy-link">Política de Privacidad</a> 
            y das tu consentimiento para recibir actualizaciones de nuestra empresa.
          </p>
        </div>
        
        <!-- Column One -->
        <div class="footer-column">
          <h4 class="column-title">Información</h4>
          <ul class="footer-links">
            <li><a href="#">Detalles del Curso</a></li>
            <li><a href="#">Contáctanos</a></li>
            <li><a href="#">Preguntas Frecuentes</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Historias de Éxito</a></li>
          </ul>
        </div>
        
        <!-- Column Two -->
        <div class="footer-column">
          <h4 class="column-title">Academia</h4>
          <ul class="footer-links">
            <li><a href="#">Nuestro Equipo</a></li>
            <li><a href="#">Carreras</a></li>
            <li><a href="#">Testimonios</a></li>
            <li><a href="#">Eventos</a></li>
            <li><a href="#">Recursos</a></li>
          </ul>
        </div>
        
        <!-- Follow Us -->
        <div class="footer-column">
          <h4 class="column-title">Síguenos</h4>
          <ul class="social-links">
            <li>
              <a href="#" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
                Facebook
              </a>
            </li>
            <li>
              <a href="#" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.749-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                </svg>
                Instagram
              </a>
            </li>
            <li>
              <a href="#" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                X
              </a>
            </li>
            <li>
              <a href="#" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
            </li>
            <li>
              <a href="#" class="social-link">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Youtube
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <div class="copyright">
          © 2025 Academia 750. Todos los derechos reservados.
        </div>
        <div class="footer-legal">
          <a href="#" class="legal-link">Política de Privacidad</a>
          <a href="#" class="legal-link">Términos de Uso</a>
          <a href="#" class="legal-link">Política de Cookies</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    subscribe() {
      console.log('Subscribe:', this.email)
      // Handle newsletter subscription
    }
  }
}
</script>

<style scoped>
.footer {
  font-family: 'Roboto', sans-serif !important;
  background-color: #ffffff;
  color: #333333;
}

.footer *,
.footer *::before,
.footer *::after {
  font-family: 'Roboto', sans-serif !important;
}

.footer-content {
  padding: 60px 70px 40px 70px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 60px;
  align-items: start;
}

.newsletter-section {
  max-width: 400px;
}

.logo {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
}

.logo-image {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.newsletter-description {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  line-height: 1.5;
  color: #666666;
  font-weight: 400;
  margin-bottom: 24px;
}

.newsletter-form {
  margin-bottom: 16px;
}

.email-input-container {
  display: flex;
  gap: 0;
}

.email-input {
  font-family: 'Roboto', sans-serif !important;
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #cccccc;
  border-right: none;
  border-radius: 0;
  font-size: 1rem;
  background-color: #ffffff;
  color: #333333;
}

.email-input:focus {
  outline: none;
  border-color: #999999;
}

.email-input::placeholder {
  color: #999999;
}

.subscribe-button {
  font-family: 'Roboto', sans-serif !important;
  background-color: #000000;
  color: #ffffff;
  border: 1px solid #000000;
  border-radius: 0;
  padding: 12px 20px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;
}

.subscribe-button:hover {
  background-color: #333333;
}

.privacy-text {
  font-family: 'Roboto', sans-serif !important;
  font-size: 0.875rem;
  line-height: 1.4;
  color: #666666;
  font-weight: 400;
}

.privacy-link {
  color: #000000;
  text-decoration: underline;
}

.privacy-link:hover {
  color: #333333;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.column-title {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1.125rem;
  font-weight: 600;
  color: #000000;
  margin-bottom: 20px;
  line-height: 1.3;
}

.footer-links,
.social-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links li a,
.social-links li a {
  font-family: 'Roboto', sans-serif !important;
  font-size: 1rem;
  color: #666666;
  text-decoration: none;
  font-weight: 400;
  line-height: 1.4;
  transition: color 0.2s ease;
}

.footer-links li a:hover,
.social-links li a:hover {
  color: #000000;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-bottom {
  border-top: 1px solid #e8e8e8;
  padding: 24px 70px;
  background-color: #ffffff;
}

.footer-bottom-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-family: 'Roboto', sans-serif !important;
  font-size: 0.875rem;
  color: #666666;
  font-weight: 400;
}

.footer-legal {
  display: flex;
  gap: 24px;
}

.legal-link {
  font-family: 'Roboto', sans-serif !important;
  font-size: 0.875rem;
  color: #666666;
  text-decoration: none;
  font-weight: 400;
  transition: color 0.2s ease;
}

.legal-link:hover {
  color: #000000;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    padding: 50px 40px 30px 40px;
  }
  
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  
  .newsletter-section {
    grid-column: 1 / -1;
    max-width: 100%;
  }
  
  .footer-bottom {
    padding: 20px 40px;
  }
}

@media (max-width: 767px) {
  .footer-content {
    padding: 40px 20px 20px 20px;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .email-input-container {
    flex-direction: column;
  }
  
  .email-input {
    border-right: 1px solid #cccccc;
    margin-bottom: 12px;
  }
  
  .footer-bottom {
    padding: 20px;
  }
  
  .footer-bottom-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .footer-legal {
    gap: 16px;
  }
}
</style> 