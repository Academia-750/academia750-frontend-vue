import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import components from './component/components'
import headersTopicsTable from './component/headersDatatable'

const MIXINS_ADDITIONAL = [
  headersTopicsTable,
  componentButtonsCrud
]

export default {
  mixins: [...MIXINS_ADDITIONAL, components],
  props: {
    itemsDatatable: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      search: null
    }
  }
}
