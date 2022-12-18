import selectOppositionByDatatable from '@/modules/tests/components/selectOppositionByDatatable'
import selectTopicsByDatatable from '@/modules/tests/components/selectTopicsByDatatable'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    FormNumberQuestionsRadioButtons: () => import(/* webpackChunkName: "FormNumberQuestionsRadioButtonsGenerateTest" */ '@/modules/tests/components/form/FormNumberQuestionsRadioButtons'),
    FormTypeTestRadioButtons: () => import(/* webpackChunkName: "FormTypeTestRadioButtonsGenerateTest" */ '@/modules/tests/components/form/FormTypeTestRadioButtons'),
    FormTopicGroupRadioButtons: () => import(/* webpackChunkName: "FormTopicGroupRadioButtonsGenerateTest" */ '@/modules/tests/components/form/FormTopicGroupRadioButtons'),
    selectOppositionByDatatable,
    selectTopicsByDatatable
  }
}
