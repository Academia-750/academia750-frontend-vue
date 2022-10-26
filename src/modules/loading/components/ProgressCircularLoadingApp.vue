<template>
  <div>
    <v-overlay
      :opacity="0.9"
    >
      <v-progress-circular
        indeterminate
        :size="250"
        :width="15"
        class="d-flex justify-center align-content-end"
      >
        <span>
          Procesando la solicitud...
        </span>
      </v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'ProgressCircularLoadingAppComponent'
}
</script>
