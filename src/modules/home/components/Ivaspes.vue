<template>
  <div>
    <v-container class="seccion_tarifa">
      <h2 class="titulo_1 text-center">
        Paquetes de preguntas sobre el temario <br> IVASPE
      </h2>
      <v-row>
        <v-col lg="4" md="6" cols="12">
          <item-tarifas
            titulo-tarifa="Paquete 1"
            precio-tarifa="100"
            contenido-tarifa="M1 Operaciones de extinción de incendios en interiores. Paquete con cientos de preguntas con sus respuestas del primero bloque del manual IVASPE."
            :items-tarifa="packet1"
            is-dark-button
            button-text="Solicitalo"
            background-color="red"
            @emitClickInscriptionContactUs="$emit('emitClickInscriptionContactUs', 'Paquete 1')"
          />
        </v-col>
        <v-col lg="4" md="6" cols="12">
          <item-tarifas
            titulo-tarifa="Paquete 2"
            precio-tarifa="100"
            is-dark-button
            contenido-tarifa="M2 Riesgos naturales: Principales riesgos naturales. Meteoalerta. Paquete con cientos de preguntas con sus respuestas del segundo bloque del manual IVASPE."
            :items-tarifa="packet2"
            background-color="orange"
            @emitClickInscriptionContactUs="$emit('emitClickInscriptionContactUs', 'Paquete 2')"
          />
        </v-col>
        <v-col lg="4" md="6" cols="12">
          <item-tarifas
            titulo-tarifa="Paquete 3"
            precio-tarifa="100"
            is-dark-button
            contenido-tarifa="M3 Uso de recursos operativos. Paquete con cientos de preguntas con sus respuestas del tercer bloque del manual IVASPE."
            :items-tarifa="packet3"
            background-color="blue"
            @emitClickInscriptionContactUs="$emit('emitClickInscriptionContactUs', 'Paquete 3')"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ItemTarifas from './Tarifas/ItemTarifas'
export default {
  name: 'Ivaspe',
  components: {
    ItemTarifas
  },
  data() {
    return {
      packet1: [
        'Principios de lucha contra incendios',
        'Incendios de interior',
        'Incendios de vegetación',
        'Equipos e instalaciones de protección contra incendios',
        'Rescate en accidentes de tráfico',
        'Rescate en altura',
        'Rescate acuático'
      ],
      packet2: [
        'Accidentes con materias peligrosas',
        'Redes de distribución e instalaciones',
        'Construcción',
        'Urgencias sanitarias'
      ],
      packet3: [
        'Equipos de protección respiratoria',
        'Medios de extinción',
        'Bombas e hidráulica básica',
        'Vehículos. Conducción segura',
        'Equipos de salvamento',
        'Comunicaciones'
      ]
    }
  }
}
</script>
<style scoped>
  /* .seccion_tarifa {
    padding-top: 70px;
  } */

</style>
