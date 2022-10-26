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
      <image-describe-error src-image="/images/errors/error.jpg" />
      <section-main-error
        title="Numero de solicitudes excedida"
        description="Hemos detectado un comportamiento inusual al intentar procesar muchas solicitudes en el mismo minuto. Por favor, espere otro minuto para poder seguir realizando más solicitudes"
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