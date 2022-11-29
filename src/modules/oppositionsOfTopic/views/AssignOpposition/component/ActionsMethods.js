import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('oppositionsService', ['createOpposition']),

    async AssignOppositionApi () {
      try {
        await this.createOpposition({
          data: {
            'name': this.form.nameOpposition,
            'period': this.form.periodOpposition
          }
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'La oposición ha sido creada con éxito.',
          timer: 3000
        })

        this.$router.push({
          name: 'manage-oppositions'
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOpposition = false
        this.disabledButtonCreateopposition = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOpposition = false
        this.disabledButtonCreateOpposition = false
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
    }
  }
}
