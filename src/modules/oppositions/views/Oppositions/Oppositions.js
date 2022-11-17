import { mapState, mapActions } from 'vuex'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'

import headersOppositionsTable from './component/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import footerProps from './component/footerProps'

export default {
  mixins: [headersOppositionsTable, computedDatatable, componentButtonsCrud],
  components: {
    ResourceButtonEdit: () => import(/* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'),
    ResourceButtonDelete: () => import(/* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'),
    ResourceButtonAdd: () => import(/* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'),
    ResourceTextFieldSearch: () => import(/* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'),
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceBannerNoDataDatatable: () => import(/* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle')
  },
  data () {
    return {
      searchWord: ''
    }
  },
  computed: {
    ...mapState('oppositionsService', ['oppositions']),
    ...footerProps
  },
  mounted () {
    this.getOppositions()
  },
  methods: {
    ...mapActions('oppositionsService', ['getOppositions']),
    searchRecordsDatatableMethod () {
      console.log('searchRecordsDatatableMethod')
    }
  },
  head: {
    title: {
      inner: 'Gestion de oposiciones'
    }
  }
}
