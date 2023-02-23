<template>
  <div class="estilo_formulario">
    <v-container>
      <v-row align="center">
        <v-col lg="6" cols="12">
          <h2>Contacta con nosotros</h2>
          <p>Estaremos encantados de resolverte cualquier duda.</p>
        </v-col>
        <v-col lg="6" cols="12" class="text-center">
          <div>
            <v-btn
              dark
              text
              class="font-weight-bold align-self-center ma-0 pa-0 ml-1 subtitle-2"
              @click="redirectToCallPhoneNumber"
            >
              +34663261014
            </v-btn>
          </div>
          <div>
            <v-btn
              dark
              text
              class="font-weight-bold align-self-center ma-0 pa-0 ml-1 subtitle-2"
              @click="redirectToSendMailAcademia"
            >
              hola@academia750.es
            </v-btn>
            <!-- <a href="#">hola@academia750.es</a> -->
          </div>
        </v-col>
      </v-row>
    </v-container>
    <form id="contact-form-home" name="contact-form__home" autocomplete="off">
      <validation-observer ref="FormSubmitContactUs">
        <v-container>
          <v-row>
            <v-col cols="12" lg="12">
              <ValidationProvider
                v-slot="{ errors }"
                vid="g-recaptcha-response"
                mode="aggressive"
                name="g-recaptcha-response"
              >
                <v-alert
                  v-if="errors.length > 0"
                  prominent
                  type="error"
                >
                  <v-row align="center">
                    <v-col class="grow">
                      {{ errors[0] }}
                    </v-col>
                    <v-col class="shrink">
                      <v-btn @click="reloadWindowByRecaptcha">Recargar página web</v-btn>
                    </v-col>
                  </v-row>
                </v-alert>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="3">
              <ValidationProvider
                v-slot="{ errors }"
                vid="reason"
                mode="aggressive"
                name="Motivo"
                rules="required"
              >
                <v-select
                  v-model="form.reason"
                  solo
                  :items="itemsReasonSelect"
                  :error-messages="errors"
                  placeholder="Motivo"
                  item-text="label"
                  item-value="key"
                ></v-select>
              </ValidationProvider>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="6">
              <name-person-input
                ref="namePersonInputComponent"
                rules="requiredFirstName|min:3|max:255|mustContainLettersAndOptionalTilde"
                is-solo
                :is-filled="false"
                :has-prepend-icon="false"
                @NamePersonBinding="form.firstName = $event"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <last-name-person-input
                ref="LastNamePersonInputComponent"
                rules="requiredLastName|min:3|max:255|mustContainLettersAndOptionalTilde"
                is-solo
                :is-filled="false"
                :has-prepend-icon="false"
                @LastNamePersonBinding="form.lastName = $event"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <phone-field-input
                ref="PhoneInputComponent"
                rules="requiredPhone|numeric|ItMustBeAPhoneNumberFromSpain"
                is-solo
                :is-filled="false"
                :has-prepend-icon="false"
                @PhoneBinding="form.phone = $event"
              />
            </v-col>
            <v-col cols="12" lg="6">
              <email-field-input
                ref="EmailInputComponent"
                rules="requiredEmail|email"
                is-solo
                :is-filled="false"
                :has-prepend-icon="false"
                @EmailBinding="form.email = $event"
              />
            </v-col>
            <v-col class="mensaje_estilo">
              <ValidationProvider
                v-slot="{ errors }"
                tag="div"
                vid="vid"
                mode="aggressive"
                name="Mensaje"
                rules="required|max:400"
              >
                <v-textarea
                  ref="MessageTextarea"
                  v-model="form.message"
                  label="Mensaje"
                  placeholder="Escribe tu mensaje"
                  solo
                  :error-messages="errors"
                  name="input-7-4"
                ></v-textarea>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" class="d-flex justify-end">
              <v-btn
                id="boton_enviar_form"
                class="btn-3"
                :loading="loadingButtonSubmit"
                @click="prepareFormContactUsSubmit"
              >
                Enviar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </validation-observer>
    </form>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import NamePersonInput from '@/modules/profile/components/updateProfile/NameFieldInput.vue'
import LastNamePersonInput from '@/modules/profile/components/updateProfile/LastNameFieldInput.vue'
import PhoneFieldInput from '@/modules/profile/components/updateProfile/PhoneFieldInput.vue'
import EmailFieldInput from '@/modules/profile/components/updateProfile/EmailFieldInput.vue'

export default {
  name: 'Formulario',
  components: {
    NamePersonInput,
    LastNamePersonInput,
    PhoneFieldInput,
    EmailFieldInput
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
        reason: null
      },
      itemsMotivo: ['General', 'Recuperar Contraseña', 'Unete'],
      itemsReasonSelect: [
        { label: 'General', key: 'general' },
        /* { label: 'Recuperar Contraseña', key: 'reset-password' }, */
        { label: 'Únete', key: 'inscription' }
      ],
      disabledButtonSubmit: false,
      loadingButtonSubmit: false
    }
  },
  methods: {
    ...mapActions('homeService', ['sendInformationContactUSForm']),
    redirectToCallPhoneNumber() {
      window.open('tel:+34663261014', '_self')
    },
    redirectToSendMailAcademia() {
      window.open('mailto:hola@academia750.es', '_self')
    },
    ResetForm() {
      this.$refs.namePersonInputComponent.name_person = null
      this.$refs.LastNamePersonInputComponent.last_name = null
      this.$refs.PhoneInputComponent.phone = null
      this.$refs.EmailInputComponent.email = null

      this.form.firstName = null
      this.form.lastName = null
      this.form.phone = null
      this.form.email = null
      this.form.message = null
      this.form.reason = null

      this.$nextTick(() => {
        this.$refs['FormSubmitContactUs']['reset']()
      })

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormSubmitContactUs']['setErrors'](errorResponse)
      this.loadingButtonSubmit = false
      this.disabledButtonSubmit = false
      this.$loadingApp.disabledLoadingProgressLinear()
    },
    prepareFormContactUsSubmit() {
      this.loadingButtonSubmit = true
      this.disabledButtonSubmit = true
      grecaptcha.ready(() => {
        grecaptcha
          .execute('6Lc6PqckAAAAAEl7M5ZIhQPddhBimFxQgAr77t0w', {
            action: 'submit'
          })
          .then((token) => {
            /* console.log({
              token
            }) */

            this.validateFormOrSubmit(token)
          })
          .catch((error) => {
            this.$swal.fire({
              icon: 'error',
              title:
                'No podemos verificar autenticidad con Recaptcha. Por favor, recarga la página, y vuelve a intentarlo.',
              showConfirmButton: true,
              confirmButtonText: '¡Entendido!',
              timer: 10000
            })

            this.loadingButtonSubmit = false
            this.disabledButtonSubmit = false
          })
      })
    },
    async validateFormOrSubmit(tokenRecaptcha) {
      console.log('Se ejecuta validateFormOrSubmit')
      const responseValidation = await this.$refs[
        'FormSubmitContactUs'
      ].validate()

      if (!responseValidation) {
        console.log('Hay error de validación')
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, complete correctamente los campos del formulario.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      } else {
        console.log('No hay error de validación')
        this.$loadingApp.enableLoadingProgressLinear()

        this.submitActionContactUs(tokenRecaptcha)
      }
    },
    reloadWindowByRecaptcha () {
      location.reload()
    },
    async submitActionContactUs(tokenRecaptcha) {

      try {
        const response = await this.sendInformationContactUSForm({
          data: {
            reason: this.form.reason,
            'first-name': this.form.firstName,
            'last-name': this.form.lastName,
            phone: this.form.phone,
            email: this.form.email,
            message: this.form.message,
            'g-recaptcha-response': tokenRecaptcha
          }
        })

        const { message, status } = response.data.data

        if (status === 'successfully') {
          this.$swal.fire({
            icon: 'success',
            toast: true,
            title: message,
            timer: 10000
          })

          this.ResetForm()
        }

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonSubmit = false
        this.disabledButtonSubmit = false

        if (status === 'failed') {
          this.$swal.fire({
            icon: 'error',
            toast: true,
            title: message,
            timer: 10000
          })

          return
        }
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonSubmit = false
        this.disabledButtonSubmit = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title:
              'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 10000
          })

          this.ResetForm()
        } else if (error.response?.status === 422) {
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    }
  }
}
</script>
<style scoped>
.estilo_formulario {
  background: linear-gradient(180deg, #47a2bc 34.9%, #81b3c1 100%);
  padding: 100px 0px;
  color: #fff;
}
.estilo_formulario a {
  color: #fff !important;
  font-size: 16px;
  font-family: var(--fuente_uno) !important;
  text-decoration: none !important;
}
.estilo_formulario h2 {
  font-family: var(--fuente_cuatro);
  font-size: 48px;
  line-height: 48px;
}
.estilo_formulario input {
  background-color: #fff !important;
  padding-top: 0px !important;
  margin-top: 0px !important;
  height: 51px !important;
  max-height: 51px !important;
}
.estilo_formulario .col-12,
.mensaje_estilo {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
.estilo_formulario .v-input {
  padding-top: 0px !important;
  margin-top: 0px !important;
  border: none !important;
  caret-color: none !important;
}

.estilo_formulario input,
.estilo_formulario textarea,
.mensaje_estilo .v-input__slot {
  border-radius: 0px !important;
  padding-left: 10px;
}

.estilo_formulario input::placeholder,
.estilo_formulario textarea::placeholder,
.estilo_formulario label,
.estilo_formulario .v-select__slot,
.estilo_formulario .v-select__selection {
  font-size: 16px !important;
  font-family: var(--fuente_uno) !important;
  color: #b5b5b5 !important;
}
.estilo_formulario
  .theme--light.v-text-field
  > .v-input__control
  > .v-input__slot:before {
  display: none;
}
.btn-3,
#boton_enviar_form.btn-3 {
  width: 150px;
  background-color: #bf1215;
  background: linear-gradient(101.58deg, #bf1215 42.62%, #df5457 118.43%);
  border: none !important;
  border-radius: 20px;
  font-family: var(--fuente_cuatro);
  font-size: 18px !important;
  height: 53px !important;
  display: flex;
  margin-left: auto;
  color: #fff !important;
}
.estilo_formulario .v-select__slot {
  background: #fff;
  padding-left: 10px;
}
@media (max-width: 991px) {
  .estilo_formulario h2 {
    text-align: center;
  }
  .btn-3 {
    margin: 0 auto;
  }
}
</style>
