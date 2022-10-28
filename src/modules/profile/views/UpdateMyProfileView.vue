<template>
  <div>
    <v-toolbar class="flex-grow-0 mb-2">
      <div class="d-flex justify-center align-items-center">
        <v-icon class="mx-1">mdi-account-circle</v-icon>
        <span class="font-weight-bold text-xs-caption text-sm-h6">Perfil de usuario</span>
      </div>
    </v-toolbar>
    <section class="email-app-top px-2 py-1 d-flex align-center">
      <validation-observer ref="FormUpdateMyProfile" v-slot="{ invalid }">
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
              @NamePersonBinding="form.namePerson = $event"
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
              :disabled="disabledButtonUpdateProfile || invalid"
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
              :disabled="disabledButtonUnsubscribeSystem"
              color="red darken-1"
              class="mt-3 white--text"
              :block="activeStyleBlockButton"
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
      </validation-observer>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import DniFieldInput from '../components/updateProfile/DNIFieldInput.vue'
import NamePersonInput from '../components/updateProfile/NameFieldInput.vue'
import LastNamePersonInput from '../components/updateProfile/LastNameFieldInput.vue'
import PhoneFieldInput from '../components/updateProfile/PhoneFieldInput.vue'
import EmailFieldInput from '../components/updateProfile/EmailFieldInput.vue'

export default {
  components: {
    DniFieldInput,
    NamePersonInput,
    LastNamePersonInput,
    PhoneFieldInput,
    EmailFieldInput
  },
  data () {
    return {
      loadingButtonUpdateProfile: false,
      disabledButtonUpdateProfile: false,
      loadingButtonUnsubscribeSystem: false,
      disabledButtonUnsubscribeSystem: true,
      form : {
        namePerson: '',
        lastName: '',
        phone: '',
        email: ''
      },
      cache: {
        data: {
          profile: {
            namePerson: '',
            lastName: '',
            phone: '',
            email: ''
          }
        }
      }
    }
  },
  computed: {
    ...mapState('profileService', ['user']),
    checkIfThereIsAtLeast_1ModifiedData () {
      const { first_name, last_name, phone, email } = this.cache.data.profile

      return (first_name !== this.form.namePerson) || (last_name !== this.form.lastName) || (phone !== this.form.phone) || (email !== this.form.email)
    },
    activeStyleBlockButton () {
      return this.$vuetify.breakpoint.width <= 600
    }
  },
  mounted () {
    const { dni, first_name, last_name, phone, email } = this.user.attributes

    this.$refs['DNIPersonInputComponent'].dni = dni
    this.$refs['namePersonInputComponent'].name_person = first_name
    this.$refs['LastNamePersonInputComponent'].last_name = last_name
    this.$refs['PhoneInputComponent'].phone = phone
    this.$refs['EmailInputComponent'].email = email

    this.form.namePerson = first_name
    this.form.lastName = last_name
    this.form.phone = phone
    this.form.email = email

    this.cache.data.profile.namePerson = first_name
    this.cache.data.profile.lastName = last_name
    this.cache.data.profile.phone = phone
    this.cache.data.profile.email = email
    console.log(this.user)
  },
  methods: {
    updateProfile () {
      if (!this.checkIfThereIsAtLeast_1ModifiedData) {
        this.$swal.fire({
          icon: 'warning',
          title: 'No es necesario actualizar. No hay ningún dato modificado',
          showConfirmButton: true,
          confirmButtonText: '¡Entendido!',
          timer: 5000
        })

        return
      }
    }

  },
  head: {
    title: {
      inner: 'Perfil de usuario'
    }
  }
}
</script>

<style lang="scss" scoped></style>
