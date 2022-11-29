import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import computed from './component/computed'
import ActionsMethods from './component/ActionsMethods'

const MIXINS_COMPONENT = [
  components,
  data,
  methods,
  computed,
  ActionsMethods
]

export default {
  mixins: [...MIXINS_COMPONENT],
  mounted () {
    this.fetchDataTopic()
  },
  head: {
    title: {
      inner: 'Crear Tema'
    }
  }
}
