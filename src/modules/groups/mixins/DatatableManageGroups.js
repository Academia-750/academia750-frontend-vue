import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('groupsService', ['tabViewgroups'])
  },
  methods: {
    ...mapMutations('groupsService', [
      'SET_USERS_SELECTED_DATATABLE',
      'SET_MATCHES_RESET_OPTIONS_DATATABLE'
    ]),
    ...mapActions('groupsService', ['getgroups']),
    async loadgroupsFromCurrentTab(valueTab = null) {
      const currentTab = valueTab ?? this.tabViewgroups

      if (currentTab === 'groups-account-enable') {
        await this.getgroups({
          params: {
            'filter[role]': 'group',
            'filter[state-account]': 'enable',
            sort: '-created-at',
            'page[size]': 10,
            'page[number]': 1
          }
        })

        this.SET_MATCHES_RESET_OPTIONS_DATATABLE(true)

        return
      }

      if (currentTab === 'groups-account-disable') {
        await this.getgroups({
          params: {
            'filter[role]': 'group',
            'filter[state-account]': 'disable',
            sort: '-created-at',
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
