<template>
  <div class="new-landing-page-view">
    <BomberosAlicante />
  </div>
</template>

<script>
import BomberosAlicante from '../components/bomberos_alicante_landing/bomberos-alicante'

export default {
  name: 'BomberosAlicanteLanding',
  components: {
    BomberosAlicante
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
