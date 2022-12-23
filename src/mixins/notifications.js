import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('profileService', ['notifications', 'count_notification_unread', 'user'])
  },
  methods: {
    ...mapActions('profileService', ['getNotifications', 'readNotification']),
    loadNotifications(page_size = 5, page_number = 1) {
      return this.getNotifications({
        config: {
          params: {
            'page[size]': page_size,
            'page[number]': page_number
          }
        }
      })
    },
    async readNotificationAction(notification_id) {
      await this.readNotification({
        notification_id
      })

      this.loadNotifications(5,1)
    },
    redirectRouteNotification(notification) {
      this.readNotificationAction(notification.id)

      this.$router.push({
        path: notification.routeTo
      })
    },
    listenChannelUserAuth(callback_execute) {
      /* $EchoJSInstanceAcademia750.private(`App.Models.User.${this.user.id}`)
        .notification((notification) => {
          this.$toast.success('Tienes una nueva notificación', {
            position: 'bottom-right',
            timeout: 10000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 1.24,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: 'fa fa-bell',
            rtl: false
          })

          callback_execute(notification)
        }) */
    }
  }
}
