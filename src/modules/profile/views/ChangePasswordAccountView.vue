<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="d-flex align-items-center">
        <v-icon class="mx-1">mdi-lock</v-icon>
        <span class="font-weight-bold d-none d-sm-inline text-xs-caption text-sm-h6">Cambiar contraseña</span>
      </v-toolbar-title>
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
            <password-field
              rules="ItMustBeAPasswordSecure|confirmPassword:@new_password_confirmation"
              vid="password"
              name-provider="Nueva contraseña"
              label="Nueva Contraseña"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <!-- Confirmar contraseña -->
            <password-field
              rules="required"
              vid="new_password_confirmation"
              name-provider="Contraseña confirmada"
              label="Confirmar contraseña"
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
import { mapState, mapGetters, mapActions } from 'vuex'

import CurrentPasswordFieldInput from '../components/changePassword/CurrentPasswordField.vue'
import PasswordField from '../components/changePassword/NewPasswordField.vue'

export default {
  components: {
    CurrentPasswordFieldInput,
    PasswordField
  },
  data () {
    return {
      loadingButtonChangePassword: false,
      disabledButtonChangePassword: false
    }
  },
  methods: {
    changePassword () {

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
