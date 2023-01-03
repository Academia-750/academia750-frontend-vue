import Cookies from 'js-cookie'
import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import computed from './component/computed'
import ActionsMethods from './component/ActionsMethods'
import notifications from '@/mixins/notifications'

export default {
  mixins: [
    components,
    data,
    methods,
    ActionsMethods,
    computed,
    notifications
  ],
  mounted() {
    this.loadNotifications()
    this.loadDataUserProfile()

    /* window.$EchoJSInstanceAcademia750.private(`App.Models.User.${store.state.profileService.user.id}`)
      .listen('.user.logout.application', (data) => {
        console.log(data)
      }) */
  },
  head: {
    title: {
      inner: 'Perfil de usuario'
    }
  }
}
