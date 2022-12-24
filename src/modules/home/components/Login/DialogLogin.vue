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
    >
      <v-toolbar
        color="blue-grey lighten-5"
        elevation="5"
        class="mb-3"
      >
        <span class="text-h6 ml-1" style="cursor: pointer" @click="showDialogLogin = false">Acceso</span>
        <v-spacer></v-spacer>
        <v-btn
          icon
          elevation="18"
          small
          class="d-flex justify-center align-center mr-1"
          @click="showDialogLogin = false"
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
            :is-disabled="isLoading"
            @AccessKeyBinding="access_key = $event"
            @submitForm="submit"
          />
          <FormPasswordField
            ref="password-field"
            :is-disabled="isLoading"
            @passwordBinding="password = $event"
            @submitForm="submit"
          />
          <ButtonActionLogin />
          <AlertErrorLogin ref="AlertErrorLogin" />
          <ButtonForgotPasswordLogin />
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
  data () {
    return {
      showDialogLogin: false,
      isLoading: false,
      access_key: null,
      password: null
    }
  },
  methods: {
    submit () {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
