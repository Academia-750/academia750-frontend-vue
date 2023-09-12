import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('studentsService', ['getStudents','createStudent', 'updateStudent']),
    ...mapMutations('studentsService', ['SET_CURRENT_USER_FOR_UPDATE']),
    cancelProcessEditStudentData () {

      if (this.isUpdateStudent) {
        this.loadDataUserForUpdate(this.currentUserForUpdate)

        return
      }

      this.ResetForm()
    },
    resetDataAndProcessEditStudent () {
      this.cache.data.student.firstName = null
      this.cache.data.student.lastName = null
      this.cache.data.student.phone = null
      this.cache.data.student.email = null

      this.ResetForm()
      this.isUpdateStudent = false
      this.SET_CURRENT_USER_FOR_UPDATE(null)
    },
    loadDataUserForUpdate (data) {
      const { dni, first_name, last_name, phone, email } = data

      this.$refs['DNIPersonInputComponent'].dni = dni
      this.$refs['namePersonInputComponent'].name_person = first_name
      this.$refs['LastNamePersonInputComponent'].last_name = last_name
      this.$refs['PhoneInputComponent'].phone = phone
      this.$refs['EmailInputComponent'].email = email

      this.form.dni = dni
      this.form.firstName = first_name
      this.form.lastName = last_name
      this.form.phone = phone
      this.form.email = email

      this.cache.data.student.firstName = first_name
      this.cache.data.student.lastName = last_name
      this.cache.data.student.phone = phone
      this.cache.data.student.email = email

      this.isUpdateStudent = true
    },
    ResetForm() {
      //await this.$refs['FormCreateOrEditStudent']['reset']()
      this.$refs['DNIPersonInputComponent'].dni = ''
      this.$refs['namePersonInputComponent'].name_person = ''
      this.$refs['LastNamePersonInputComponent'].last_name = ''
      this.$refs['PhoneInputComponent'].phone = ''
      this.$refs['EmailInputComponent'].email = ''

      this.form.dni = ''
      this.form.firstName = ''
      this.form.lastName = ''
      this.form.phone = ''
      this.form.email = ''

      this.$nextTick(() => {
        this.$refs['FormCreateOrEditStudent']['reset']()
      })

      return true
    },
    CreateOrUpdateStudent () {
      this.$refs['FormCreateOrEditStudent'].validate().then( (status) => {
        if (!status) {
          this.$swal.fire({
            icon: 'error',
            toast: true,
            title: 'Por favor, complete correctamente los campos del formulario.',
            showConfirmButton: true,
            confirmButtonText: 'Entendido',
            timer: 7500
          })
        } else {

          this.$loadingApp.enableLoadingProgressLinear()
          this.loadingButtonCreateOrUpdateStudent = true
          this.disabledButtonCreateOrUpdateStudent = true

          if (this.currentUserForUpdate === null) {
            this.createStudentApi()
          } else {
            this.updateProfileApi()
          }
        }

      } )

    },

    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateOrEditStudent']['setErrors'](errorResponse)
      this.loadingButtonCreateOrUpdateStudent = false
      this.disabledButtonCreateOrUpdateStudent = false
      this.$loadingApp.disabledLoadingProgressLinear()
    }
  }
}
