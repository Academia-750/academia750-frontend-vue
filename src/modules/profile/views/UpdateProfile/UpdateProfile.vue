<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="d-flex align-items-center">
        <v-icon large class="mx-1">mdi-account-circle</v-icon>
        <span class="font-weight-bold d-none d-sm-inline text-xs-caption text-sm-h6">Perfil de usuario</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        color="red darken-1"
        class="white--text"
        title="cancelar"
        @click="loadDataUserProfile"
      >
        <v-icon
          right
          dark
          class="mx-1"
        >
          mdi-close-circle
        </v-icon>
        <span class="d-none d-sm-inline">Cancelar</span>
      </v-btn>
    </v-toolbar>
    <validation-observer ref="FormUpdateMyProfile" v-slot="{ invalid }">
      <section class="px-2 py-2 d-flex align-center">
        <v-row dense >
          <v-col
            cols="12"
            sm="12"
            md="6"
            lg="2"
          >
            <!-- DNI -->
            <dni-field-input
              ref="DNIPersonInputComponent"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
            lg="5"
          >
            <!-- Nombre -->
            <name-person-input
              ref="namePersonInputComponent"
              rules="required|min:3|max:25|mustContainLettersAndOptionalTilde"
              @NamePersonBinding="form.firstName = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
            lg="5"
          >
            <!-- Apellidos -->
            <last-name-person-input
              ref="LastNamePersonInputComponent"
              rules="required|min:3|max:25|mustContainLettersAndOptionalTilde"
              @LastNamePersonBinding="form.lastName = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
            lg="4"
          >
            <!-- telefono -->
            <phone-field-input
              ref="PhoneInputComponent"
              rules="required|numeric|ItMustBeAPhoneNumberFromSpain"
              @PhoneBinding="form.phone = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="8"
          >
            <!-- Email -->
            <email-field-input
              ref="EmailInputComponent"
              rules="required|email"
              @EmailBinding="form.email = $event"
            />
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-center flex-column flex-sm-row"
          >
            <v-btn
              :loading="loadingButtonUpdateProfile"
              :disabled="disabledButtonUpdateProfile || invalid || !checkIfThereIsAtLeast_1ModifiedData"
              color="light-blue darken-3"
              class="mt-3 white--text"
              :block="activeStyleBlockButton"
              @click="updateProfile"
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
            <v-spacer></v-spacer>
            <v-btn
              :loading="loadingButtonUnsubscribeSystem"
              :disabled="disabledButtonUnsubscribeSystem || !canUnsubscribeSystem"
              color="red darken-1"
              class="mt-3 white--text"
              :block="activeStyleBlockButton"
              @click="unsubscribeSystem"
            >
              <v-icon
                right
                dark
                class="mr-1"
              >
                mdi-close-circle
              </v-icon>
              Darme de baja
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </validation-observer>
  </div>
</template>
<script src="./UpdateProfileComponent.js"></script>
