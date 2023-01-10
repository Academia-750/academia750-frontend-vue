<template>
  <div class="section-testimonials">
    <v-container>
      <v-row dense>
        <v-col
          cols="12"
          sm="12"
          md="12"
          lg="12"
          xl="12"
        >
          <v-container class="d-flex justify-center text-center pt-5">
            <p class="titulo_1 white--text">Opinión de nuestros alumnos</p>
          </v-container>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="4"
          xl="4"
        >

          <v-container class="d-flex justify-center">
            <item-card-testimonial
              path-image="/images/academia750/testimonio_1.png"
              alt-image="Testimonio 1 - Academia 750"
              name-person="Carlos Meseguer"
              testimonial-person="La mejor academia para preparar oposiciones a bomberos. Personal dedicado e implicado al 100% en mejorar y aprende a través de un método que engancha. ¡Totalmente recomendable!"
            />
          </v-container>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="6"
          lg="4"
          xl="4"
        >

          <v-container class="d-flex justify-center">
            <item-card-testimonial
              path-image="/images/academia750/testimonio_1.png"
              alt-image="Testimonio 2 - Academia 750"
              name-person="Nadia Serrano"
              testimonial-person="Academia en la que no solo los materiales y la dedicación del profesorado en el aprendizaje del alumno son inmejorables, sino donde también es fundamental el apoyo que se recibe por su parte, tan importante en este duro camino que es la oposición a bombero."
            />
          </v-container>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="12"
          lg="4"
          xl="4"
        >

          <v-container class="d-flex justify-center">
            <item-card-testimonial
              path-image="/images/academia750/testimonio_1.png"
              alt-image="Testimonio 3 - Academia 750"
              name-person="José Niñerola"
              testimonial-person="Sin duda, academia de referencia para preparar la oposición a bombero, el equipo docente está comprometidísimo, el material docente espectacular, y el ambiente en las clases, presenciales y on-line claro y directo, sin rodeos ni pregutas extrañas. Una apuesta segura para prepara la oposición a bombero."
            />
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ItemCardTestimonial from './Testimonials/Card/ItemCardTestimonial'

export default {
  name: 'Testimonials',
  components: {
    ItemCardTestimonial
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.section-testimonials{
  position: relative;
}
  .section-testimonials::before {
    content: '';
    background: rgb(71, 162, 188);
    background: linear-gradient( 178deg, rgba(71, 162, 188, 1) 0%, rgba(75, 163, 188, 1) 100% );
    position: absolute;
    top: 0;
    width: 100%;
    height: 332px;
    z-index: 0;
  }
  .section-testimonials .titulo_1{
    z-index: 1;
  }
  .section-testimonials > .container{
    border-bottom: 1px solid #e3e1e1;
    margin: 80px auto;
  }

</style>
