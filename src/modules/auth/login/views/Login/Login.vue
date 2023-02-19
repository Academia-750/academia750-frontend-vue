<template>
  <div>
    <v-card class="text-center pa-1 bg-transparent-academia">
      <div class="d-flex justify-center">
        <span style="cursor: pointer" @click="redirectToHomePageAfterLogout">
          <v-img
            class="align-self-center"
            :src="require('../../assets/logo.png')"
            max-height="68"
            max-width="68"
          ></v-img>
        </span>
        <span
          class="font-weight-bold text-xs-caption text-sm-h5 align-self-center"
          style="cursor: pointer"
          @click="redirectToHomePageAfterLogout"
        >
          {{ product.name }}
        </span>
      </div>
      <v-card-title class="justify-center mb-2 text-xs-caption text-sm-h6">
        Bienvenido
      </v-card-title>
      <v-card-subtitle>Inicia sesión con tu cuenta</v-card-subtitle>

      <!-- sign in form -->
      <v-card-text>
        <validation-observer ref="FormLoginObserver" v-slot="{ handleSubmit }">
          <v-form ref="FormHTMLLogin" @submit.prevent="handleSubmit(onSubmit)">
            <form-access-key-field
              ref="access-key-field"
              rules="required|max:10|ItMustBeADniOrNieFromSpainLogin"
              :is-disabled="isLoading"
              @AccessKeyBinding="access_key = $event"
              @submitForm="submit"
            />
            <form-password-field
              ref="password-field"
              rules="required|max:150"
              :is-disabled="isLoading"
              @passwordBinding="password = $event"
              @submitForm="submit"
            />
            <div class="d-flex justify-center">
              <form-button-submit-login
                :is-disabled="isDisabled"
                :is-loading="isLoading"
                button-text="Acceder"
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
            <button-request-reset-password />
            <hr class="mt-2" />
            <FooterDialogLogin ref="FooterDialogLogin" />
            <v-btn to="/" class="my-2 d-flex d-md-none">
              <v-icon class="mr-1">mdi-arrow-collapse-left</v-icon>
              Regresar
            </v-btn>
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>

    <!-- <button-request-new-account /> -->
  </div>
</template>
<script src="./LoginComponent.js"></script>

<style scoped>
.bg-transparent-academia {
  background-color: rgba(255, 255, 255, 0.9) !important;
}
</style>
