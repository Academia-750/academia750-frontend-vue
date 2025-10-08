<template>
  <div>
    <v-container class="seccion_tarifa">
      <h2 class="titulo_1 text-center">
        Nuestras tarifas se adaptan a tus <br />
        necesidades
      </h2>
      <v-row justify="center" class="align-stretch">
        <v-col lg="4" md="6" cols="12" class="d-flex">
          <item-tarifas
            titulo-tarifa="Basic"
            precio-tarifa="80"
            contenido-tarifa="Dos opciones, iniciación y avanzado, en función de tus necesidades.
            En iniciación te ayudaremos a conocer el temario y la oposición.
            En avanzado te exprimiremos al máximo para llegar a cualquier parte del temario."
            :items-tarifa="iniciacion"
            is-dark-button
            @emitClickInscriptionContactUs="
              $emit('emitClickInscriptionContactUs', 'Basic')
            "
          />
        </v-col>
        <v-col lg="4" md="6" cols="12" class="d-flex">
          <item-tarifas
            titulo-tarifa="Presencial + GYM"
            precio-tarifa="120"
            is-dark-button
            contenido-tarifa="Todo lo que incluye la cuota Basic, pero además:
            Incluimos el uso del aula de estudio y la opción de que puedas entrenar en nuestras instalaciones. Podrás usar el vestuario y continuar con tu estudio."
            :items-tarifa="Avanzado"
            @emitClickInscriptionContactUs="
              $emit('emitClickInscriptionContactUs', 'Presencial + GYM')
            "
          />
        </v-col>
        <v-col lg="4" md="6" cols="12" class="d-flex">
          <item-tarifas
            titulo-tarifa="Complex"
            precio-tarifa="150"
            is-dark-button
            is-recommended
            contenido-tarifa="Si necesitas entrenar con un grupo, tener un preparador físico que te corrija y aconseje en la carrera, fuerza y natación, 5 días por semana, te facilitamos esta tarifa incluyendo todo lo que aparece en la cuota Presencial + GYM."
            :items-tarifa="Complex"
            @emitClickInscriptionContactUs="
              $emit('emitClickInscriptionContactUs', 'Complex')
            "
          />
        </v-col>
        <!-- <v-col lg="4" md="6" cols="12">
          <item-tarifas
            titulo-tarifa="Online"
            precio-tarifa="50"
            :is-disabled-button="true"
            contenido-tarifa="Para l@s que necesitáis una preparación a vuestro ritmo de una forma online y totalmente autónoma os ofrecemos una tarifa con las siguientes funcionalidades. MUY PRONTO"
            :items-tarifa="Autoevealuable"
            @emitClickInscriptionContactUs="$emit('emitClickInscriptionContactUs', 'Online')"
          />
        </v-col> -->
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
      Avanzado: [
        'Preparación teórica',
        'Preparación física',
        'Supuestos prácticos',
        'Psicotécnicos',
        'Generador de test',
        'Clases presenciales',
        'Clases grabadas y/o explicativas',
        'Aula de estudio',
        'Entrena junto a otros opositores'
      ],
      Complex: [
        'Preparación teórica',
        'Planificación física',
        'Supuestos prácticos',
        'Psicotécnicos',
        'Generador de test',
        'Clases presenciales',
        'Clases grabadas y/o explicativas',
        'Aula de estudio',
        'Entrena junto a otros opositores',
        'Sesiones guiadas con preparador físico (incluye acceso a piscina)'
      ]
    }
  }
}
</script>
<style scoped>
.seccion_tarifa {
  padding-top: 20px;
  padding-bottom: 40px;
}

.align-stretch .v-col {
  display: flex;
  align-items: stretch;
}
</style>
