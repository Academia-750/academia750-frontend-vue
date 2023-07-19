export default {
  data() {
    return {
      loadingButtonCreateGroup: false,
      disabledButtonCreateGroup: false,
      form: {
        código: '',
        nombre: ''
      },
      cache: {
        data: {
          profile: {
            código: '',
            nombre: ''
          }
        }
      }
    }
  }
}
