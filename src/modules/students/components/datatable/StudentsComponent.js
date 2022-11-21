import { mapState, mapActions } from 'vuex'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'

import headersOppositionsTable from './data/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'
import footerProps from './data/footerProps'

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
  props: {
    stateAccount: {
      type: String,
      default: 'enable'
    }
  },
  data () {
    return {
      //namesRelationshipsIncludeRequest: 'topics'
      currentItemsSelectedForDelete: null
    }
  },
  computed: {
    ...mapState('studentsService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta']),
    ...footerProps
  },
  /* mounted () {
    this.getStudents({
      params: this.getParamsUrlApi()
    })
  }, */
  watch: {
    optionsDatatable: {
      handler () {
        this.getStudents({
          params: this.getParamsUrlApi()
        })
      },
      deep: true
    }
  },
  methods: {
    ...mapActions('studentsService', ['getStudents', 'deleteStudent']),
    fetchInitialData () {
      this.getStudents({
        params: this.getParamsUrlApi()
      })
    },
    getParamsUrlApi () {
      const urlParams = this.buildQueryParamsRequest()

      urlParams['filter[role]'] = 'student'
      urlParams['filter[state-account]'] = this.stateAccount

      return urlParams
    },
    searchFieldExecuted ($event) {
      this.searchWord = $event
      this.getStudents({
        params: this.getParamsUrlApi()
      })
    },
    deleteStudentConfirm (item) {
      this.currentItemsSelectedForDelete = item
      this.$refs['dialogConfirmDeleteAction'].showDialog = true
    },
    async deleteStudentAction () {
      if (this.currentItemsSelectedForDelete === null || this.currentItemsSelectedForDelete === undefined) {
        return
      }

      try {
        await this.deleteStudent({
          id: this.currentItemsSelectedForDelete.id,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El alumno ha sido eliminado con éxito.',
          timer: 3000
        })

        this.$refs['ResourceTextFieldSearch'].searchWordText = ''
        this.searchWord = ''

        this.getStudents({
          params: this.getParamsUrlApi()
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
