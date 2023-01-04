<template>
  <v-dialog
    v-model="showDialogLogin"
    persistent
    eager
    elevation="15"
    transition="dialog-top-transition"
    max-width="450"
    close-delay
  >
    <v-card
      class="mx-auto"
      max-width="400"
      elevation="5"
    >
      <v-toolbar
        color="blue-grey lighten-5"
        class="mb-3"
        elevation="1"
      >
        <span class="text-h6 ml-1" style="cursor: pointer" @click="closeDialogLogin">Acceso</span>
        <v-spacer></v-spacer>
        <v-btn
          icon
          elevation="1"
          small
          class="d-flex justify-center align-center mr-1"
          @click="closeDialogLogin"
        >
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <validation-observer
          ref="FormLoginObserver"
        >
          <FormAccessKeyField
            ref="access-key-field"
            rules="required|max:10|ItMustBeADniOrNieFromSpainLogin"
            :is-disabled="isLoading"
            @AccessKeyBinding="access_key = $event"
            @submitForm="submit"
          />
          <FormPasswordField
            ref="password-field"
            rules="required|max:150"
            :is-disabled="isLoading"
            @passwordBinding="password = $event"
            @submitForm="submit"
          />
          <ButtonActionLogin
            :is-disabled="isDisabled"
            :is-loading="isLoading"
            @emitActionLogin="submit"
          />
          <AlertErrorLogin ref="AlertErrorLogin" />
          <ButtonForgotPasswordLogin @scrollToResetPasswordSection="$emit('scrollToResetPasswordSection')" />
          <v-divider class="my-1 blue-grey lighten-4" />
          <FooterDialogLogin ref="FooterDialogLogin" />
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import FormAccessKeyField from '@/modules/auth/login/components/form/FormAccessKeyField'
import FormPasswordField from '@/modules/auth/login/components/form/FormPasswordField.vue'
import ButtonForgotPasswordLogin from './ButtonForgotPasswordLogin'
import ButtonActionLogin from './ButtonActionLogin'
import AlertErrorLogin from './AlertErrorLogin'
import FooterDialogLogin from './FooterDialogLogin'

import loginActionsMixins from '@/modules/auth/login/resources/loginActionsMixin'
import MethodsMixinLogin from '@/modules/auth/login/views/Login/component/methods.js'

export default {
  name: 'DialogLogin',
  components: {
    FormAccessKeyField,
    FormPasswordField,
    ButtonForgotPasswordLogin,
    ButtonActionLogin,
    AlertErrorLogin,
    FooterDialogLogin
  },
  mixins: [MethodsMixinLogin, loginActionsMixins],
  data () {
    return {
      showDialogLogin: false,
      isLoading: false,
      isDisabled: false,
      access_key: null,
      password: null
    }
  },
  methods: {
    closeDialogLogin () {
      this.$refs['FormLoginObserver']['reset']()
      this.$refs['access-key-field'].access_key = null
      this.access_key = null

      this.$refs['password-field'].password = null
      this.$refs['password-field'].showPassword = false
      this.password = null

      this.isLoading = false
      this.isDisabled = false

      this.showDialogLogin = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
