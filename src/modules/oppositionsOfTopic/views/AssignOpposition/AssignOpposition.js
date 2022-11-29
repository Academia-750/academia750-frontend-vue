import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import computed from './component/computed'
import ActionsMethods from './component/ActionsMethods'
import FetchDataTopicMethods from '@/modules/subtopicsOfTopic/mixins/FetchDataTopicMethods'

const MIXINS_COMPONENT = [
  components,
  data,
  methods,
  computed,
  ActionsMethods,
  FetchDataTopicMethods
]

export default {
  mixins: [...MIXINS_COMPONENT],
  mounted () {
    this.fetchDataTopic()
  },
  head: {
    title: {
      inner: 'Asignar Oposicion al tema'
    }
  }
}
