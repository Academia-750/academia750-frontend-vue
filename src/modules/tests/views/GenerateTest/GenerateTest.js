import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import ActionsMethods from './component/ActionsMethods'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headersOppositionsTable from './component/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'

const MIXIN_COMPONENT = [
  components,
  data,
  methods,
  ActionsMethods
]

const MIXINS_EXTRA = [
  URLBuilderResources, headersOppositionsTable, computedDatatable, componentButtonsCrud
]

export default {
  mixins: [...MIXINS_EXTRA, ...MIXIN_COMPONENT],
  components: {

  },
  beforeCreate() {
    this?.$hasRoleMiddleware('student')
  },
  computed: {
    getTextButtonCreateTest() {
      if (this.typeTestSelected === 'test') {
        return 'Crear Test'
      }

      if (this.typeTestSelected === 'card_memory') {
        return 'Crear tarjeta de memoria'
      }

      return 'Crear Test'
    }
  },
  mounted () {
  },
  methods: {
  },
  head: {
    title: {
      inner: 'Generar cuestionario'
    }
  }
}
