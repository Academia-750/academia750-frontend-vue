<template>
  <v-row dense class="ma-0 pa-0 mt-2 mt-sm-2 mt-md-4 mt-lg-4 mt-xl-4 mb-1 mb-sm-1 mb-md-2 mb-lg-2 mb-xl-2 d-flex justify-center">
    <item-our-service
      cols="12"
      sm="6"
      md="6"
      lg="4"
      xl="4"
      path-image-service="/images/academia750/teorica.svg"
      title-service="Preparación teórica"
      description-service="Disponemos de nivel de iniciación y alto rendimiento. Clases semanales, presenciales u online. Preguntas por bloques, simulacros y autoevaluaciones."
    />
    <item-our-service
      cols="12"
      sm="6"
      md="6"
      lg="4"
      xl="4"
      path-image-service="/images/academia750/fisica.svg"
      title-service="Preparación física"
      description-service="Planificamos y generamos la preparación física completa. Facilitamos dos tipos de entrenamiento para que escojas al que mejor se adecue a tus necesidades."
    />
    <item-our-service
      cols="12"
      sm="6"
      md="6"
      lg="4"
      xl="4"
      path-image-service="/images/academia750/test.svg"
      title-service="Generador de test"
      description-service="Elije tu oposición, configura el test y autoevalúate de forma ilimitada. Incluye tarjetas de memoria para afianzar tus conocimientos."
    />
    <item-our-service
      cols="12"
      sm="6"
      md="6"
      lg="4"
      xl="4"
      path-image-service="/images/academia750/practicos.svg"
      title-service="Supuestos prácticos"
      description-service="Preparamos supuestos prácticos para cada oposición. Ejercicios tipo test, preguntas cortas o desarrollo."
    />
    <item-our-service
      cols="12"
      sm="6"
      md="6"
      lg="4"
      xl="4"
      path-image-service="/images/academia750/psicotecnicos.svg"
      title-service="Psicotécnicos"
      description-service="Incorporamos la preparación de psicotécnicos de forma que no olvidamos ninguna de las pruebas."
    />
  </v-row>
</template>

<script>
import ItemOurService from './ItemOurService'

export default {
  name: 'ListOurServices',
  components: {
    ItemOurService
  }
}
</script>
