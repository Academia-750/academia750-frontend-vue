import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('groupsService', [
      'getGroups',
      'createGroup',
      'updateGroup',
      'fetchRoleGroupData',
      'getGroupsStudents'
    ]),
    ...mapMutations('groupsService', ['SET_CURRENT_USER_FOR_UPDATE']),
    cancelProcessEditGroupData() {
      if (this.isUpdateGroup) {
        this.loadDataUserForUpdate(this.currentUserForUpdate)

        return
      }

      this.ResetForm()
    },
    resetDataAndProcessEditGroup() {
      this.cache.data.student.firstName = null
      this.cache.data.student.lastName = null
      this.cache.data.student.phone = null
      this.cache.data.student.email = null

      this.ResetForm()
      this.isUpdateGroup = false
      this.SET_CURRENT_USER_FOR_UPDATE(null)
    },
    loadDataUserForUpdate(data) {
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

      this.cache.data.group.firstName = first_name
      this.cache.data.group.lastName = last_name
      this.cache.data.group.phone = phone
      this.cache.data.group.email = email

      this.isUpdateStudent = true
    },
    ResetForm() {
      //await this.$refs['FormCreateOrEditGroup']['reset']()
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
        this.$refs['FormCreateOrEditGroup']['reset']()
      })

      return true
    },
    CreateOrUpdateGroup() {
      this.$refs['FormCreateOrEditGroup'].validate().then((status) => {
        if (!status) {
          this.$swal.fire({
            icon: 'error',
            toast: true,
            title:
              'Por favor, complete correctamente los campos del formulario.',
            showConfirmButton: true,
            confirmButtonText: 'Entendido',
            timer: 7500
          })
        } else {
          this.$loadingApp.enableLoadingProgressLinear()
          this.loadingButtonCreateOrUpdateGroup = true
          this.disabledButtonCreateOrUpdateGroup = true

          if (this.currentUserForUpdate === null) {
            this.createGroupApi()
          } else {
            this.updateProfileApi()
          }
        }
      })
    },

    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateOrEditGroup']['setErrors'](errorResponse)
      this.loadingButtonCreateOrUpdateGroup = false
      this.disabledButtonCreateOrUpdateGroup = false
      this.$loadingApp.disabledLoadingProgressLinear()
    }
  }
}
