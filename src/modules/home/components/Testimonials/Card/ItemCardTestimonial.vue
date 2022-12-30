<template>
  <v-card
    evelation="10"
    rounded
    class="mx-auto rounded-xl px-2 py-3 card-item-testimonial overflow-y-hidden overflow-x-auto"
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
          <p class="title font-weight-bold ma-0 pa-0 ml-1">{{ namePerson }}</p>
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
      <div class="font-weight-bold text-subtitle-1">
        {{ testimonialPerson }}
      </div>

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
      if (this.$vuetify.breakpoint.width < 490) {
        return 270
      }

      return 355
    }
  }
}
</script>

<style scoped>
  .card-item-testimonial {
    min-height: 420px !important;
  }
</style>
