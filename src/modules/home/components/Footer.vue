<template>
  <div class="estilo_footer">
    <v-container>
      <v-row align="center">
        <v-col lg="3" cols="12">
          <FooterUno />
        </v-col>
        <v-col lg="9" cols="12">
          <v-row align="start">
            <v-col lg="4" cols="12">
              <h2>Academia 750</h2>
              <div class="linea_footer"></div>
              <div>
                <FooterDos @emitScrollToSectionHomePage="$emit('emitScrollToSectionHomePage', $event)"/>
              </div>
            </v-col>
            <v-col lg="4" md="6" cols="12">
              <h2>Contáctanos</h2>
              <div class="linea_footer"></div>
              <div>
                <ul class="lista_footer mt-2" style="list-style: none;">
                  <FooterTres
                    ico-contacto="mdi-map-marker"
                    items-contacto="Av. Pintor Pastor Calpena 4, local izquierdo, 03680 Aspe, Alicante"
                  />
                  <FooterTres
                    ico-contacto="mdi-phone"
                    items-contacto="+34633261014"
                  />
                  <FooterTres
                    ico-contacto="mdi-email"
                    items-contacto=" hola@academia750.es"
                  />
                </ul>
              </div>
            </v-col>
            <v-col lg="4" md="6" cols="12">
              <h2>Siguenos</h2>
              <div class="linea_footer"></div>
              <div class="mt-2 text-center text-lg-start">
                <FooterRedes
                  link-redes-footer="https://www.facebook.com/AcademiaBomberos750/"
                  ico-redes-footer="mdi-facebook"
                />
                <FooterRedes
                  link-redes-footer="https://www.instagram.com/academia.750/"
                  ico-redes-footer="mdi-instagram"
                />
              </div>
              <div class="mt-1">
                <v-btn small text dark @click="executeLoginAccountAction">
                  <v-icon>mdi-account-circle</v-icon> <span class="ml-1">Área privada</span>
                </v-btn>
              </div>
              <!-- <div class="mt-1">
                <v-btn small text dark>
                  <v-icon>mdi-book-lock-open</v-icon> <span class="ml-1">Términos y condiciones</span>
                </v-btn>
              </div> -->
              <div class="mt-1">
                <v-btn small text dark @click="openAgreementLegalDialog">
                  <v-icon>mdi-book-lock-open</v-icon> <span class="ml-1">Aviso legal</span>
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <agreement-legal-dialog ref="AgreementLegalDialog" title="Aviso legal" src-file-legal="/legal/agreement_legal.pdf"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import FooterUno from './Footer/FooterUno'
import FooterDos from './Footer/FooterDos'
import FooterTres from './Footer/FooterTres'
import FooterRedes from './Footer/FooterRedes'
import AgreementLegalDialog from './Legal/AgreementDialogLegal'

export default {
  name: 'Footer',
  components: {
    FooterUno,
    FooterDos,
    FooterRedes,
    FooterTres,
    AgreementLegalDialog
  },
  data() {
    return {
      FooterMenu: ['Inicio', 'Qué ofrecemos', 'Tarifas', 'Contáctanos'],
      Contactanos: [
        'Av. Pintor Pastor Calpena 4, local izquierdo, 03680 Aspe, Alicante',
        '+34633261014',
        'hola@academia750.es'
      ]
    }
  },
  methods: {
    executeLoginAccountAction () {
      if (Cookies.get('authorization')) {
        this.$router.push({
          name: 'update-my-profile'
        })

        return
      }

      this.$router.push({
        name: 'login'
      })
      //this.$emit('emitShowLoginDialog')
    },
    openAgreementLegalDialog () {
      this.$refs['AgreementLegalDialog'].isOpenDialog = true
    }
  }
}
</script>
<style scoped>

.estilo_footer {
  background-color: #202020;
  color: #fff;
}
.lista_footer{
    list-style: none!important;;
    padding-left: 0px!important;
}

.estilo_footer h2{
    font-size: 16px;
    font-family: var(--fuente_cuatro);

}
.linea_footer {
    height: 1px;
    width: 150px;
    background-color: #fff;
}
.acceso_estilo{
    display: flex;
    align-items: center;
    font-family: var(--fuente_uno) !important;
    color: #fff!important;
    text-decoration: none!important;
}
.acceso_estilo .v-image__image , .acceso_estilo  .v-responsive__sizer{
    background-size: contain;
    width: 50px;
    height: 50px;
}
.acceso_estilo  .v-responsive__sizer{
    padding-bottom: 0px!important;
}
@media(max-width:768px){
  .estilo_footer h2{
    font-size: 25px;
    text-align: center;
  }
  .linea_footer{
    margin: 0 auto;
  }
}
</style>
