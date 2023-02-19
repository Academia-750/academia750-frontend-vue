<template>
  <div>
    <v-card class="text-center pa-1 bg-transparent-academia">
      <div class="d-flex justify-center">
        <span
          style="cursor: pointer;"
          @click="redirectToHomePageAfterLogout"
        >
          <v-img
            class="align-self-center"
            :src="require('../../assets/logo.png')"
            max-height="68"
            max-width="68"
          ></v-img>
        </span>
        <span
          class="font-weight-bold text-xs-caption text-sm-h5 align-self-center"
          style="cursor: pointer;"
          @click="redirectToHomePageAfterLogout"
        >{{ product.name }}</span>
      </div>
      <v-card-title class="justify-center mb-2 text-xs-caption text-sm-h6">
        Olvidé mi contraseña
      </v-card-title>
      <v-card-subtitle>Ingrese la dirección de correo electrónico de su cuenta y le enviaremos su nueva contraseña. </v-card-subtitle>

      <!-- sign in form -->
      <v-card-text>
        <validation-observer
          ref="FormRequestResetPasswordObserver"
        >
          <v-form ref="FormHTMLLogin" @submit.prevent="submit">
            <form-access-key-field
              ref="email-field"
              rules="required|email|max:255"
              vid-validation-provider="email"
              id-element="EmailForRequestResetPassword"
              ref-element="emailChangePassword"
              name-validation-provider="Correo electrónico"
              label-input="Correo electrónico"
              :is-disabled="isLoading"
              @AccessKeyBinding="access_key = $event"
              @submitForm="submit"
            />
            <div class="d-flex justify-center">
              <form-button-submit-login
                :is-disabled="isDisabled"
                :is-loading="isLoading"
                button-text="Enviar"
                @submitForm="submit"
              />
            </div>
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
            <div class="mt-4">
              <router-link :to="{ name: 'login' }" class="font-weight-bold caption">
                Ya tengo una cuenta.
              </router-link>
            </div>
            <hr class="mt-2">
            <FooterDialogLogin ref="FooterDialogLogin" />
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>

    <!-- <button-request-new-account /> -->
  </div>
</template>
<script src="./RequestResetPasswordComponent.js"></script>

<style scoped>
  .bg-transparent-academia {
    background-color: rgba(255, 255, 255, 0.9) !important;
  }
</style>
