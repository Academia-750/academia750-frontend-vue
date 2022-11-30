import { mapActions } from 'vuex'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable')
  },
  data () {
    return {
      searchWord: '',
      openTreeviews: [],
      syllabus: [],
      opposition: null
    }
  },
  mounted () {
    //console.log(this.$route.params.id)
    this.fetchSyllabusOppositionApi()
  },
  methods: {
    ...mapActions('oppositionsService', ['fetchSyllabusOpposition']),
    async fetchSyllabusOppositionApi () {
      try {
        this.syllabus = []
        this.$loadingApp.enableLoadingProgressLinear()

        const response = await this.fetchSyllabusOpposition({
          id: this.$route.params.id
        })

        this.opposition = response.data.opposition.data
        this.mapItemsSyllabus(response)
        this.openTreeviews = []
        this.searchWord = ''
        this.$loadingApp.disabledLoadingProgressLinear()
      } catch (error) {
        this.openTreeviews = []
        this.searchWord = ''
        this.syllabus = []
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
      }
    },
    mapItemsSyllabus (response) {
      const ICON_TOPIC = 'mdi-file-document-multiple'
      const ICON_SUBTOPIC = 'mdi-text-box-multiple-outline'

      this.syllabus = response.data.opposition.items.map( (item) => {
        return {
          id: item.topic.id,
          name: item.topic.name,
          icon: ICON_TOPIC,
          children: item.subtopics.map( (item) => {
            return {
              id: item.id,
              name: item.name,
              icon: ICON_SUBTOPIC
            }
          } )
        }
      })
    }
  },
  head: {
    title: {
      inner: 'Temario de Oposicion'
    }
  }
}
