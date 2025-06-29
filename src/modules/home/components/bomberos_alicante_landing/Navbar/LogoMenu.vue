<template>
  <div class="logo-menu">
    <router-link to="/" class="logo-link">
      <v-img 
        src="/images/academia750/logo.png" 
        width="50" 
        height="50"
        contain
        class="logo-image"
        alt="Academia 750 Logo"
      ></v-img>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'LogoMenu'
}
</script>

<style scoped>
.logo-menu {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.logo-link:hover {
  opacity: 0.8;
}

.logo-image {
  cursor: pointer;
}

/* Responsive logo sizing */
@media (max-width: 600px) {
  .logo-image {
    width: 35px !important;
    height: 35px !important;
  }
}
</style> 