import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import computed from './component/computed'
import watch from './component/watch'
import ActionsMethods from './component/ActionsMethods'
import DatatableManageStudents from '../../mixins/DatatableManageGroups'

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
  mounted() {
    this.fetchDataRoleStudent()
  }
}
