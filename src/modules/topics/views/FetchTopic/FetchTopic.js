import { mapActions } from 'vuex'
import CopyLabel from '@/components/common/CopyLabel'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    CopyLabel
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  data () {
    return {
      loadingButtonFetchRecord: false,
      disabledButtonFetchRecord: false,
      recordData: ''
    }
  },
  mounted () {
    this.fetchRecordData()
  },
  methods: {
    ...mapActions('topicsService', ['fetchTopic']),
    async fetchRecordData () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonFetchRecord = true

        const response = await this.fetchTopic({
          id: this.$route.params.id,
          config: {
            params: {
              include: 'topic-group'
            }
          }
        })

        this.recordData = response.data

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonFetchRecord = false

      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonFetchRecord = false
      }
    }
  },
  head: {
    title: {
      inner: 'Ver Tema'
    }
  }
}
