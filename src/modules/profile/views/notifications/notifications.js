import notifications from '@/mixins/notifications'

export default {
  mixins: [notifications],
  data () {
    return {
      pageNumber: 1,
      totalNumberPages: 0
    }
  },
  computed: {
  },
  mounted() {
    this.listenChannelNotificationsUserAuth()
    this.loadNotifications(50, 1)
      .then((response) => {
        this.totalNumberPages = this.getTotalNumberPages(response)
      })
  },
  methods: {
    listenChannelNotificationsUserAuth() {
      this.listenChannelUserAuth(() => {
        this.loadNotifications(50, 1)
      })
    },
    getTotalNumberPages(response) {
      return Math.ceil((response.data.meta.total / response.data.meta.per_page))
    }
  },
  watch: {
    pageNumber(number) {
      this.loadNotifications(50, number)
        .then((response) => {
          this.totalNumberPages = this.getTotalNumberPages(response)
        })
    }
  },
  head: {
    title: {
      inner: 'Mis notificaciones'
    }
  }
}
