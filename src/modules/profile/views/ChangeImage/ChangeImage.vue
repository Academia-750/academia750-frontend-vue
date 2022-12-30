<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="d-flex align-items-center">
        <v-icon large class="mx-1">mdi-account-circle</v-icon>
        <span class="font-weight-bold d-none d-sm-inline text-xs-caption text-sm-h6">Cambiar mi imagen de perfil</span>
      </v-toolbar-title>

      <!-- <v-spacer></v-spacer>

      <v-btn
        color="teal darken-2"
        class="white--text"
        title="Cargar nuevamente mis datos"
        @click="reloadImageByPath"
      >
        <v-icon
          right
          dark
          class="mx-1"
        >
          mdi-reload
        </v-icon>
        <span class="d-none d-sm-inline">Cargar</span>
      </v-btn> -->
    </v-toolbar>
    <validation-observer ref="FormChangeImageAccount" v-slot="{ invalid }">
      <section class="px-2 py-2 d-flex align-center">
        <v-row dense >
          <v-col
            v-if="urlImage"
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <v-row dense>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
                class="d-flex justify-center"
              >
                <p class="font-weight-bold title">Imagen Actual</p>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
                class="d-flex justify-center"
              >
                <v-img
                  max-width="250"
                  :aspect-radio="16/9"
                  :src="urlImage"
                ></v-img>
              </v-col>
            </v-row>
          </v-col>

          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <!-- <v-divider class="mb-5"></v-divider> -->
            <ValidationProvider
              v-slot="{ errors }"
              tag="div"
              vid="image"
              mode="aggressive"
              name="Imagen de perfil"
              rules="required|image|mimes:image/*"
            >
              <v-file-input
                v-model="image"
                :error-messages="errors"
                show-size
                label="Selecciona una imagen"
                accept="image/*"
                @change="Preview_image"
              ></v-file-input>
            </ValidationProvider>
            <v-container v-if="image" class="d-flex justify-center" fluid>
              <v-img
                max-width="300"
                :aspect-ratio="16/9"
                :src="urlImagePreview"
              ></v-img>
            </v-container>
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-center"
          >
            <v-btn
              :loading="loadingButtonChangeImageAccount"
              :disabled="disabledButtonChangeImageAccount || invalid"
              color="light-blue darken-3"
              class="mt-3 white--text"
              :block="activeStyleBlockButton"
              @click="updateImageAccountApi"
            >
              <v-icon
                right
                dark
                class="mr-1"
              >
                mdi-reload
              </v-icon>
              Actualizar
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </validation-observer>
  </div>
</template>
<script src="./ChangeImageComponent.js"></script>
