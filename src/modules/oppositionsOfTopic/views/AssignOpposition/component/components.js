import selectSubtopicsByDatatable from '@/modules/oppositionsOfTopic/components/selectSubtopicsByDatatable'
import selectOppositionByDatatable from '@/modules/oppositionsOfTopic/components/selectOppositionByDatatable'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    selectSubtopicsByDatatable,
    selectOppositionByDatatable
  }
}
