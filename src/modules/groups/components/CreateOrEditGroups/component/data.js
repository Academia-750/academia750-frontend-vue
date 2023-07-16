export default {
  data () {
    return {
      loadingButtonCreateOrUpdateStudent: false,
      disabledButtonCreateOrUpdateStudent: false,
      isUpdateStudent: false,
      form : {
        dni: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      },
      cache: {
        data: {
          student: {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
          }
        }
      },
      dataRoleStudent: null
    }
  }
}
