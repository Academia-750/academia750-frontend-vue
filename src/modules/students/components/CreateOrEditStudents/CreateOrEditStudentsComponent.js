import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import computed from './component/computed'
import watch from './component/watch'
import ActionsMethods from './component/ActionsMethods'
import DatatableManageStudents from '../../mixins/DatatableManageStudents'

export default {
  mixins: [
    DatatableManageStudents,
    components,
    data,
    methods,
    ActionsMethods,
    computed,
    watch
  ],
  mounted () {
  }
}
