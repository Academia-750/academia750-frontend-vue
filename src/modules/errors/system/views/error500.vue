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
      <image-describe-error />
      <section-main-error />
      <div>
        <button-action text-button="Volver a cargar" :href="$router.currentRoute.path" />
      </div>
      <div>
        <button-action />
      </div>
    </div>
  </v-card>
</template>

<script>
import ImageDescribeError from '../components/ImageDescribeError.vue'
import SectionMainError from '../components/sectionMainError.vue'
import ButtonAction from '../components/ButtonAction.vue'

export default {
  name: 'Error500View',
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
