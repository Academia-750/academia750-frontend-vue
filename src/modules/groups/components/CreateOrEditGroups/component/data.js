export default {
  data() {
    return {
      loadingButtonCreateOrUpdateGroup: false,
      disabledButtonCreateOrUpdateGroup: false,
      isUpdateGroup: false,
      form: {
        dni: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      },
      cache: {
        data: {
          group: {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
          }
        }
      },
      dataRoleGroup: null
    }
  }
}
