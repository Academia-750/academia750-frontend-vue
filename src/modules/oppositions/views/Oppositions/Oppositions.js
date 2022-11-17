import { mapState } from 'vuex'
import headersOppositionsTable from './component/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import footerProps from './component/footerProps'

export default {
  mixins: [headersOppositionsTable, computedDatatable],
  components: {
    ResourceButtonEdit: () => import(/* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'),
    ResourceButtonDelete: () => import(/* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete')
  },
  data () {
    return {
      expanded: [],
      singleExpand: true
    }
  },
  computed: {
    ...mapState('oppositionsService', ['oppositions']),
    ...footerProps
  },
  head: {
    title: {
      inner: 'Gestion de oposiciones'
    }
  }
}
