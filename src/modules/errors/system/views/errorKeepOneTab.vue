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
      <image-describe-error
        src-image="/images/errors/unauthorized.jpg"
      />
      <section-main-error
        title="Acción no permitida"
        description="Solo puedes mantener una pestaña abierta del sistema"
      />
    </div>
  </v-card>
</template>

<script>
import ImageDescribeError from '../components/ImageDescribeError.vue'
import SectionMainError from '../components/sectionMainError.vue'

export default {
  name: 'Error500View',
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
