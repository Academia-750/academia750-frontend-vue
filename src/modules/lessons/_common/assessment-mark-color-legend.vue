<template>
  <div class="d-inline-block">
    <v-tooltip top color="white">
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          class="cursor-pointer"
          small
          color="grey"
          v-on="on"
        >
          mdi-information-outline
        </v-icon>
      </template>
      <div class="legend-tooltip">
        <div class="text-body-2 font-weight-bold mb-2 text--primary">
          Leyenda de Colores:
        </div>
        <div class="text-caption text--secondary mb-3">
          El color indica el umbral al que pertenece tu nota según las
          puntuaciones de esta evaluación específica.
        </div>
        <div class="d-flex align-center mb-2">
          <v-icon small color="success">mdi-circle</v-icon>
          <span class="ml-2 text-caption text--primary">
            Verde: 80-100% (Más alto)
          </span>
        </div>
        <div class="d-flex align-center mb-2">
          <v-icon small color="primary">mdi-circle</v-icon>
          <span class="ml-2 text-caption text--primary">Azul: 60-80%</span>
        </div>
        <div class="d-flex align-center mb-2">
          <v-icon small color="warning">mdi-circle</v-icon>
          <span class="ml-2 text-caption text--primary">Amarillo: 40-60%</span>
        </div>
        <div class="d-flex align-center mb-2">
          <v-icon small color="orange">mdi-circle</v-icon>
          <span class="ml-2 text-caption text--primary">Naranja: 20-40%</span>
        </div>
        <div class="d-flex align-center mb-2">
          <v-icon small color="error">mdi-circle</v-icon>
          <span class="ml-2 text-caption text--primary">
            Rojo: 0-20% (Más bajo)
          </span>
        </div>
        <div
          v-if="lowestMark !== null && highestMark !== null"
          class="mt-3 pt-3"
          style="border-top: 1px solid rgba(0, 0, 0, 0.2)"
        >
          <div class="text-caption text--secondary">
            Rango de esta evaluación:
          </div>
          <div class="text-caption font-weight-medium text--primary">
            {{ lowestMark }} - {{ highestMark }}
          </div>
        </div>
      </div>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'AssessmentMarkColorLegend',
  props: {
    lowestMark: {
      type: [Number, String],
      default: null
    },
    highestMark: {
      type: [Number, String],
      default: null
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.legend-tooltip {
  padding: 4px;
  min-width: 220px;
}

::v-deep .v-tooltip__content {
  opacity: 1 !important;
  background-color: white !important;
}
</style>
