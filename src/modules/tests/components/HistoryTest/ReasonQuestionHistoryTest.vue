<template>
  <v-expansion-panels v-if="showSectionReasonQuestion" focusable>
    <v-expansion-panel>
      <v-expansion-panel-header color="blue-grey lighten-5" expand-icon="mdi-menu-down"><span class="font-weight-black">Explicación: </span>
        <span class="ml-3">{{ question.attributes['question-text'] }}</span></v-expansion-panel-header>
      <v-expansion-panel-content>
        <p v-if="question.attributes.show_reason_text_in_test === 'yes' && question.attributes['reason-text']" class="mt-2 mb-3 font-weight-bold mx-auto d-flex justify-center"><span>{{ question.attributes['reason-text'] }}</span></p>
        <div v-if="pathImageQuestion && question.attributes.show_reason_image_in_test === 'yes'" class="d-flex justify-center">
          <v-img
            contain
            max-width="150"
            :src="pathImageQuestion"
            @error="loadImageProfileDefault"
            @click="showReasonImageDialogMethod"
          ></v-img>
          <show-reason-image-in-dialog ref="ShowReasonImageInDialogComponent" :path-image="pathImageQuestion"/>
        </div>
        <!-- <div class="d-flex justify-center mt-3">
          <claim-question-card-memory :question-uuid="question.id" />
        </div> -->
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import ShowReasonImageInDialog from './Dialog/ShowReasonImageInDialog'

export default {
  name: 'ReasonQuestionHistoryTest',
  components: {
    ShowReasonImageInDialog
  },
  props: {
    question: {
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
    showSectionReasonQuestion () {

      const { show_reason_text_in_test, show_reason_image_in_test } = this.question.attributes

      return (!(this.question.attributes['reason-text'] && show_reason_text_in_test === 'yes') !== true ||
      !(this.pathImageQuestion && show_reason_image_in_test === 'yes') !== true)
    },
    hasReasonTextQuestion () {
      return this.question.attributes['reason-text'] !== null || this.question.attributes['reason-text'] !== ''
    }
  },
  mounted () {
    this.loadImageQuestion()
    /* console.log({
      question : this.question.attributes['question-text'],
      reason : this.question.attributes['reason-text'],
      pathImageQuestion: this.pathImageQuestion,
      show_reason_text: this.question.attributes.show_reason_text_in_test,
      show_reason_image: this.question.attributes.show_reason_image_in_test
    }) */

    const { show_reason_text_in_test, show_reason_image_in_test } = this.question.attributes

    /* (!(this.question.attributes['reason-text'] && show_reason_text_in_test === 'yes') !== true ||
    !(this.pathImageQuestion && show_reason_image_in_test === 'yes') !== true) */

    //console.log(!(this.question.attributes['reason-text'] && show_reason_text_in_test === 'yes') !== true)
    //console.log(!(this.pathImageQuestion && show_reason_image_in_test === 'yes') !== true)

    /* console.log(
      (!(this.question.attributes['reason-text'] && show_reason_text_in_test === 'yes') !== true ||
    !(this.pathImageQuestion && show_reason_image_in_test === 'yes') !== true)) */
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
      const { image } = this.question.relationships

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
