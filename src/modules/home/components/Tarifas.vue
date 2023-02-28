<template>
  <div>
    <v-container class="seccion_tarifa">
      <h2 class="titulo_1 text-center">
        Nuestras tarifas se adaptan a tus <br> necesidades
      </h2>
      <v-row>
        <v-col lg="4" md="6" cols="12">
          <item-tarifas
            titulo-tarifa="Iniciación"
            precio-tarifa="80"
            contenido-tarifa="Si lo que buscas es comenzar a preparar la oposición y necesitas comprender y asimilar los conceptos para conseguir una buena base te ofrecemos la siguiente tarifa con todo esto incluido:"
            :items-tarifa="iniciacion"
            @emitClickInscriptionContactUs="$emit('emitClickInscriptionContactUs', 'Iniciación')"
          />
        </v-col>
        <v-col lg="4" md="6" cols="12">
          <item-tarifas
            titulo-tarifa="Avanzado"
            precio-tarifa="80"
            contenido-tarifa="Si lo que necesitas es exprimirte al máximo, llegar a partes del temario donde otros no llegan y no dejar nada al azar, te ofrecemos un grupo para mejorar con todo lo siguiente incluido:"
            :items-tarifa="iniciacion"
            @emitClickInscriptionContactUs="$emit('emitClickInscriptionContactUs', 'Avanzado')"
          />
        </v-col>
        <v-col lg="4" md="6" cols="12">
          <item-tarifas
            titulo-tarifa="Online"
            precio-tarifa="20"
            contenido-tarifa="Para l@s que necesitáis una preparación a vuestro ritmo de una forma online y totalmente autónoma os ofrecemos una tarifa con las siguientes funcionalidades. MUY PRONTO"
            :items-tarifa="Autoevealuable"
            @emitClickInscriptionContactUs="$emit('emitClickInscriptionContactUs', 'Online')"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import ItemTarifas from './Tarifas/ItemTarifas'
export default {
  name: 'Tarifa',
  components: {
    ItemTarifas
  },
  data() {
    return {
      iniciacion: [
        'Preparación teórica',
        'Preparación física',
        'Supuestos prácticos',
        'Psicotécnicos',
        'Generador de test',
        'Clases de forma presencial u online.'
      ],
      Autoevealuable: [
        'Preparación teórica',
        'Preparación física',
        'Supuestos prácticos',
        'Psicotécnicos',
        'Generador de test',
        'Grabaciones teóricas'
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
