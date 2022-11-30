import selectSubtopicsByDatatable from '@/modules/oppositionsOfTopic/components/selectSubtopicsByDatatable'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    FormFieldNameOpposition: () => import(/* webpackChunkName: "FormFieldNameOpposition" */ '@/modules/oppositions/components/form/FormFieldNameOpposition.vue'),
    FormFieldPeriodOpposition: () => import(/* webpackChunkName: "FormFieldPeriodOpposition" */ '@/modules/oppositions/components/form/FormFieldPeriodOpposition.vue'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    ResourceButtonAdd: () => import(/* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'),
    selectSubtopicsByDatatable
  }
}
