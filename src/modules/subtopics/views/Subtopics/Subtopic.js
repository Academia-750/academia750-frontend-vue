import { mapState, mapActions } from 'vuex'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'

import headersOppositionsTable from './component/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'
import footerProps from './component/footerProps'

export default {
  mixins: [URLBuilderResources, headersOppositionsTable, computedDatatable, componentButtonsCrud],
  components: {
    ResourceButtonEdit: () => import(/* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'),
    ResourceButtonDelete: () => import(/* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'),
    ResourceButtonAdd: () => import(/* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'),
    ResourceTextFieldSearch: () => import(/* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'),
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceBannerNoDataDatatable: () => import(/* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    ResourceDialogConfirmDelete: () => import(/* webpackChunkName: "ResourceDialogConfirmDelete" */ '@/modules/resources/components/resources/ResourceDialogConfirmDelete')
  },
  data () {
    return {
      //namesRelationshipsIncludeRequest: 'topics'
      currentItemsSelectedForDelete: null
    }
  },
  computed: {
    ...mapState('subtopicsService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  mounted () {
    /* this.getSubtopics({
      params: this.buildQueryParamsRequest()
    }) */
  },
  watch: {
    optionsDatatable: {
      handler () {
        this.getSubtopics({
          params: this.buildQueryParamsRequest()
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('subtopicsService', ['getSubtopics', 'deleteSubtopic']),
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.getSubtopics({
        params: this.buildQueryParamsRequest()
      })
    },
    deleteSubtopicConfirm (item) {
      this.currentItemsSelectedForDelete = item
      this.$refs['dialogConfirmDeleteAction'].showDialog = true
    },
    async deleteSubtopicAction () {
      if (this.currentItemsSelectedForDelete === null || this.currentItemsSelectedForDelete === undefined) {
        return
      }

      try {
        await this.deleteSubtopic({
          id: this.currentItemsSelectedForDelete.id,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El subtema ha sido eliminado con éxito.',
          timer: 3000
        })

        this.$refs['ResourceTextFieldSearch'].searchWordText = ''
        this.searchWord = ''

        this.getSubtopics({
          params: this.buildQueryParamsRequest()
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
  head: {
    title: {
      inner: 'Gestion de subtemas'
    }
  }
}
