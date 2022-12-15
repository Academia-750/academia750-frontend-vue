import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('profileService', ['ChangeImageMyAccountProfile', 'getDataMyProfileAction']),
    async updateImageAccount() {
      const statusValidation = await this.$refs['FormChangeImageAccount'].validate()

      if (!statusValidation) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, complete correctamente los campos del formulario.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      this.updateImageAccountApi()
    },
    Preview_image() {
      if (!this.image) return

      this.urlImagePreview = URL.createObjectURL(this.image)
    },
    async ResetForm() {
      //await this.$refs['FormChangeImageAccount']['reset']()
      this.image = null
      this.$nextTick(() => {
        this.$refs['FormChangeImageAccount']['reset']()
      })

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormChangeImageAccount']['setErrors'](errorResponse)
      this.loadingButtonChangeImageAccount = true
      this.disabledButtonChangeImageAccount = true
      this.$loadingApp.disabledLoadingProgressLinear()
    },
    async reloadImageByPath() {
      this.$loadingApp.enableLoadingProgressLinear()
      await this.getDataMyProfileAction({
        actionAfterLogin: false,
        configResponse: {
          params: {
            include: 'image,roles,roles-permissions'
          }
        }
      })
      this.loadImageAccount()
      this.$loadingApp.disabledLoadingProgressLinear()
    },
    loadImageAccount() {
      const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
      const serverApiDevelopment = process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
      const serverApiProduction = process.env.VUE_APP_BASE_URL_API_PRODUCTION
      const { image } = this.user?.relationships

      if (!image) {
        this.urlImage = '/images/academia750/avatar_default_photo.svg'

        return
      }

      if (image.attributes.type_path === 'url') {
        this.urlImage = image.attributes.path

        return
      }

      if (image.attributes.type_path === 'local') {
        this.urlImage = `${IsDevelopmentEnviroment ? serverApiDevelopment : serverApiProduction}${image.attributes.path}`

        return
      }
    }

  }
}
