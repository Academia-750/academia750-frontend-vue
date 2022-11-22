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
  head: {
    title: {
      inner: 'Cambiar contraseña'
    }
  }
}
