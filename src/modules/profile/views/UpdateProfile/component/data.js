export default {
  data () {
    return {
      loadingButtonUpdateProfile: false,
      disabledButtonUpdateProfile: false,
      loadingButtonUnsubscribeSystem: false,
      disabledButtonUnsubscribeSystem: false,
      form : {
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
      },
      cache: {
        data: {
          profile: {
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
          }
        }
      }
    }
  }
}
