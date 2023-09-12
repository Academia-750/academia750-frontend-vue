import _ from 'lodash'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'

import headersOppositionsTable from './data/students-table-columns'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'

import props from './component/props'
import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import computed from './component/computed'
import watch from './component/watch'
import ActionsMethods from './component/ActionsMethods'
import DatatableManageStudents from '../../mixins/DatatableManageStudents'

const COMPONENT_MIXINS = [
  props,
  components,
  data,
  methods,
  ActionsMethods,
  computed,
  watch
]

const MIXINS = [
  DatatableManageStudents,
  URLBuilderResources,
  headersOppositionsTable,
  computedDatatable,
  componentButtonsCrud
]

export default {
  mixins: [...MIXINS, ...COMPONENT_MIXINS],
  created() {
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 500)
  },
  mounted () {
    this.getStudents({
      params: this.getParamsUrlApi()
    })
  }
}
