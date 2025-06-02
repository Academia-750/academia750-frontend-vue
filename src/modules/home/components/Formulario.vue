<template>
  <div class="estilo_formulario">
    <v-container>
      <!-- Header Section -->
      <v-row justify="center" class="header-section">
        <v-col cols="12" md="8" class="text-center">
          <div class="header-content">
            <v-icon size="60" color="white" class="mb-4">mdi-email-heart-outline</v-icon>
            <h1 class="main-title">Contacta con nosotros</h1>
            <p class="subtitle">Estaremos encantados de resolverte cualquier duda</p>
            
            <!-- Contact Info -->
            <v-row justify="center" class="contact-info-row">
              <v-col cols="12" sm="6" md="5">
                <div class="contact-card" @click="redirectToCallPhoneNumber">
                  <v-icon color="white" class="contact-icon">mdi-phone</v-icon>
                  <span class="contact-text">+34 633 261 014</span>
                </div>
              </v-col>
              <v-col cols="12" sm="6" md="5">
                <div class="contact-card" @click="redirectToSendMailAcademia">
                  <v-icon color="white" class="contact-icon">mdi-email</v-icon>
                  <span class="contact-text">hola@academia750.es</span>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <!-- Form Section -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <div class="form-container">
            <form id="contact-form-home" name="contact-form__home" autocomplete="off">
              <validation-observer ref="FormSubmitContactUs">
                
                <!-- reCAPTCHA Error -->
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
                    class="mb-6"
                  >
                    <v-row align="center">
                      <v-col class="grow">
                        {{ errors[0] }}
                      </v-col>
                      <v-col class="shrink">
                        <v-btn 
                          color="error" 
                          outlined
                          @click="reloadWindowByRecaptcha"
                        >
                          Recargar página
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-alert>
                </ValidationProvider>

                <!-- Form Fields -->
                <div class="form-content">
                  
                  <!-- Reason Selection -->
                  <div class="form-section">
                    <h3 class="section-title">¿En qué podemos ayudarte?</h3>
                    <ValidationProvider
                      v-slot="{ errors }"
                      vid="reason"
                      mode="aggressive"
                      name="Motivo"
                      rules="required"
                    >
                      <v-select
                        v-model="form.reason"
                        :items="itemsReasonSelect"
                        :error-messages="errors"
                        label="Selecciona el motivo de tu consulta"
                        item-text="label"
                        item-value="key"
                        solo
                        class="custom-select"
                        prepend-inner-icon="mdi-help-circle-outline"
                      ></v-select>
                    </ValidationProvider>
                  </div>

                  <!-- Personal Information -->
                  <div class="form-section">
                    <h3 class="section-title">Información Personal</h3>
                    <v-row>
                      <v-col cols="12" md="6">
                        <name-person-input
                          ref="namePersonInputComponent"
                          rules="requiredFirstName|min:3|max:255|mustContainLettersAndOptionalTilde"
                          is-solo
                          :is-filled="false"
                          :has-prepend-icon="false"
                          class="custom-input"
                          @NamePersonBinding="form.firstName = $event"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <last-name-person-input
                          ref="LastNamePersonInputComponent"
                          rules="requiredLastName|min:3|max:255|mustContainLettersAndOptionalTilde"
                          is-solo
                          :is-filled="false"
                          :has-prepend-icon="false"
                          class="custom-input"
                          @LastNamePersonBinding="form.lastName = $event"
                        />
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Contact Information -->
                  <div class="form-section">
                    <h3 class="section-title">Información de Contacto</h3>
                    <v-row>
                      <v-col cols="12" md="6">
                        <phone-field-input
                          ref="PhoneInputComponent"
                          rules="requiredPhone|numeric|ItMustBeAPhoneNumberFromSpain"
                          is-solo
                          :is-filled="false"
                          :has-prepend-icon="false"
                          class="custom-input"
                          @PhoneBinding="form.phone = $event"
                        />
                      </v-col>
                      <v-col cols="12" md="6">
                        <email-field-input
                          ref="EmailInputComponent"
                          rules="requiredEmail|email"
                          is-solo
                          :is-filled="false"
                          :has-prepend-icon="false"
                          class="custom-input"
                          @EmailBinding="form.email = $event"
                        />
                      </v-col>
                    </v-row>
                  </div>

                  <!-- Message -->
                  <div class="form-section">
                    <h3 class="section-title">Tu Mensaje</h3>
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
                        label="Cuéntanos más detalles sobre tu consulta"
                        placeholder="Escribe tu mensaje aquí..."
                        solo
                        rows="5"
                        :error-messages="errors"
                        name="input-7-4"
                        class="custom-textarea"
                        counter="400"
                      ></v-textarea>
                    </ValidationProvider>
                  </div>

                  <!-- Submit Button -->
                  <div class="form-section text-center">
                    <v-btn
                      id="boton_enviar_form"
                      class="submit-button"
                      x-large
                      :loading="loadingButtonSubmit"
                      :disabled="disabledButtonSubmit"
                      @click="prepareFormContactUsSubmit"
                    >
                      <v-icon left>mdi-send-outline</v-icon>
                      Enviar Mensaje
                    </v-btn>
                  </div>

                </div>
              </validation-observer>
            </form>
          </div>
        </v-col>
      </v-row>
    </v-container>
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
        reason: null,
        apiPublicKeyRecaptcha: null
      },
      itemsMotivo: ['General', 'Recuperar Contraseña', 'Unete'],
      itemsReasonSelect: [
        { label: '💬 Consulta General', key: 'general' },
        { label: '🎓 Quiero Unirme a la Academia', key: 'inscription' },
        { label: '📞 Solicitar Información', key: 'info' },
        { label: '🔧 Soporte Técnico', key: 'support' }
      ],
      disabledButtonSubmit: false,
      loadingButtonSubmit: false
    }
  },
  mounted () {
    this.apiPublicKeyRecaptcha = process.env.VUE_APP_API_PUBLIC_KEY_RECAPTCHA
  },
  methods: {
    ...mapActions('homeService', ['sendInformationContactUSForm']),
    redirectToCallPhoneNumber() {
      window.open('tel:+34633261014', '_self')
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
          .execute(this.apiPublicKeyRecaptcha, {
            action: 'submit'
          })
          .then((token) => {
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
      const responseValidation = await this.$refs[
        'FormSubmitContactUs'
      ].validate()

      if (!responseValidation) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, complete correctamente los campos del formulario.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        this.loadingButtonSubmit = false
        this.disabledButtonSubmit = false

        return
      } else {
        this.$loadingApp.enableLoadingProgressLinear()
        this.loadingButtonSubmit = false
        this.disabledButtonSubmit = false

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
          this.loadingButtonSubmit = false
          this.disabledButtonSubmit = false
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
  padding: 80px 0;
  color: #fff;
  min-height: 100vh;
}

/* Header Section */
.header-section {
  margin-bottom: 60px;
}

.header-content {
  padding: 0 20px;
}

.main-title {
  font-family: var(--fuente_cuatro);
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  font-size: 1.3rem;
  margin-bottom: 40px;
  opacity: 0.95;
  line-height: 1.5;
}

/* Contact Info */
.contact-info-row {
  margin-top: 30px;
}

.contact-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 15px;
}

.contact-card:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.contact-icon {
  margin-right: 12px;
  font-size: 24px;
}

.contact-text {
  font-size: 1.1rem;
  font-weight: 600;
}

/* Form Container */
.form-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.form-content {
  color: #333;
}

/* Form Sections */
.form-section {
  margin-bottom: 40px;
}

.section-title {
  color: #47a2bc;
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e0e0e0;
  font-family: var(--fuente_cuatro);
}

/* Form Fields */
.custom-select >>> .v-input__control,
.custom-input >>> .v-input__control,
.custom-textarea >>> .v-input__control {
  border-radius: 12px !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-select >>> .v-input__slot,
.custom-input >>> .v-input__slot,
.custom-textarea >>> .v-input__slot {
  background: #ffffff !important;
  border-radius: 12px !important;
  padding-left: 20px !important;
  min-height: 56px;
}

.custom-select >>> .v-select__slot {
  padding-left: 20px !important;
}

.custom-textarea >>> .v-input__slot {
  padding: 20px !important;
}

/* Input styling */
.estilo_formulario input,
.estilo_formulario textarea {
  background-color: #fff !important;
  border-radius: 12px !important;
  padding-left: 20px !important;
  font-size: 16px !important;
  color: #333 !important;
}

.estilo_formulario input::placeholder,
.estilo_formulario textarea::placeholder,
.estilo_formulario label {
  color: #666 !important;
  font-size: 16px !important;
}

/* Submit Button */
.submit-button {
  background: linear-gradient(101.58deg, #bf1215 42.62%, #df5457 118.43%) !important;
  color: white !important;
  border-radius: 50px !important;
  padding: 0 40px !important;
  height: 60px !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  text-transform: none !important;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(191, 18, 21, 0.3) !important;
  border: none !important;
}

.submit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(191, 18, 21, 0.4) !important;
}

.submit-button:disabled {
  opacity: 0.7;
  transform: none;
}

/* Remove Vuetify defaults */
.estilo_formulario .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
  display: none;
}

.v-input {
  padding-top: 0 !important;
  margin-top: 0 !important;
}

/* Responsive Design */
@media (max-width: 960px) {
  .form-container {
    padding: 30px;
    margin: 0 20px;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.1rem;
  }
}

@media (max-width: 600px) {
  .estilo_formulario {
    padding: 40px 0;
  }
  
  .form-container {
    padding: 25px 20px;
    border-radius: 15px;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.2rem;
  }
  
  .form-section {
    margin-bottom: 30px;
  }
  
  .contact-card {
    padding: 15px;
  }
  
  .submit-button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
