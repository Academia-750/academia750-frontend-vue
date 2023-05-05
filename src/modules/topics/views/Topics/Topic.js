import notifications from '@/mixins/notifications'
import { mapState, mapActions } from 'vuex'
import _ from 'lodash'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'

import headersOppositionsTable from './component/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'
import footerProps from './component/footerProps'

export default {
  mixins: [URLBuilderResources, headersOppositionsTable, computedDatatable, componentButtonsCrud, notifications],
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
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  mounted() {
    this.loadNotifications()
  },
  data () {
    return {
      //namesRelationshipsIncludeRequest: 'topics'
      currentItemsSelectedForDelete: null
    }
  },
  computed: {
    ...mapState('topicsService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps,
    classDivButtonsImport() {
      return {
        'd-flex': true,
        'flex-column': this.$vuetify.breakpoint.width < 700,
        'justify-end': this.$vuetify.breakpoint.width >= 700,
        'my-2': true
      }
    }
  },
  created() {
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 500)
  },
  watch: {
    optionsDatatable: {
      handler () {
        this.getTopics({
          params: this.buildQueryParamsRequest()
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('topicsService', ['getTopics', 'deleteTopic']),
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.getTopics({
        params: this.buildQueryParamsRequest()
      })
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    loadDatatatable() {
      this.getTopics({
        params: this.buildQueryParamsRequest()
      })
    },
    deleteTopicConfirm (item) {
      /* if (item.has_subtopics) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: `¡Este tema '${item.name}' no se puede eliminar por que cuenta con subtemas!`,
          timer: 6000
        })

        return
      } */

      this.currentItemsSelectedForDelete = item
      this.$refs['dialogConfirmDeleteAction'].showDialog = true
    },
    async deleteTopicAction () {
      if (this.currentItemsSelectedForDelete === null || this.currentItemsSelectedForDelete === undefined) {
        return
      }

      try {
        await this.deleteTopic({
          id: this.currentItemsSelectedForDelete.id,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El tema ha sido eliminado con éxito.',
          timer: 3000
        })

        this.$refs['ResourceTextFieldSearch'].searchWordText = ''
        this.searchWord = ''

        this.getTopics({
          params: this.buildQueryParamsRequest()
        })
      } catch (error) {
        //console.log(error)
      }
    }
  },
  head: {
    title: {
      inner: 'Gestion de temas'
    }
  }
}
