<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="d-flex align-items-center">
        <v-icon class="mx-1">mdi-lock</v-icon>
        <span class="font-weight-bold d-none d-sm-inline text-xs-caption text-sm-h6">Cambiar contraseña</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <button-tooltip-secure-password class="d-inline d-sm-inline d-md-none"/>
      <button-generate-secure-password
        class="d-inline d-sm-inline d-md-none"
        @PasswordGeneratedBinding="notifySecurePasswordGeneratedEvent"
      />
    </v-toolbar>
    <validation-observer ref="FormUpdatePassword" v-slot="{ invalid }">
      <section class="px-2 py-2 d-flex align-center">
        <v-row dense>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <!-- Contrseña actual -->
            <current-password-field-input
              ref="CurrentPasswordField"
              rules="required"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <!-- Nueva contraseña -->
            <new-password-field
              ref="PasswordField"
              rules="required|ItMustBeAPasswordSecure|confirmPassword:@password_confirmation"
              vid="password"
              name-provider="Nueva contraseña"
              label="Nueva Contraseña"
              :can-generate-password="true"
              :password-generated="passwordGenerate"
              @PasswordGeneratedBinding="passwordGenerate = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <!-- Confirmar contraseña -->
            <confirm-password-field
              ref="PasswordConfirmationField"
              rules="required|confirmPassword:@password"
              vid="password_confirmation"
              name-provider="Contraseña confirmada"
              label="Confirmar contraseña"
              :password-generated="passwordGenerate"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            class="d-flex justify-center justify-sm-center justify-md-end"
          >
            <v-btn
              :loading="loadingButtonChangePassword"
              :disabled="disabledButtonChangePassword || invalid"
              color="light-blue darken-3"
              class="mt-3 white--text"
              @click="changePassword"
            >
              <v-icon
                right
                dark
                class="mr-1"
              >
                mdi-content-save-settings
              </v-icon>
              Guardar
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import CurrentPasswordFieldInput from '../components/changePassword/CurrentPasswordField.vue'
import NewPasswordField from '../components/changePassword/NewPasswordField.vue'
import ConfirmPasswordField from '../components/changePassword/ConfirmPasswordField.vue'
import ButtonGenerateSecurePassword from '../components/changePassword/buttonGenerateSecurePassword.vue'
import ButtonTooltipSecurePassword from '../components/changePassword/buttonTooltipSecurePassword.vue'

export default {
  components: {
    CurrentPasswordFieldInput,
    NewPasswordField,
    ConfirmPasswordField,
    ButtonTooltipSecurePassword,
    ButtonGenerateSecurePassword
  },
  data () {
    return {
      loadingButtonChangePassword: false,
      disabledButtonChangePassword: false,
      passwordGenerate: ''
    }
  },
  computed: {
  },
  methods: {
    ...mapActions('profileService', ['ChangeMyPasswordAccountAction']),
    changePassword () {
      this.$refs['FormUpdatePassword'].validate().then( (status) => {
        if (!status) {
          this.$swal.fire({
            icon: 'error',
            toast: true,
            title: 'Por favor, complete correctamente los campos del formulario.',
            showConfirmButton: true,
            confirmButtonText: 'Entendido',
            timer: 7500
          })

          return
        }
      } )
      this.$loadingApp.enableLoadingProgressLinear()
      this.loadingButtonChangePassword = true
      this.disabledButtonChangePassword = true
      this.changePasswordApi()
    },
    async changePasswordApi () {
      try {
        await this.ChangeMyPasswordAccountAction({
          data: {
            'current-password': this.$refs['CurrentPasswordField'].currentPassword,
            'password': this.$refs['PasswordField'].password,
            'password_confirmation': this.$refs['PasswordConfirmationField'].password
          },
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'Tu contraseña ha sido actualizada con éxito.',
          timer: 3000
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonChangePassword = false
        this.disabledButtonChangePassword = false

        this.$refs['CurrentPasswordField'].resetField()
        this.$refs['PasswordField'].resetField()
        this.$refs['PasswordConfirmationField'].resetField()
        this.ResetForm()
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonChangePassword = false
        this.disabledButtonChangePassword = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.ResetForm()
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormUpdatePassword']['setErrors'](errorResponse)
    },
    async ResetForm() {
      await this.$refs['FormUpdatePassword']['reset']()

      return true
    },
    notifySecurePasswordGeneratedEvent (PASSWORD_GENERATED) {
      this.passwordGenerate = PASSWORD_GENERATED
    }
  },
  head: {
    title: {
      inner: 'Cambiar contraseña'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
