import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('studentsService', ['tabViewStudents'])
  },
  methods: {
    ...mapMutations('studentsService', ['SET_USERS_SELECTED_DATATABLE', 'SET_MATCHES_RESET_OPTIONS_DATATABLE']),
    ...mapActions('studentsService', ['getStudents']),
    async loadStudentsFromCurrentTab (valueTab = null) {

      const currentTab = valueTab ?? this.tabViewStudents

      if (currentTab === 'students-account-enable') {
        await this.getStudents({
          params: {
            'filter[state-account]': 'enable',
            'sort': '-created-at',
            'page[size]': 10,
            'page[number]': 1
          }
        })

        this.SET_MATCHES_RESET_OPTIONS_DATATABLE(true)

        return
      }

      if (currentTab === 'students-account-disable') {
        await this.getStudents({
          params: {
            'filter[state-account]': 'disable',
            'sort': '-created-at',
            'page[size]': 10,
            'page[number]': 1
          }
        })

        this.SET_MATCHES_RESET_OPTIONS_DATATABLE(true)

        return
      }
    }
  }
}
