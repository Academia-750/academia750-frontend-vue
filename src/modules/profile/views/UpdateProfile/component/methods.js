import { mapActions } from 'vuex'

export default {
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
      this.loadingButtonUpdateProfile = true
      this.disabledButtonUpdateProfile = true
      this.$loadingApp.disabledLoadingProgressLinear()
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
  }
}
