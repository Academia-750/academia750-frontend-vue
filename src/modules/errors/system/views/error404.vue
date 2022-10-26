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
      <image-describe-error src-image="/images/errors/not-found.jpg" />
      <section-main-error
        title="Recurso no encontrado"
        description="No podemos procesar la solicitud. Asegúrese de solicitar correctamente su petición"
      />
      <button-action />
    </div>
  </v-card>
</template>

<script>
import ImageDescribeError from '../components/ImageDescribeError.vue'
import SectionMainError from '../components/sectionMainError.vue'
import ButtonAction from '../components/ButtonAction.vue'

export default {
  name: 'Error400View',
  components: {
    ImageDescribeError,
    SectionMainError,
    ButtonAction
  }
}
</script>

<style scoped>
.full-height {
  height: 100vh !important;
}
</style>