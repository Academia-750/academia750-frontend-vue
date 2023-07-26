<template>
  <div>
    <v-toolbar>
      <div class="d-flex align-center">
        <v-icon large class="mx-1">mdi-account-circle</v-icon>
        <span class="font-weight-bold text-xs-caption text-sm-h6">{{
          getTitleByUserDataForUpdateOrCreate
        }}</span>
      </div>
      <v-spacer></v-spacer>

      <!-- <v-btn
        v-if="cancelProcessFormGroup"
        color="red darken-1"
        class="white--text"
        title="cancelar"
        @click="cancelProcessEditGroupData"
      >
        <v-icon
          right
          dark
          class="mx-1"
        >
          mdi-close-circle
        </v-icon>
        <span class="d-none d-sm-inline">{{ textButtonCancelDataEditGroup }}</span>
      </v-btn> -->
    </v-toolbar>
    <validation-observer ref="FormCreateOrEditGroup" v-slot="{ invalid }">
      <section class="px-2 py-2 d-flex align-center">
        <v-row dense>
          <v-col cols="12" sm="12" md="6" lg="4">
            <!-- DNI -->
            <dni-field-input
              ref="DNIPersonInputComponent"
              rules="requiredDniNie|ItMustBeADniOrNieFromSpain"
              :is-disabled="isUpdateUser"
              @DniBinding="form.dni = $event"
            />
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4">
            <!-- Nombre -->
            <name-field-input
              ref="namePersonInputComponent"
              rules="requiredFirstName|min:3|max:25|mustContainLettersAndOptionalTilde"
              @NamePersonBinding="form.firstName = $event"
            />
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4">
            <!-- Apellidos -->
            <last-name-field-input
              ref="LastNamePersonInputComponent"
              rules="requiredLastName|min:3|max:25|mustContainLettersAndOptionalTilde"
              @LastNamePersonBinding="form.lastName = $event"
            />
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4">
            <!-- telefono -->
            <phone-field-input
              ref="PhoneInputComponent"
              rules="requiredPhone|numeric|ItMustBeAPhoneNumberFromSpain"
              @PhoneBinding="form.phone = $event"
            />
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="8">
            <!-- Email -->
            <email-field-input
              ref="EmailInputComponent"
              rules="requiredEmail|email"
              @EmailBinding="form.email = $event"
            />
          </v-col>
          <v-col cols="12" class="d-flex flex-column flex-sm-row">
            <v-btn
              v-if="currentUserForUpdate === null"
              :loading="loadingButtonCreateOrUpdateGroup"
              :disabled="disabledButtonCreateOrUpdateGroup || invalid"
              color="light-blue darken-3"
              class="mt-2 ml-2 white--text"
              :block="activeStyleBlockButton"
              @click="CreateOrUpdateGroup"
            >
              <v-icon right dark class="mr-1">
                mdi-account-multiple-plus
              </v-icon>
              Crear
            </v-btn>
            <v-btn
              v-if="currentUserForUpdate !== null && isUpdateGroup"
              :loading="loadingButtonCreateOrUpdateGroup"
              :disabled="disabledButtonCreateOrUpdateGroup || invalid"
              color="light-blue darken-3"
              class="mt-2 ml-2 white--text"
              :block="activeStyleBlockButton"
              @click="CreateOrUpdateGroup"
            >
              <v-icon right dark class="mx-1"> mdi-reload </v-icon>
              Actualizar
            </v-btn>
            <v-btn
              v-if="currentUserForUpdate !== null && isUpdateGroup"
              :loading="loadingButtonCreateOrUpdateGroup"
              color="red"
              class="mt-2 ml-2 white--text"
              :block="activeStyleBlockButton"
              @click="resetDataAndProcessEditGroup"
            >
              <v-icon right dark class="mx-1"> mdi-close-circle </v-icon>
              Cancelar
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </validation-observer>
  </div>
</template>
<script src="./CreateOrEditGroupsComponent.js"></script>
