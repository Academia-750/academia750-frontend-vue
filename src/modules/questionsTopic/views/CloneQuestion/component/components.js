import FormQuestionTextField from '@/components/questions/form/FormQuestionTextField'
import FormQuestionTypeTestCheckbox from '@/components/questions/form/FormQuestionTypeTestCheckbox'
import FormQuestionTypeCardMemoryCheckbox from '@/components/questions/form/FormQuestionTypeCardMemoryCheckbox'
import FormReasonTextArea from '@/components/questions/form/FormReasonTextArea'
import FormAnswerField from '@/components/questions/form/FormAnswerField'
import FormAddQuestionImage from '@/components/questions/form/FormAddQuestionImage'
import FormQuestionIsVisibleCheckbox from '@/components/questions/form/FormQuestionIsVisibleCheckbox'

const components = {
  FormQuestionTextField,
  FormQuestionTypeTestCheckbox,
  FormQuestionTypeCardMemoryCheckbox,
  FormQuestionIsVisibleCheckbox,
  FormReasonTextArea,
  FormAnswerField,
  FormAddQuestionImage,
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
}

export default {
  components
}
