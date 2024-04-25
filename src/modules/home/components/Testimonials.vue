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
            <h3 class="titulo_1 white--text">Opinión de nuestros alumnos</h3>
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
              path-image="/images/academia750/testimonio_3.png"
              alt-image="Testimonio 1 - Academia 750"
              name-person="Alvaro Esteban"
              testimonial-person="Sin duda la mejor academia para bomberos de Alicante, la dedicación es máxima, no se puede pedir mas. El trato de 10 y el nivel tanto del material como de las clases es inmejorable."
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
              path-image="/images/academia750/testimonio_4.png"
              alt-image="Testimonio 2 - Academia 750"
              name-person="José Lledo"
              testimonial-person="He estado en diferentes academias tanto online como presencial y con diferencia es la que más nivel le ha exigido a los alumnos. Además del trato cercano y de calidad, es el primero en ponerse al dia con cualquier modificación que haya en cuanto al temario, legislación...Ojalá hubiera empezado antes en una academia como esta."
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
              path-image="/images/academia750/testimonio_5.png"
              alt-image="Testimonio 3 - Academia 750"
              name-person="Alvaro Cardona"
              testimonial-person="Academia de bomberos con un nivel muy alto tanto en calidad humana como en lo académico. Grandes compañeros y siempre muy buen ambiente. Manu se involucra mucho desde el principio y eleva tu nivel como opositor dándote las maximas facilidades."
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
