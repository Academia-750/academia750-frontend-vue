<template>
  <v-card
    evelation="10"
    rounded
    class="mx-auto rounded-xl px-2 pt-2 card-item-testimonial overflow-y-hidden overflow-x-auto"
    :max-width="widthCardResponsive"
  >
    <v-container class="my-0 py-0">
      <v-row dense>
        <v-col
          cols="3"
          sm="3"
          md="3"
          lg="3"
          xl="3"
          class="d-flex justify-center align-center"
        >
          <v-img
            :src="pathImage"
            contain
            max-width="70"
            max-height="70"
            :alt="altImage"
          />
        </v-col>
        <v-col
          cols="9"
          sm="9"
          md="9"
          lg="9"
          xl="9"
        >
          <h2 class="nombre_persona">{{ namePerson }}</h2>
          <v-rating
            :value="5"
            color="amber accent-2"
            class="ma-0 pa-0"
            dense
            readonly
            size="25"
          ></v-rating>
        </v-col>
      </v-row>
    </v-container>

    <v-card-text class="my-2 py-0">
      <p class="contenido_testimonio">
        {{ testimonialPerson }}
      </p>

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ItemCardTestimonial',
  props: {
    pathImage: {
      type: String,
      required: true
    },
    altImage: {
      type: String,
      required: true
    },
    namePerson: {
      type: String,
      required: true
    },
    testimonialPerson: {
      type: String,
      required: true
    }
  },
  data: () => ({

  }),
  computed: {
    widthCardResponsive () {
      if (this.$vuetify.breakpoint.width < 400) {
        return 270
      }

      return 355
    }
  }
}
</script>

<style scoped>
  .card-item-testimonial {
    min-height: 310px !important;
  }
  .nombre_persona{

    font-size: 20px;
    font-family: var(--fuente_uno);
    color: #000;

  }
  .contenido_testimonio{
    color: #000;
  }
</style>
