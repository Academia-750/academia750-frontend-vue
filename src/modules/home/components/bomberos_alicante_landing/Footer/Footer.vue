<template>
  <footer class="footer">
    <div class="footer-content">
      <!-- Logo Section -->
      <div class="footer-section logo-section">
        <div class="logo">
          <img 
            src="/images/academia750/logo.png" 
            alt="Academia 750 Logo"
            class="logo-image"
          />
        </div>
        
        <div class="contact-info">
          <div class="info-group">
            <h3>Dirección</h3>
            <p>Av. Mare Nostrum 6 (entrada por C/Estrella fugaz), 03007, Alicante</p>
          </div>
          
          <div class="info-group">
            <h3>Contacto:</h3>
            <p>
              <a href="tel:+34633261014" class="contact-link">+34633261014</a><br>
              <a href="mailto:hola@academia750.es" class="contact-link">hola@academia750.es</a>
            </p>
          </div>
          
          <div class="social-links">
            <a href="https://www.facebook.com/academia750/" class="social-link" aria-label="Facebook" target="_blank">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/academia.750/" class="social-link" aria-label="Instagram" target="_blank">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/academia750/" class="social-link" aria-label="LinkedIn" target="_blank">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.youtube.com/@academia750" class="social-link" aria-label="YouTube" target="_blank">
              <i class="fab fa-youtube"></i>
            </a>
            <a href="https://www.tiktok.com/@academia.750" class="social-link" aria-label="TikTok" target="_blank">
              <i class="fa-brands fa-tiktok"></i>
            </a>
            <a href="https://t.me/academia750" class="social-link" aria-label="Telegram" target="_blank">
              <i class="fab fa-telegram-plane"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Navigation Section -->
      <div class="footer-section nav-section">
        <nav class="footer-nav">
          <a href="#" class="nav-link">Inicio</a>
          <a href="#" class="nav-link">Qué Ofrecemos</a>
          <a href="#" class="nav-link">Tarifas</a>
          <a href="#" class="nav-link">Contacto</a>
          <a href="#" class="nav-link">Area Privada</a>
        </nav>
      </div>
    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <div class="footer-bottom-content">
        <p class="copyright">© 2025 Academia 750. Todos los derechos reservados</p>
        <a href="#" class="legal-link">Aviso Legal</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  font-family: 'Roboto', sans-serif !important;
  background-color: #ffffff;
  color: #000000;
  padding: 60px 50px 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  gap: 40px;
}

.footer-section {
  flex: 1;
}

.logo-section {
  flex: 2;
}

.logo {
  margin-bottom: 30px;
}

.logo-image {
  height: 40px;
  width: auto;
  object-fit: contain;
}

.contact-info {
  max-width: 400px;
}

.info-group {
  margin-bottom: 24px;
}

.info-group h3 {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.info-group p {
  font-size: 1rem;
  line-height: 1.5;
  color: #666666;
  margin: 0;
}

.contact-link {
  color: #666666;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.contact-link:hover {
  color: #000000;
}

.social-links {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.social-link {
  color: #000000;
  font-size: 1.25rem;
  transition: opacity 0.2s ease;
}

.social-link:hover {
  opacity: 0.7;
}

.nav-section {
  display: flex;
  justify-content: flex-end;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.nav-link {
  color: #000000;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #666666;
}

.footer-bottom {
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px solid #EEEEEE;
}

.footer-bottom-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  font-size: 0.875rem;
  color: #666666;
  margin: 0;
}

.legal-link {
  font-size: 0.875rem;
  color: #666666;
  text-decoration: underline;
  transition: color 0.2s ease;
}

.legal-link:hover {
  color: #000000;
}

/* Responsive Design */
@media (max-width: 959px) {
  .footer {
    padding: 40px 30px 20px;
  }

  .footer-content {
    flex-direction: column;
    gap: 40px;
  }

  .nav-section {
    justify-content: flex-start;
  }

  .footer-nav {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
  }
}

@media (max-width: 599px) {
  .footer {
    padding: 30px 20px 20px;
  }

  .footer-bottom-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
}
</style>