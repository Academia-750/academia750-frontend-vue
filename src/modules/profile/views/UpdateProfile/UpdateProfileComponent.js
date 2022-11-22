import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import computed from './component/computed'

export default {
  mixins: [
    components,
    data,
    methods,
    computed
  ],
  mounted () {
    this.loadDataUserProfile()
  },
  head: {
    title: {
      inner: 'Perfil de usuario'
    }
  }
}
