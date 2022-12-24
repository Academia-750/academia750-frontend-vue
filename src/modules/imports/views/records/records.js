import notifications from '@/mixins/notifications'
import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import computed from './component/computed'
import watch from './component/watch'
import ActionsMethods from './component/ActionsMethods'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headersOppositionsTable from './component/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'

const MIXINS_COMPONENT = [
  components,
  data,
  methods,
  computed,
  watch,
  ActionsMethods,
  notifications
]

const MIXINS_ADDITIONAL = [
  URLBuilderResources,
  headersOppositionsTable,
  computedDatatable,
  componentButtonsCrud
]

export default {
  mixins: [...MIXINS_COMPONENT, ...MIXINS_ADDITIONAL],
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  mounted() {
    this.loadNotifications()
  },
  head: {
    title: {
      inner: 'Gestion de preguntas'
    }
  }
}
