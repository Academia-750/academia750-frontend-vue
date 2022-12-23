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
            :src="require('../../assets/logo.png')"
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
          v-slot="{ handleSubmit }"
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
<script src="./LoginComponent.js"></script>
