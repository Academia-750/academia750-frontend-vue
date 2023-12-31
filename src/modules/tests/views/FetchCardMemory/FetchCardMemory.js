import { mapActions, mapState } from 'vuex'
import CardMemoryItem from '../../components/CardMemory/CardMemoryItem'
import CopyLabel from '@/components/common/CopyLabel'
import { PermissionEnum } from '@/utils/enums'

export default {
  components: {
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'
      ),
    ResourceTitleToolbarDatatable: () =>
      import(
        /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
      ),
    ResourceHeaderCrudTitle: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'
      ),
    ResourceDividerTitleDatatable: () =>
      import(
        /* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'
      ),
    CopyLabel,
    CardMemoryItem
  },
  beforeCreate() {
    this?.$hasPermissionMiddleware(PermissionEnum.GENERATE_TESTS)
  },
  data() {
    return {
      pageNumber: 1,
      numberItemsPerPage: 21,
      totalNumberPages: 0
    }
  },
  computed: {
    ...mapState('testsService', ['ItemsQuestionsByCardsMemory'])
  },
  mounted() {
    this.fetchRecordData()
  },
  watch: {
    pageNumber() {
      this.fetchRecordData()
    }
  },
  methods: {
    ...mapActions('testsService', ['fetchACardMemory']),
    getTotalNumberPages(response) {
      return Math.ceil(response.data.meta.total / response.data.meta.per_page)
    },
    async fetchRecordData() {
      try {
        this.$loadingApp.enableLoadingProgressLinear()

        await this.fetchACardMemory({
          test_id: this.$route.params.id,
          config: {
            params: {
              'page[size]': this.numberItemsPerPage,
              'page[number]': this.pageNumber
            }
          }
        }).then((response) => {
          this.totalNumberPages = this.getTotalNumberPages(response)
        })

        this.$loadingApp.disabledLoadingProgressLinear()
      } catch (error) {
        //console.log(error)
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
