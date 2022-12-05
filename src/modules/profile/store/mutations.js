export default {
  set_user(state, payload) {
    state.user = payload
  },
  set_notifications(state, payload) {
    state.notifications = payload
  },
  set_count_notifications_unread(state, payload) {
    state.count_notification_unread = payload
  }
}
