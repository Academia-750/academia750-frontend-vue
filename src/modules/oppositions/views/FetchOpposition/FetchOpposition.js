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
    ...mapActions('oppositionsService', ['fetchOpposition']),
    async fetchRecordData () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonFetchRecord = true

        const response = await this.fetchOpposition({
          id: this.$route.params.id
        })

        this.recordData = response.data

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonFetchRecord = false

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonFetchRecord = false
      }
    }
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  head: {
    title: {
      inner: 'Ver Oposición'
    }
  }
}
