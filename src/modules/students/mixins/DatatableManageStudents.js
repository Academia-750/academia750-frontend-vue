import { mapState, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('studentsService', ['getStudents']),
    async loadStudentsFromCurrentTab (valueTab = null) {

      const value = valueTab ?? this.tabViewStudents

      if (value === 'students-account-enable') {
        await this.getStudents({
          params: {
            'filter[role]': 'student',
            'filter[state-account]': 'enable',
            'page[size]': 10,
            'page[number]': 1
          }
        })

        return
      }

      if (value === 'students-account-disable') {
        await this.getStudents({
          params: {
            'filter[role]': 'student',
            'filter[state-account]': 'disable',
            'page[size]': 10,
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
