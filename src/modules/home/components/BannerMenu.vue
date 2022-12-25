<template>
  <v-container class="ma-0 pa-0">
    <v-row
      class="bg-image ma-0 pa-0"
      align="center"
      justify="center"
      fluid
    >
      <v-col cols="12" :class="sectionSmAndDownBrakpoint">
        <div class="mr-4">
          <div :class="manageClassResponsiveWrapperBanner">
            <span :class="manageClassResponsiveTitle" class="font-weight-bold">Academia de Bomberos 750</span>
          </div>
          <div :class="manageClassResponsiveWrapperBanner">
            <div :class="manageClassResponsiveSubtitle" class="width-subtitle-banner">
              <span>Descubre la fórmula para obtener el MÁXIMO RENDIMIENTO en tu oposición</span>
            </div>
          </div>
          <div :class="manageClassResponsiveWrapperBanner" class="mt-2">
            <v-btn
              rounded
              dark
              color="blue darken-1"
              class="pa-3"
            >
              Únete
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'BannerMenu',
  computed: {
    sectionSmAndDownBrakpoint () {
      return {
        'd-flex': true,
        'white--text': true,
        'justify-center': this.$vuetify.breakpoint.width < 600,
        'justify-end': this.$vuetify.breakpoint.smAndUp
      }
    },
    manageClassResponsiveTitle () {
      return {
        'title': this.$vuetify.breakpoint.width < 600,
        'font-weight-bold': true,
        'display-1': this.$vuetify.breakpoint.smAndUp
      }
    },
    manageClassResponsiveSubtitle () {
      return {
        'caption': this.$vuetify.breakpoint.width < 600,
        'subtitle-1': this.$vuetify.breakpoint.smAndUp
      }
    },
    manageClassResponsiveWrapperBanner () {
      return {
        'd-flex': true,
        'my-2': true,
        'justify-center': this.$vuetify.breakpoint.width < 600,
        'text-center': this.$vuetify.breakpoint.width < 600,
        'justify-start': this.$vuetify.breakpoint.smAndUp
      }
    }
  }
}
</script>

<style scoped>
.bg-image {
  background-image: url('/images/academia750/portada.PNG');
  height: 100vh !important;
  width: 100vw !important;
  background-position: center;
  background-size: cover;
}

.width-subtitle-banner {
  width: 75% !important;
}
</style>
