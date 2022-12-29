<template>
  <v-expansion-panels focusable>
    <v-expansion-panel>
      <v-expansion-panel-header color="blue-grey lighten-5" expand-icon="mdi-menu-down"><span class="font-weight-black">Explicación: </span>{{ question.attributes['question-text'] }}</v-expansion-panel-header>
      <v-expansion-panel-content>
        <p class="mt-2 mb-3 font-weight-bold mx-auto d-flex justify-center"><span>{{ question.attributes['reason-text'] }}</span></p>
        <div v-if="pathImageQuestion" class="d-flex justify-center">
          <v-img
            contain
            max-width="150"
            :src="pathImageQuestion"
            @error="loadImageProfileDefault"
          ></v-img>
        </div>
        <!-- <div class="d-flex justify-center mt-3">
          <claim-question-card-memory :question-uuid="question.id" />
        </div> -->
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: 'ReasonQuestionHistoryTest',
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
  mounted () {
    this.loadImageQuestion()
  },
  methods: {
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
