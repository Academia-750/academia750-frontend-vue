import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('studentsService', ['getStudents','createStudent', 'updateStudent', 'fetchRoleStudentData']),
    ...mapMutations('studentsService', ['SET_CURRENT_USER_FOR_UPDATE']),
    loadStudentsFromCurrentTab () {
      if (this.tabViewStudents === 'students-account-enable') {
        this.getStudents({
          params: {
            'filter[role]': 'student',
            'filter[state-account]': 'enable',
            'page[size]': 10,
            'page[number]': 1
          }
        })

        return
      }

      if (this.tabViewStudents === 'students-account-disable') {
        this.getStudents({
          params: {
            'filter[role]': 'student',
            'filter[state-account]': 'disable',
            'page[size]': 10,
            'page[number]': 1
          }
        })

        return
      }
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
    },
    async ResetForm() {
      await this.$refs['FormCreateOrEditStudent']['reset']()
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
