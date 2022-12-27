import { mapActions, mapState } from 'vuex'
import CardMemoryItem from '../../components/CardMemory/CardMemoryItem'
import CopyLabel from '@/components/common/CopyLabel'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    CopyLabel,
    CardMemoryItem
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('student')
  },
  data () {
    return {
      pageNumber: 1,
      totalNumberPages: 0
    }
  },
  computed: {
    ...mapState('testsService', ['ItemsQuestionsByCardsMemory'])
  },
  mounted () {
    this.fetchRecordData()
  },
  methods: {
    ...mapActions('testsService', ['fetchACardMemory']),
    async fetchRecordData () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()

        await this.fetchACardMemory({
          test_id: this.$route.params.id,
          config: {
            params: {
              'page[size]': '20',
              'page[number]': this.pageNumber
            }
          }
        })

        this.$loadingApp.disabledLoadingProgressLinear()

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
      }
    }
  },
  head: {
    title: {
      inner: 'Estudiar con Tarjeta de memoria'
    }
  }
}
