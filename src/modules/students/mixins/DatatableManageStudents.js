import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapMutations('studentsService', ['SET_USERS_SELECTED_DATATABLE']),
    ...mapActions('studentsService', ['getStudents']),
    async loadStudentsFromCurrentTab (valueTab = null) {

      //this.ReloadDatatableStudents()

      if (valueTab === 'students-account-enable') {
        await this.getStudents({
          params: {
            'filter[role]': 'student',
            'filter[state-account]': 'enable',
            'sort': '-created-at',
            'page[size]': 5,
            'page[number]': 1
          }
        })

        return
      }

      if (valueTab === 'students-account-disable') {
        await this.getStudents({
          params: {
            'filter[role]': 'student',
            'filter[state-account]': 'disable',
            'page[size]': 5,
            'page[number]': 1
          }
        })

        return
      }
    }
  },
  computed: {
    ...mapState('studentsService', ['tabViewStudents'])
  }
}
