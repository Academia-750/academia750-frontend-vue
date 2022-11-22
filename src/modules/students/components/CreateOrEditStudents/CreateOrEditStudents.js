import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: {
    DniFieldInput: () => import(/* webpackChunkName: "DNIFieldInput" */ '@/modules/students/components/form/DNIFieldInput'),
    NameFieldInput: () => import(/* webpackChunkName: "NameFieldInput" */ '@/modules/students/components/form/NameFieldInput'),
    LastNameFieldInput: () => import(/* webpackChunkName: "LastNameFieldInput" */ '@/modules/students/components/form/LastNameFieldInput'),
    PhoneFieldInput: () => import(/* webpackChunkName: "PhoneFieldInput" */ '@/modules/students/components/form/PhoneFieldInput'),
    EmailFieldInput: () => import(/* webpackChunkName: "EmailFieldInput" */ '@/modules/students/components/form/EmailFieldInput')
  },
  data () {
    return {
      loadingButtonCreateOrUpdateStudent: false,
      disabledButtonCreateOrUpdateStudent: false,
      form : {
        dni: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      },
      dataRoleStudent: null
    }
  },
  computed: {
    ...mapState('studentsService', ['currentUserForUpdate', 'tabViewStudents']),
    getTitleByUserDataForUpdateOrCreate () {
      return this.currentUserForUpdate === null ? 'Crear alumno' : 'Editar alumno'
    },
    activeStyleBlockButton () {
      return this.$vuetify.breakpoint.width <= 600
    }
  },
  mounted () {
    this.fetchDataRoleStudent()
  },
  watch: {
    currentUserForUpdate (value) {
      if (value === null) {
        this.ResetForm()

        return
      }

      this.loadDataUserForUpdate(value)
    }
  },
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
    async fetchDataRoleStudent () {
      try {
        const response = await this.fetchRoleStudentData({
          config: {}
        })

        this.dataRoleStudent = response.data.data
      } catch (error) {
        console.log(error)
      }

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
    async createStudentApi () {
      try {
        await this.createStudent({
          data: {
            'dni': this.form.dni,
            'first-name': this.form.firstName,
            'last-name': this.form.lastName,
            'phone': this.form.phone,
            'email': this.form.email,
            'roles': [this.dataRoleStudent.id]
          },
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El alumno ha sido registrado con éxito.',
          timer: 3000
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOrUpdateStudent = false
        this.disabledButtonCreateOrUpdateStudent = false
        this.ResetForm()
        this.SET_CURRENT_USER_FOR_UPDATE(null)
        this.$emit('SuccessfullyProcessCreateOrUpdateStudent')
        this.loadStudentsFromCurrentTab()
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOrUpdateStudent = false
        this.disabledButtonCreateOrUpdateStudent = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    },
    async updateProfileApi () {
      try {
        await this.updateStudent({
          id: this.currentUserForUpdate.id,
          data: {
            'dni': this.form.dni,
            'first-name': this.form.firstName,
            'last-name': this.form.lastName,
            'phone': this.form.phone,
            'email': this.form.email,
            'roles': [this.dataRoleStudent.id]
          },
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'Alumno actualizado correctamente.',
          timer: 3000
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOrUpdateStudent = false
        this.disabledButtonCreateOrUpdateStudent = false

        this.ResetForm()
        this.SET_CURRENT_USER_FOR_UPDATE(null)
        this.$emit('SuccessfullyProcessCreateOrUpdateStudent')
        this.loadStudentsFromCurrentTab()
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOrUpdateStudent = false
        this.disabledButtonCreateOrUpdateStudent = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateOrEditStudent']['setErrors'](errorResponse)
      this.loadingButtonCreateOrUpdateStudent = false
      this.disabledButtonCreateOrUpdateStudent = false
      this.$loadingApp.disabledLoadingProgressLinear()
    }
  }
}
