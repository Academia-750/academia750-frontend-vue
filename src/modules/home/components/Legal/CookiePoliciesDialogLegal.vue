<template>
  <v-row justify="center">
    <v-dialog v-model="isOpenDialog" persistent max-width="800px">
      <v-card>
        <v-toolbar dark color="primary">
          <!-- <v-btn icon dark @click="closeAndSaveAgreementDialogLegal">
            <v-icon>mdi-close</v-icon>
          </v-btn> -->
          <v-toolbar-title>Aviso de Cookies</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pt-4">
          Este sitio utiliza cookies para prestar sus servicios. Si continúa con
          la navegación, consideramos que acepta este uso.
          <v-btn text color="primary" @click="openCookiesAgreementDialog"> Política de Cookies </v-btn>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="closeAndSaveAgreementDialogLegal"
          >
            Aceptar
          </v-btn>
        </v-card-actions>
        <cookie-agreement-dialog ref="CookieAgreementDialog" title="Política de Cookies" src-file-legal="/legal/cookies_agreement.pdf"/>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import jsCookie from 'js-cookie'
import CookieAgreementDialog from './AgreementDialogLegal'

export default {
  name: 'CookiePoliciesDialogLegal',
  components: {
    CookieAgreementDialog
  },
  data() {
    return {
      isOpenDialog: false
    }
  },
  methods: {
    closeAndSaveAgreementDialogLegal() {
      const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
      const DOMAIN_APP_DEVELOPMENT =
        process.env.VUE_APP_BASE_URL_DOMAIN_FOR_COOKIES_DEVELOPMENT
      const DOMAIN_APP_PRODUCTION =
        process.env.VUE_APP_BASE_URL_DOMAIN_FOR_COOKIES_PRODUCTION

      this.isOpenDialog = false
      jsCookie.set('accept_cookies_agreement', 'ok', {
        domain: IsDevelopmentEnviroment
          ? DOMAIN_APP_DEVELOPMENT
          : DOMAIN_APP_PRODUCTION,
        sameSite: 'Lax'
      })
    },
    openCookiesAgreementDialog () {
      this.$refs['CookieAgreementDialog'].isOpenDialog = true
    }
  }
}
</script>

<style scoped>
.v-card__subtitle,
.v-card__text {
  font-size: 18px;
  font-weight: 600;
}
</style>
