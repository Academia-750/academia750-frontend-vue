<template>
  <div class="top-menu ma-0 pa-0">
    <v-row dense no-gutters>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="6"
        xl="6"
        class="d-flex justify-center"
      >
        <span class="title-top-menu align-self-center">Dando formación para bomberos desde 2016</span>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="6"
        xl="6"
      >
        <div class="d-flex align-center justify-center">
          <span class="font-size-13 align-self-center">Teléfono de contacto:</span>
          <v-btn
            text
            class="font-weight-bold align-self-center ma-0 pa-0 ml-1"
            @click="redirectToCallPhoneNumber"
          >
            +34663261014
          </v-btn>
          <v-btn
            icon
            color="blue"
            class="pa-1 ml-1"
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            icon
            color="yellow darken-2 align-self-center"
            class="pa-1 ml-1"
          >
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'TopMenu',
  computed: {
    sectionSmAndDownBrakpoint () {
      return {
        'd-flex': true,
        'justify-center': this.$vuetify.breakpoint.smAndDown,
        'justify-end': this.$vuetify.breakpoint.mdAndUp
      }
    }
  },
  methods: {
    redirectToFacebookSocialMedia () {
      window.open('https://www.facebook.com/AcademiaBomberos750/', '_blank')
    },
    redirectToInstagramSocialMedia () {
      window.open('https://www.instagram.com/academia.750/', '_blank')
    },
    redirectToCallPhoneNumber () {
      window.open('tel:+34663261014', '_self')
    }
  }
}
</script>

<style scoped>
  .top-menu {
    border-bottom: 1px solid #DADADA;
  }

  .title-top-menu {
    font-size: 13px!important;
    color: #717171!important;
  }

  .phone-number {
    font-size: 13px!important;
    color: #000;
  }

  .font-size-13 {
    font-size: 13px!important;
  }
</style>
