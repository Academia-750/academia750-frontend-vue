import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import computed from './component/computed'
import ActionsMethods from './component/ActionsMethods'

export default {
  mixins: [
    components,
    data,
    methods,
    ActionsMethods,
    computed
  ],
  mounted () {
    this.loadImageAccount()

    /* window.$EchoJSInstanceAcademia750.private(`App.Models.User.${store.state.profileService.user.id}`)
      .listen('.user.logout.application', (data) => {
        console.log(data)
      }) */
  },
  head: {
    title: {
      inner: 'Cambiar mi foto'
    }
  }
}