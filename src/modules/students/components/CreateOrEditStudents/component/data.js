export default {
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
  }
}
