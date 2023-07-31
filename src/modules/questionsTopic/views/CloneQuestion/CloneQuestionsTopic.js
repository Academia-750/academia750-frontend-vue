import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import computed from './component/computed'
import ActionsMethods from './component/ActionsMethods'
import QuestionsMixin from '@/mixins/Questions'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'

const MIXINS_COMPONENT = [
  components,
  data,
  methods,
  computed,
  ActionsMethods
]

const MIXINS_ADDITIONAL = [
  componentButtonsCrud,
  QuestionsMixin
]

export default {
  mixins: [...MIXINS_COMPONENT, ...MIXINS_ADDITIONAL],
  mounted() {
    this.fetchDataQuestionForClone()
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  beforeDestroy () {
    this.setCloneModeQuestionApi(this.questionData.data.id, 'no')
  },
  created () {
    this.dataAnswersUuid = [
      this.generateUUID(),
      this.generateUUID(),
      this.generateUUID(),
      this.generateUUID()
    ]
  },
  watch: {
    questionData (value) {
      this.setCloneModeQuestionApi(value.data.id, 'yes')
    }
  },
  head: {
    title: {
      inner: 'Crear pregunta para tema'
    }
  }
}
