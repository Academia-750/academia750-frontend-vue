<template>
  <v-container class="ma-0 pa-0">
    <div
      class="bg-image estilo_banner ma-0 pa-0"
      align="center"
      justify="center"
      fluid
    >
      <v-container>
        <v-row align="center" justify="end" class="contenido_banner">
          <v-col lg="5" cols="12" :class="sectionSmAndDownBrakpoint">
            <div class="mr-lg-4">
              <div
                :class="manageClassResponsiveWrapperBanner"
                class="text-start"
              >
                <span
                  class="font-weight-black titulo_banner"
                >
                  Academia de Bomberos 750
                </span>
              </div>
              <div
                :class="manageClassResponsiveWrapperBanner"
                class="text-start"
              >
                <div class="width-subtitle-banner">
                  <span class="texto_banner text-md-start text-center">Descubre la fórmula para obtener el MÁXIMO RENDIMIENTO en
                    tu oposición</span>
                </div>
              </div>
              <div
                :class="manageClassResponsiveWrapperBanner"
                class="mt-2 boton_banner"
              >
                <button-go-to-register-contact-us
                  @executeRegisterContactUs="$emit('executeRegisterContactUs')"
                />
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>

<script>
import ButtonGoToRegisterContactUs from './ButtonGoToRegisterContactUs'

export default {
  name: 'BannerMenu',
  components: {
    ButtonGoToRegisterContactUs
  },
  computed: {
    sectionSmAndDownBrakpoint() {
      return {
        'd-flex': true,
        'white--text': true,
        'justify-center': this.$vuetify.breakpoint.width < 600,
        'justify-end': this.$vuetify.breakpoint.smAndUp
      }
    },
    manageClassResponsiveTitle() {
      return {
        title: this.$vuetify.breakpoint.width < 600,
        'font-weight-bold': true,
        'display-1': this.$vuetify.breakpoint.smAndUp
      }
    },
    manageClassResponsiveSubtitle() {
      return {
        caption: this.$vuetify.breakpoint.width < 600,
        'subtitle-1': this.$vuetify.breakpoint.smAndUp
      }
    },
    manageClassResponsiveWrapperBanner() {
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
  mix-blend-mode: multiply;
}

.width-subtitle-banner {
  width: 75% !important;
}
.titulo_banner{
  font-size: 64px!important;
  line-height: 64px!important;
  font-family: var(--fuente_cuatro)!important;
  color: #fff;
}
.contenido_banner{
  height: 100vh;
}
.texto_banner{
  color: #fff !important;
  font-size: 20px !important;
  font-family: var(--fuente_uno)!important;

}
.boton_banner > button{
    background: rgb(42, 153, 186);
    background: linear-gradient( 98deg, rgba(42, 153, 186, 1) 0%, rgba(117, 189, 210, 1) 100% );
    border: none !important;
    border-radius: 20px;
    font-family: var(--fuente_cuatro);
    font-size: 18px !important;
    height: 53px!important;
    width: 150px!important;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff !important;
    padding:0px!important;
}
.texto_banner{
  text-align: start;
}

@media(max-width:991px){
  .titulo_banner{
    font-size: 40px!important;
    line-height: 40px!important;
    text-align: center;
  }
  .texto_banner{
    text-align: center;
  }
  .bg-image{
    height: 90vh !important;
    align-items: center;
    display: flex;
  }
}

</style>
