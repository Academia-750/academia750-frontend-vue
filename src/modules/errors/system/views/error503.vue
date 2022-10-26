<template>
  <v-card
    class="
      text-center
      w-full
      full-height
      error-page
      d-flex
      align-center
      justify-center
      overflow-x-hidden overflow-y-auto
    "
  >
    <div class="overflow-y-auto">
      <image-describe-error src-image="/images/errors/maintenance.jpg" />
      <section-main-error
        title="Aplicación no disponible"
        description="La aplicación se encuentra en mantemiento. Por favor, intente más tarde."
      />
    </div>
  </v-card>
</template>

<script>
import ImageDescribeError from '../components/ImageDescribeError.vue'
import SectionMainError from '../components/sectionMainError.vue'

export default {
  name: 'Error400View',
  components: {
    ImageDescribeError,
    SectionMainError
  }
}
</script>

<style scoped>
.full-height {
  height: 100vh !important;
}
</style>