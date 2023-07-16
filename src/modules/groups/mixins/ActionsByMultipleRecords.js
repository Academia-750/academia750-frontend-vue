import { mapState, mapActions } from 'vuex'
import DatatableManageStudents from './DatatableManageStudents.js'

export default {
  mixins: [DatatableManageStudents],
  data () {
    return {
      loadingButton: false
    }
  },
  computed: {
    ...mapState('studentsService', ['usersSelected']),
    hasSelectedAnyRecord () {
      return Array.isArray(this.usersSelected) && this.usersSelected.length > 0
    }
  },
  methods: {
    ...mapActions('studentsService', ['actionsForMultipleRecords']),
    async actionMultipleRecordsApiRequest ({ messageSuccess, action }) {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.loadingButton = true

        await this.actionsForMultipleRecords({
          data: {
            'action': action,
            'users': this.mapIdUsersSelected()
          },
          config: {}
        })
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButton = false

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: messageSuccess,
          timer: 7500
        })

        await this.loadStudentsFromCurrentTab()

      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButton = false
        this.alertErrorRequest()
      }
    },
    mapIdUsersSelected () {
      return this.usersSelected.map((user) => {
        return user.id
      })
    },
    alertErrorRequest (messageError = 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde') {
      this.$swal.fire({
        icon: 'error',
        title: messageError,
        showConfirmButton: true,
        confirmButtonText: '¡Entendido!',
        timer: 7500
      })
    },
    alertErrorNotSelectedAnyRecord ({ message }) {
      this.$swal.fire({
        icon: 'info',
        toast: true,
        title: message,
        showConfirmButton: true,
        confirmButtonText: '¡Entendido!',
        timer: 7500
      })
    }
  }
}
