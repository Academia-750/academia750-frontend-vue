import { mapState, mapActions } from 'vuex'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'

import headersOppositionsTable from './component/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'
import footerProps from './component/footerProps'
import { PermissionEnum } from '@/utils/enums'

export default {
  mixins: [
    URLBuilderResources,
    headersOppositionsTable,
    computedDatatable,
    componentButtonsCrud
  ],
  components: {
    ResourceButtonEdit: () =>
      import(
        /* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'
      ),
    ResourceButtonDelete: () =>
      import(
        /* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      ),
    ResourceTextFieldSearch: () =>
      import(
        /* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'
      ),
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'
      ),
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    ResourceTitleToolbarDatatable: () =>
      import(
        /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
      ),
    ResourceDividerTitleDatatable: () =>
      import(
        /* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'
      ),
    ResourceHeaderCrudTitle: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'
      ),
    ResourceDialogConfirmDelete: () =>
      import(
        /* webpackChunkName: "ResourceDialogConfirmDelete" */ '@/modules/resources/components/resources/ResourceDialogConfirmDelete'
      )
  },
  beforeCreate() {
    this?.$hasPermissionMiddleware(PermissionEnum.GENERATE_TESTS)
  },
  data() {
    return {
      //namesRelationshipsIncludeRequest: 'topics'
    }
  },
  computed: {
    ...mapState('testsService', [
      'itemsDatatable',
      'stateLoadingItems',
      'informationMeta'
    ]),
    ...footerProps
  },
  watch: {
    optionsDatatable: {
      handler() {
        this.getCardsMemory({
          params: this.buildQueryParamsRequest()
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('testsService', ['fetchAQuiz', 'getCardsMemory']),
    searchFieldExecuted($event) {
      this.searchWord = $event
      this.getCardsMemory({
        params: this.buildQueryParamsRequest()
      })
    }
  },
  head: {
    title: {
      inner: 'Tarjetas de memoria'
    }
  }
}
