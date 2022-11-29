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
      //await this.$refs['FormUpdateMyProfile']['reset']()
      this.$nextTick(() => {
        this.$refs['FormUpdateMyProfile']['reset']()
      })

      return true
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
    }

  }
}
