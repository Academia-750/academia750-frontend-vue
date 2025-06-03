<template>
  <div class="new-landing-page-view">
    <NewLandingPageComponent />
  </div>
</template>

<script>
import NewLandingPageComponent from '../components/NewLandingPage/NewLandingPage'

export default {
  name: 'NewLandingPageView',
  components: {
    NewLandingPageComponent
  },
  head: {
    title: {
      inner: 'Nueva Landing Page - Academia 750'
    }
  }
}
</script>

<style scoped>
.new-landing-page-view {
  min-height: 100vh;
}
</style> 