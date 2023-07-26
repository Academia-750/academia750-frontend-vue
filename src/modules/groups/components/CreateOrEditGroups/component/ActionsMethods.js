export default {
  methods: {
    async fetchDataRoleGroup() {
      try {
        const response = await this.fetchRoleStudentData({
          config: {}
        })

        this.dataRoleStudent = response.data.data
      } catch (error) {
        //console.log(error)
      }
    },
    async createGroupApi() {
      try {
        await this.createStudent({
          data: {
            dni: this.form.dni,
            'first-name': this.form.firstName,
            'last-name': this.form.lastName,
            phone: this.form.phone,
            email: this.form.email,
            roles: [this.dataRoleStudent.id]
          },
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El alumno ha sido registrado con éxito.',
          timer: 10000
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOrUpdateStudent = false
        this.disabledButtonCreateOrUpdateStudent = false
        this.ResetForm()
        this.SET_CURRENT_USER_FOR_UPDATE(null)
        this.$emit('SuccessfullyProcessCreateOrUpdateStudent')

        this.$emit('emitReloadDatatableGroups')
      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOrUpdateStudent = false
        this.disabledButtonCreateOrUpdateStudent = false
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
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    },
    async updateProfileApi() {
      try {
        await this.updateStudent({
          id: this.currentUserForUpdate.id,
          data: {
            //'dni': this.form.dni,
            'first-name': this.form.firstName,
            'last-name': this.form.lastName,
            phone: this.form.phone,
            email: this.form.email,
            roles: [this.dataRoleStudent.id]
          },
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'Alumno actualizado correctamente.',
          timer: 10000
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOrUpdateStudent = false
        this.disabledButtonCreateOrUpdateStudent = false

        this.ResetForm()
        this.SET_CURRENT_USER_FOR_UPDATE(null)
        this.$emit('SuccessfullyProcessCreateOrUpdateStudent')
        this.loadGroupsFromCurrentTab()

        this.$emit('emitReloadDatatableGroups')
      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOrUpdateStudent = false
        this.disabledButtonCreateOrUpdateStudent = false
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
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    }
  }
}
