<template>
  <div>
    <v-card class="text-center pa-1">
      <div class="d-flex justify-center">
        <span
          style="cursor: pointer;"
          @click="redirectToPageHomeProduction"
        >
          <v-img
            class="align-self-center"
            :src="require('../assets/logo.png')"
            max-height="68"
            max-width="68"
          ></v-img>
        </span>
        <span
          class="font-weight-bold text-xs-caption text-sm-h5 align-self-center"
          style="cursor: pointer;"
          @click="redirectToPageHomeProduction"
        >{{ product.name }}</span>
      </div>
      <v-card-title class="justify-center mb-2 text-xs-caption text-sm-h6">
        Bienvenido
      </v-card-title>
      <v-card-subtitle>Inicia sesión con tu cuenta</v-card-subtitle>

      <!-- sign in form -->
      <v-card-text>
        <validation-observer
          ref="FormLoginObserver"
          v-slot="{ handleSubmit, invalid }"
        >
          <v-form ref="FormHTMLLogin" @submit.prevent="handleSubmit(onSubmit)">
            <form-access-key-field
              ref="access-key-field"
              :is-disabled="isLoading"
              @AccessKeyBinding="access_key = $event"
              @submitForm="submit"
            />
            <form-password-field
              ref="password-field"
              :is-disabled="isLoading"
              @passwordBinding="password = $event"
              @submitForm="submit"
            />
            <form-button-submit-login
              :is-loading="isLoading"
              :to-enable="invalid"
              @submitForm="submit"
            />
            <div v-if="hasErrorServiceApp" class="my-5">
              <v-alert
                v-model="hasErrorServiceApp"
                class="d-flex justify-center"
                dense
                border="left"
                color="pink darken-1"
                dark
                icon="mdi-danger"
                transition="scale-transition"
                dismissible
              >
                <span class="font-weight-bold caption">{{
                  messageErrorServiceApp
                }}</span>
              </v-alert>
            </div>
            <!-- <button-request-reset-password /> -->
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>

    <!-- <button-request-new-account /> -->
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

import FormAccessKeyField from '@/modules/auth/login/components/form/FormAccessKeyField.vue'
import FormPasswordField from '@/modules/auth/login/components/form/FormPasswordField.vue'
import FormButtonSubmitLogin from '@/modules/auth/login/components/form/FormButtonSubmitLogin.vue'
import loginActionsMixins from '../resources/loginActionsMixin'

export default {

  components: {
    FormAccessKeyField,
    FormPasswordField,
    FormButtonSubmitLogin
    /* ButtonRequestNewAccount: () => import('@/modules/auth/login/components/ButtonRequestNewAccount.vue') */
    /* ButtonRequestResetPassword: () => import('@/components/ButtonRequestResetPassword.vue'), */
  },
  mixins: [loginActionsMixins],
  data() {
    return {
      titleApp: 'Iniciar sesión',
      access_key: '',
      password: '',
      isLoading: false,
      hasErrorServiceApp: false,
      messageErrorServiceApp: ''
    }
  },
  computed: {
    ...mapState('app', ['product'])
  },
  methods: {
    ...mapMutations('errorsService', ['set_response_error']),
    ...mapActions('loginService', ['login', 'checkPreviousSessionAction']),
    ...mapActions('profileService', ['getDataMyProfileAction']),
    redirectToPageHomeProduction () {
      location.href = process.env.VUE_APP_BASE_URL_PAGE_HOME_PRODUCTION
    },
    async submit() {
      const validateFormStatus = await this.$refs['FormLoginObserver'][
        'validate'
      ]()

      if (!validateFormStatus) {
        this.notificationFormValidationError()

        return
      }

      this.checkPreviousSession()
    },
    notificationFormValidationError() {
      this.$swal.fire({
        icon: 'error',
        title: 'Por favor, complete correctamente los campos del formulario.',
        showConfirmButton: true,
        confirmButtonText: '¡Entendido!',
        timer: 7500
      })
    },
    async ResetForm() {
      await this.$refs['FormLoginObserver']['reset']()

      return true
    },

    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormLoginObserver']['setErrors'](errorResponse)
    },
    actionErrorServiceApp(errorResponse) {
      this.hasErrorServiceApp = false
      this.messageErrorServiceApp = ''
      this.$refs['access-key-field']['resetAccessKey']()
      this.$refs['password-field']['resetPassword']()
      this.ResetForm()
      if (errorResponse.status === 429) {
        this.hasErrorServiceApp = true
        this.messageErrorServiceApp =
          '¡Opps! Has excecido el número de intentos. Intenta nuevamente después de 1 minuto'
        //this.$refs['access-key-field']['resetAccessKey']()
        this.ResetForm()
        this.$refs['password-field']['onBlurPasswordField']()
      } else {
        this.hasErrorServiceApp = true
        this.messageErrorServiceApp =
          '¡Opps! Su solicitud no puede ser procesada por ahora. Intente de nuevo, más tarde o reporte el problema.'
      }
    }
  },
  head: {
    title: {
      inner: 'Iniciar sesion'
    }
  }
}
</script>
