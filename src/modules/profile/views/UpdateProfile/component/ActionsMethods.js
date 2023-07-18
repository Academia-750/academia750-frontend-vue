export default {
  methods: {
    async updateProfileApi() {
      try {
        await this.UpdateProfileAction({
          data: {
            'first-name': this.form.firstName,
            'last-name': this.form.lastName,
            phone: this.form.phone,
            email: this.form.email
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
          timer: 10000
        })

        this.loadDataUserProfile()
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateProfile = false
        this.disabledButtonUpdateProfile = false
      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateProfile = false
        this.disabledButtonUpdateProfile = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title:
              'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          //this.ResetForm()
          this.loadingButtonUpdateProfile = false
          this.disabledButtonUpdateProfile = false
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    },
    async unsubscribeSystem() {
      this.$swal
        .fire({
          width: '400px',
          imageUrl: 'https://cdn-icons-png.flaticon.com/512/725/725099.png',
          imageWidth: 100,
          imageHeigth: 100,
          title: 'Dar de Baja',
          // eslint-disable-next-line quotes
          html: "<p class='text-xs-center'>Nos da mucha pena despedirnos de ti. <br>Esperamos que durante tu estancia en Academia 750 hayas podido aprender y conseguir ser un mejor opositor o que tu sueño se haya cumplido con nosotros. <br><b>¡Esperamos verte pronto de nuevo!</b></p>",
          confirmButtonText: 'Continuar con el proceso de baja',
          confirmButtonColor: '#007bff',
          showCancelButton: true,
          cancelButtonColor: '#dc3545',
          cancelButtonText: 'Cancelar',
          customClass: {
            confirmButton: 'text-xs-center',
            cancelButton: 'text-xs-center'
          }
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.UnsubscribeSystemProcess()
          }
        })
    },
    async UnsubscribeSystemProcess() {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.loadingButtonUnsubscribeSystem = true
        this.disabledButtonUnsubscribeSystem = true

        await this.UnsubscribeSystemAction()

        this.$manageTokenAuth.$remove_token_auth()
        //window.location.href = process.env.VUE_APP_BASE_URL_HOME
        if (this.$router.currentRoute.name !== '') {
          this.$router.push({
            name: 'home-website'
          })
        }
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
          title:
            'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
          showConfirmButton: true,
          confirmButtonText: '¡Entendido!',
          timer: 7500
        })
      }
    }
  }
}
