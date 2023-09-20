import { mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('studentsService', ['getStudents', 'deleteStudent']),
    ...mapMutations('studentsService', [
      'SET_CURRENT_USER_FOR_UPDATE',
      'SET_USERS_SELECTED_DATATABLE',
      'SET_OPTIONS_DATATABLE_USERS',
      'SET_MATCHES_RESET_OPTIONS_DATATABLE'
    ]),
    loadDatatatable() {
      this.getStudents({
        params: this.getParamsUrlApi()
      })
    },
    setDataForUpdateUser(item) {
      this.SET_CURRENT_USER_FOR_UPDATE({
        id: item.id,
        dni: item.dni,
        first_name: item['first-name'],
        last_name: item['last-name'],
        phone: item.phone,
        email: item.email
      })

      this.$emit('emitScrollToCreateOrEditStudentForm')
    },
    fetchInitialData() {
      this.getStudents({
        params: this.getParamsUrlApi()
      })
    },
    getParamsUrlApi() {
      const urlParams = this.buildQueryParamsRequest()

      urlParams['filter[state-account]'] = this.stateAccount

      return urlParams
    },
    searchFieldExecuted($event) {
      this.searchWord = $event
      this.getStudents({
        params: this.getParamsUrlApi()
      })
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    goToGroupPage(group) {
      this.$router.push({ name: 'group-students', params: { id: group.id } })
    },
    deleteStudentConfirm(item) {
      this.currentItemsSelectedForDelete = item
      //this.$refs['dialogConfirmDeleteAction'].showDialog = true
      this.$swal
        .fire({
          toast: true,
          width: '400px',
          icon: 'question',
          title: 'DAR DE BAJA',
          html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas eliminar este alumno y los datos relacionados a este?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: '#007bff',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteStudentAction()
          }
        })
    }
  }
}
