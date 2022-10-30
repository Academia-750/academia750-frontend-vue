<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="d-flex align-items-center">
        <v-icon large class="mx-1">mdi-account-circle</v-icon>
        <span class="font-weight-bold d-none d-sm-inline text-xs-caption text-sm-h6">Perfil de usuario</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        color="teal darken-2"
        class="white--text"
        @click="loadDataUserProfile"
        title="Cargar nuevamente mis datos"
      >
        <v-icon
          right
          dark
          class="mx-1"
        >
          mdi-reload
        </v-icon>
        <span class="d-none d-sm-inline">Cargar</span>
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

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

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
      disabledButtonUnsubscribeSystem: false,
      form : {
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      },
      cache: {
        data: {
          profile: {
            firstName: '',
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
    ...mapGetters('profileService', ['get_roles']),
    checkIfThereIsAtLeast_1ModifiedData () {
      const { firstName, lastName, phone, email } = this.cache.data.profile

      return (firstName !== this.form.firstName) || (lastName !== this.form.lastName) || (phone !== this.form.phone) || (email !== this.form.email)
    },
    activeStyleBlockButton () {
      return this.$vuetify.breakpoint.width <= 600
    },
    canUnsubscribeSystem () {
      return !this.get_roles.includes('admin')
    }
  },
  mounted () {
    this.loadDataUserProfile()
  },
  methods: {
    ...mapActions('profileService', ['UpdateProfileAction', 'UnsubscribeSystemAction']),
    updateProfile () {
      if (!this.checkIfThereIsAtLeast_1ModifiedData) {
        this.$swal.fire({
          icon: 'warning',
          toast: true,
          title: 'No es necesario actualizar. No hay ningún dato modificado',
          showConfirmButton: true,
          confirmButtonText: '¡Entendido!',
          timer: 5000
        })

        return
      }

      this.$refs['FormUpdateMyProfile'].validate().then( (status) => {
        if (!status) {
          this.$swal.fire({
            icon: 'error',
            toast: true,
            title: 'Por favor, complete correctamente los campos del formulario.',
            showConfirmButton: true,
            confirmButtonText: 'Entendido',
            timer: 7500
          })

          return
        }
      } )
      this.$loadingApp.enableLoadingProgressLinear()
      this.loadingButtonUpdateProfile = true
      this.disabledButtonUpdateProfile = true
      this.updateProfileApi()
    },
    async ResetForm() {
      await this.$refs['FormUpdateMyProfile']['reset']()

      return true
    },
    async updateProfileApi () {
      try {
        await this.UpdateProfileAction({
          data: {
            'first-name': this.form.firstName,
            'last-name': this.form.lastName,
            'phone': this.form.phone,
            'email': this.form.email
          },
          config: {
            params: {
              include: 'roles,roles-permissions'
            }
          }
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'Tus datos han sido actualizados con éxito.',
          timer: 3000
        })

        this.loadDataUserProfile()
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateProfile = false
        this.disabledButtonUpdateProfile = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateProfile = false
        this.disabledButtonUpdateProfile = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.ResetForm()
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormUpdateMyProfile']['setErrors'](errorResponse)
    },
    loadDataUserProfile () {
      const { dni, first_name, last_name, phone, email } = this.user.attributes

      this.$refs['DNIPersonInputComponent'].dni = dni
      this.$refs['namePersonInputComponent'].name_person = first_name
      this.$refs['LastNamePersonInputComponent'].last_name = last_name
      this.$refs['PhoneInputComponent'].phone = phone
      this.$refs['EmailInputComponent'].email = email

      this.form.firstName = first_name
      this.form.lastName = last_name
      this.form.phone = phone
      this.form.email = email

      this.cache.data.profile.firstName = first_name
      this.cache.data.profile.lastName = last_name
      this.cache.data.profile.phone = phone
      this.cache.data.profile.email = email
    },
    async unsubscribeSystem () {

      this.$swal.fire({
        // icon: "error",
        width: '800px',
        imageUrl: 'https://cdn-icons-png.flaticon.com/512/725/725099.png',
        imageWidth: 100,
        imageHeigth: 100,
        title: 'Dar de Baja',
        // eslint-disable-next-line quotes
        html: "<p class='text-center'>Nos da mucha pena despedirnos de ti. <br>Esperamos que durante tu estancia en Academia 750 hayas podido aprender y conseguir ser un mejor opositor o que tu sueño se haya cumplido con nosotros. <br><b>¡Esperamos verte pronto de nuevo!</b></p>",
        confirmButtonText: 'Continuar con el proceso de baja',
        confirmButtonColor: '#007bff',
        showCancelButton: true,
        cancelButtonColor: '#dc3545',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.UnsubscribeSystemProcess()
        }
      })
    },
    async UnsubscribeSystemProcess () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.loadingButtonUnsubscribeSystem = true
        this.disabledButtonUnsubscribeSystem = true

        await this.UnsubscribeSystemAction()

        this.$manageTokenAuth.$remove_token_auth()
        this.$router.push({
          name: 'login'
        })
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUnsubscribeSystem = false
        this.disabledButtonUnsubscribeSystem = false
        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'Adiós! Esperamos verte por aquí después',
          showConfirmButton: false,
          timer: 4000
        })
      } catch (error) {
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUnsubscribeSystem = false
        this.disabledButtonUnsubscribeSystem = false
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
          showConfirmButton: true,
          confirmButtonText: '¡Entendido!',
          timer: 7500
        })
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
