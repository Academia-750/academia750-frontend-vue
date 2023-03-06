<template>
  <v-expansion-panels focusable>
    <v-expansion-panel class="blue-grey lighten-5">
      <v-expansion-panel-header color="blue-grey lighten-5" expand-icon="mdi-menu-down">{{ questionWithAnswers.attributes['question-text'] }}</v-expansion-panel-header>
      <v-expansion-panel-content class="blue-grey lighten-5">
        <p v-if="getAnswerCorrect" class="blue-grey lighten-5 white--text green--text text--darken-3 mt-2 mb-3 font-weight-bold">{{ getAnswerCorrect?.attributes.answer_text }}</p>
        <v-divider class="grey lighten-3"></v-divider>
        <p v-if="getAnswerCorrect && questionWithAnswers.attributes.show_reason_text_in_card_memory === 'yes' && questionWithAnswers.attributes['reason-text']" class="mt-2 mb-3 font-weight-bold blue-grey lighten-5">{{ questionWithAnswers.attributes['reason-text'] }}</p>
        <div v-if="pathImageQuestion && questionWithAnswers.attributes.show_reason_image_in_card_memory === 'yes'" class="d-flex justify-center blue-grey lighten-5">
          <v-img
            contain
            max-width="150"
            :src="pathImageQuestion"
            @error="loadImageProfileDefault"
            @click="showReasonImageDialogMethod"
          ></v-img>
          <show-reason-image-in-dialog ref="ShowReasonImageInDialogComponent" :path-image="pathImageQuestion"/>
        </div>
        <div class="d-flex justify-center mt-3">
          <claim-question-card-memory :question-uuid="questionWithAnswers.id" />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import ClaimQuestionCardMemory from './ClaimQuestionCardMemory'
import ShowReasonImageInDialog from '@/modules/tests/components/HistoryTest/Dialog/ShowReasonImageInDialog'

export default {
  name: 'CardMemoryItem',
  components: {
    ClaimQuestionCardMemory,
    ShowReasonImageInDialog
  },
  props: {
    questionWithAnswers: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      pathImageQuestion: null
    }
  },
  computed: {
    getAnswerCorrect () {
      return this.questionWithAnswers.relationships.answers.data.find((answer) => answer.attributes.is_correct_answer === 'yes')
    }
  },
  watch: {
    questionWithAnswers (value) {
      //console.log(value)
      this.loadImageQuestion()
    }
  },
  mounted () {
    this.loadImageQuestion()
  },
  methods: {
    showReasonImageDialogMethod () {
      this.$refs['ShowReasonImageInDialogComponent'].showReasonImageInDialog = true
    },
    loadImageProfileDefault () {
      console.error('No se ha podido cargar la imagen de la pregunta')
      this.pathImageQuestion = null
    },
    loadImageQuestion () {

      const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
      const serverApiDevelopment = process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
      const serverApiProduction = process.env.VUE_APP_BASE_URL_API_PRODUCTION
      const { image } = this.questionWithAnswers.relationships

      if (!image) {
        console.error('No se pudo cargar la imagen de la pregunta de la API')
        this.pathImageQuestion = null

        return
      }

      if (image.attributes.type_path === 'url') {
        this.pathImageQuestion = image.attributes.path

        return
      }

      if (image.attributes.type_path === 'local') {
        this.pathImageQuestion = `${IsDevelopmentEnviroment ? serverApiDevelopment : serverApiProduction}${image.attributes.path}`

        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
