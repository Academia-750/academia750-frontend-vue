import selectOppositionByDatatable from '@/modules/tests/components/selectOppositionByDatatable'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    FormNumberQuestionsRadioButtons: () => import(/* webpackChunkName: "FormNumberQuestionsRadioButtonsGenerateTest" */ '@/modules/tests/components/form/FormNumberQuestionsRadioButtons'),
    selectOppositionByDatatable
  }
}
