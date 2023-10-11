<template>
  <v-card-text>
    <resource-header-crud-title
      v-if="subtopicData"
      :text-header="getNameCurrentSubtopic"
      :can-rendering-header="true"
    />
    <resource-header-crud-title
      v-if="questionData"
      :text-header="getNameCurrentQuestion"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-button-go-back-router :width-number-limit="300" :path-route-go-back="{ name: 'manage-questions-of-subtopic' }" />
      <resource-title-toolbar-datatable
        :width-limit-toolbar-title="420"
        title-text="Actualizar pregunta"
      />
      <resource-divider-title-datatable :width-limit-title-divider="620"/>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center">
        <resource-button-add :config-route="{ name: 'create-question-subtopic' }"/>
        <v-btn
          small
          color="light-blue darken-3"
          class="white--text mx-1 align-self-center"
          @click="fetchDataQuestionForClone"
        >
          <v-icon
            right
            dark
            class="mr-1"
          >
            mdi-refresh
          </v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-card-text>
      <validation-observer ref="FormCloneQuestion" v-slot="{ invalid }">
        <v-row dense>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <p class="font-weight-bold">La pregunta está en modo edición. Mientras esté en modo edición la pregunta no estará disponible para los Tests</p>
            <p class="font-weight-bold">Para salir del modo edición, solamente dar click a "actualizar" y listo</p>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="8"
            class="d-flex align-center"
          >
            <form-question-text-field
              ref="FormQuestionTextField"
              rules="required|max:65535"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="2"
            class="d-flex flex-column"
          >
            <form-question-type-test-checkbox
              ref="FormQuestionTypeTestCheckbox"
            />
            <form-question-type-card-memory-checkbox
              ref="FormQuestionTypeCardMemoryCheckbox"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="2"
            class="d-flex flex-column"
          >
            <form-question-is-visible-checkbox
              ref="FormQuestionIsVisibleCheckbox"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <v-divider class="grey lighten-2"></v-divider>
          </v-col>
          <v-col
            v-if="dataAnswersUuid.length > 0"
            cols="12"
            sm="12"
            md="12"
            lg="6"
            class="d-flex align-center"
          >
            <v-row dense>
              <v-col
                v-show="isTestQuestion"
                cols="12"
                sm="12"
                md="12"
                lg="12"
              >
                <v-container
                  class="px-0 d-flex justify-end"
                  fluid
                >
                  <v-switch
                    v-model="isQuestionBinary"
                    :label="`Es pregunta binaria: ${getLabelByQuestionBinary}`"
                  ></v-switch>
                </v-container>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
              >

                <div v-show="!isQuestionBinary">
                  <form-answer-field
                    ref="FormAnswerCorrectField"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[0]"
                    rules="required|max:65535"
                    vid="answer-correct"
                    name-field-validate="Respuesta correcta"
                    ref-text-field="answer-correct-field"
                    label="Respuesta correcta"
                    placeholder="Escribe la respuesta correcta"
                    :is-required-answer="!isQuestionBinary"
                    correct-answer
                    :forbidden-grouper-answer="!isTestQuestion"
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                  <!-- <v-divider class="my-3"/> -->
                  <form-answer-field
                    v-show="isTestQuestion"
                    ref="FormAnswerOneField"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[1]"
                    rules="required|max:65535"
                    vid="answer-one"
                    name-field-validate="Respuesta 1"
                    ref-text-field="answer-one-field"
                    label="Respuesta 1"
                    placeholder="Escribe la respuesta 1"
                    :is-required-answer="!isQuestionBinary && isTestQuestion"
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                  <form-answer-field
                    v-show="isTestQuestion"
                    ref="FormAnswerTwoField"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[2]"
                    rules="required|max:65535"
                    vid="answer-two"
                    name-field-validate="Respuesta 2"
                    ref-text-field="answer-two-field"
                    label="Respuesta 2"
                    placeholder="Escribe la respuesta 2"
                    :is-required-answer="!isQuestionBinary && isTestQuestion"
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                  <form-answer-field
                    v-show="isTestQuestion"
                    ref="FormAnswerThreeField"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[3]"
                    rules="required|max:65535"
                    vid="answer-three"
                    name-field-validate="Respuesta 3"
                    ref-text-field="answer-three-field"
                    label="Respuesta 3"
                    placeholder="Escribe la respuesta 3"
                    :is-required-answer="!isQuestionBinary && isTestQuestion"
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                </div>
                <div v-show="isQuestionBinary">
                  <form-answer-field
                    ref="FormAnswerCorrectFieldOfQuestionBinary"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[0]"
                    rules="required|max:65535"
                    vid="answer-correct-of-question-binary"
                    name-field-validate="Respuesta correcta"
                    ref-text-field="answer-correct-field-of-question-binary"
                    label="Respuesta correcta"
                    placeholder="Escribe la respuesta correcta"
                    correct-answer
                    :is-required-answer="isQuestionBinary"
                    forbidden-grouper-answer
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                  <!-- <v-divider class="my-3"/> -->
                  <form-answer-field
                    v-show="isTestQuestion"
                    ref="FormAnswerAnotherFieldOfQuestionBinary"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[1]"
                    rules="required|max:65535"
                    vid="another-answer-of-question-binary"
                    name-field-validate="Segunda alternativa"
                    ref-text-field="answer-another-field-of-question-binary"
                    label="Segunda alternativa"
                    placeholder="Escribe la segunda alternativa"
                    :is-required-answer="isQuestionBinary && isTestQuestion"
                    forbidden-grouper-answer
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                </div>
              </v-col>
            </v-row>
          </v-col>
          <!-- <v-divider
            vertical
          ></v-divider> -->
          <!-- -------------------------------- -->
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="6"
            class="d-flex align-center"
          >
            <v-row dense>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
              >
                <div v-if="reasonText" class="d-flex justify-space-around">
                  <v-checkbox
                    v-model="show_reason_text_in_test"
                    label="Mostrar en Test"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="show_reason_text_in_card_memory"
                    label="Mostrar en Tarjeta de memoria"
                  ></v-checkbox>
                </div>
                <form-reason-text-area
                  ref="FormReasonTextArea"
                  vid="reason-question"
                  name-field-validate="Explicación"
                  :has-reason-image="imageReason !== null"
                  :is-card-memory="isCardMemoryQuestion"
                  :is-there-image-question-clone="isThereImageQuestionClone"
                  @ReasonQuestionBinding="reasonText = $event"
                />
                <div v-if="imageReason || isThereImageQuestionClone" class="d-flex justify-space-around mt-4">
                  <v-checkbox
                    v-model="show_reason_image_in_test"
                    label="Mostrar en Test"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="show_reason_image_in_card_memory"
                    label="Mostrar en Tarjeta de memoria"
                  ></v-checkbox>
                </div>
                <form-add-question-image
                  ref="FormAddQuestionImage"
                  :is-card-memory="isCardMemoryQuestion"
                  @ImageBinding="imageReason = $event"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-center flex-column flex-sm-row"
          >
            <v-btn
              :loading="loadingButtonCloneQuestion"
              :disabled="disabledButtonCloneQuestion || invalid"
              color="light-blue darken-3"
              class="mt-3 white--text"
              @click="CreateQuestionApi"
            >
              <v-icon right dark class="mr-1"> mdi-database-refresh </v-icon>
              Crear
            </v-btn>
          </v-col>
        </v-row>
      </validation-observer>
    </v-card-text>
  </v-card-text>
</template>

<script>
import { mapActions } from 'vuex'
import FormQuestionTextField from '@/components/questions/form/FormQuestionTextField'
import FormQuestionTypeTestCheckbox from '@/components/questions/form/FormQuestionTypeTestCheckbox'
import FormQuestionTypeCardMemoryCheckbox from '@/components/questions/form/FormQuestionTypeCardMemoryCheckbox'
import FormReasonTextArea from '@/components/questions/form/FormReasonTextArea'
import FormAnswerField from '@/components/questions/form/FormAnswerField'
import FormAddQuestionImage from '@/components/questions/form/FormAddQuestionImage'
import FormQuestionIsVisibleCheckbox from '@/components/questions/form/FormQuestionIsVisibleCheckbox'

export default {
  components: {
    ResourceButtonAdd: () => import(/* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'),
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    FormQuestionTextField,
    FormQuestionTypeTestCheckbox,
    FormQuestionTypeCardMemoryCheckbox,
    FormQuestionIsVisibleCheckbox,
    FormReasonTextArea,
    FormAnswerField,
    FormAddQuestionImage
  },
  data () {
    return {
      //namesRelationshipsIncludeRequest: 'topics'
      subtopicData: null,
      questionData: null,
      loadingButtonCloneQuestion: false,
      disabledButtonCloneQuestion: false,
      isCardMemoryQuestion: false,
      removeImagenOfQuestion: false,
      show_reason_text_in_test: true,
      show_reason_text_in_card_memory: false,
      show_reason_image_in_test: true,
      show_reason_image_in_card_memory: false,
      isThereImageQuestionClone: false,
      imageReason: null,
      answerGrouperSelected: '',
      isQuestionBinary: false,
      isRequiredAnswer: false,
      reasonText: '',
      isTestQuestion: false
    }
  },
  computed: {
    getNameCurrentSubtopic() {
      return `Pregunta del Subtema: "${this.subtopicData?.attributes?.name}"`
    },
    getNameCurrentQuestion() {
      return `Pregunta: "${this.questionData?.data?.attributes['question-text']}"`
    },
    getClassAnswersField() {
      return {
        'd-flex': true,
        'justify-center': true,
        'flex-column': this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.md,
        'flex-row': this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl
      }
    },
    getLabelByQuestionBinary () {
      return this.isQuestionBinary ? 'Si' : 'No'
    },
    invalidComputedValidation () {
      return !(this.isCardMemoryQuestion || this.isTestQuestion)
    }
  },
  watch: {
    questionData (value) {
      this.setCloneModeQuestionApi(value.data.id, 'yes')
    }
  },
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
  methods: {
    ...mapActions('questionsSubtopicService', ['fetchQuestion','updateQuestion', 'setEditModeQuestion']),
    ...mapActions('questionsSubtopicService', ['createQuestion']),
    async CloneQuestionApi() {
      try {
        const FormDataQuestion = this.getFormDataForSaveQuestion()

        await this.CloneQuestion({
          subtopic_id: this.$route.params.subtopic_id,
          question_id: this.$route.params.question_id,
          data: FormDataQuestion,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'La pregunta ha sido actualizada con éxito.',
          timer: 10000
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCloneQuestion = false
        this.disabledButtonCloneQuestion = false

        this.$router.push({
          name: 'manage-questions-of-subtopic'
        })
        //this.ResetForm()
      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCloneQuestion = false
        this.disabledButtonCloneQuestion = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    },
    async fetchDataQuestionForClone() {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonCloneQuestion = true

        const response = await this.fetchQuestion({
          subtopic_id: this.$route.params.subtopic_id,
          question_id: this.$route.params.question_id,
          config: {
            params: {
              include: 'image,answers'
            }
          }
        })

        this.syncValuesForm(response)

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonCloneQuestion = false

      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonCloneQuestion = false
      }
    },
    async setCloneModeQuestionApi (question_id, isModeEdition) {
      try {
        const response = await this.setEditModeQuestion({
          question_id: question_id,
          data: {
            'is-mode-edition-question': isModeEdition
          },
          config: {}
        })
      } catch (error) {
        //console.log(error)
      }
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCloneQuestion']['setErrors'](errorResponse)
    },
    async ResetForm() {

      this.loadingButtonCloneQuestion = false
      this.disabledButtonCloneQuestion = false

      this.$refs['FormQuestionTextField'].question_text = ''
      this.$refs['FormQuestionTypeTestCheckbox'].is_test = ''
      this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory = ''
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible = ''
      this.$refs['FormAnswerCorrectField'].answer_value = ''
      this.$refs['FormAnswerCorrectField'].is_grouper_answer = ''
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible = ''
      this.$refs['FormAnswerOneField'].answer_value = ''
      this.$refs['FormAnswerOneField'].is_grouper_answer = ''
      this.$refs['FormAnswerTwoField'].answer_value = ''
      this.$refs['FormAnswerTwoField'].is_grouper_answer = ''
      this.$refs['FormAnswerThreeField'].answer_value = ''
      this.$refs['FormAnswerThreeField'].is_grouper_answer = ''
      this.$refs['FormReasonTextArea'].reason_value = ''
      this.$refs['FormAddQuestionImage'].image = null

      this.$nextTick(() => {
        this.$refs['FormCloneQuestion']['reset']()
      })

      return true
    },
    async CreateQuestionApi() {
      try {
        const FormDataQuestion = this.getFormDataForSaveQuestion()

        await this.createQuestion({
          subtopic_id: this.$route.params.subtopic_id,
          data: FormDataQuestion,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'La pregunta ha sido creada con éxito.',
          timer: 3000
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateQuestion = false
        this.disabledButtonCreateQuestion = false

        this.ResetForm()
      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateQuestion = false
        this.disabledButtonCreateQuestion = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    },
    async CreateQuestion() {

      const statusValidate = await this.$refs['FormCreateQuestion'].validate()

      if (!statusValidate) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, complete correctamente los campos del formulario.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })

        return
      }

      const isTest = this.$refs['FormQuestionTypeTestCheckbox'].is_test
      const isCardMemory = this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory
      const valueReasonText = this.$refs['FormReasonTextArea'].reason_value
      const valueReasonImage = this.$refs['FormAddQuestionImage'].image

      if (isCardMemory && !(valueReasonText || valueReasonImage)) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Las preguntas para Tarjetas de memoria, deben contener al menos una explicación en Texto o Imagen',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      if (!isTest && !isCardMemory) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'La pregunta debe ser para un Test o tarjeta de memoria',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      this.$loadingApp.enableLoadingProgressLinear()
      this.loadingButtonCreateQuestion = true
      this.disabledButtonCreateQuestion = true
      this.CreateQuestionApi()
    },
    async CloneQuestion() {

      const statusValidate = await this.$refs['FormCloneQuestion'].validate()

      if (!statusValidate) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, complete correctamente los campos del formulario.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })

        return
      }

      const isCardMemory = this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory
      const valueReasonText = this.$refs['FormReasonTextArea'].reason_value
      const valueReasonImage = this.$refs['FormAddQuestionImage'].image
      const hasImageQuestion = this.questionData.data.relationships.image !== null

      if (isCardMemory && !hasImageQuestion && !(valueReasonText || valueReasonImage)) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Las preguntas para Tarjetas de memoria, deben contener al menos una explicación en Texto o Imagen',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      this.$loadingApp.enableLoadingProgressLinear()
      this.loadingButtonCloneQuestion = true
      this.disabledButtonCloneQuestion = true
      this.CloneQuestionApi()
    },
    bindingCheckGroupAnswer({ value, uuid }) {
      if (!value) {
        this.answerGrouperSelected = ''

        return
      }

      this.answerGrouperSelected = uuid
    },
    generateUUID() {
      let d = new Date().getTime()

      let d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0

      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16

        if (d > 0) {

          r = (d + r) % 16 | 0
          d = Math.floor(d / 16)
        } else {
          r = (d2 + r) % 16 | 0
          d2 = Math.floor(d2 / 16)
        }

        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
      })
    },
    bindingIsTestState (isTest) {
      this.isTestQuestion = isTest
      this.show_reason_text_in_test = isTest
      this.show_reason_image_in_test = isTest
    },
    bindingIsCardMemoryState (isCardMemory) {
      this.isCardMemoryQuestion = isCardMemory
      this.show_reason_text_in_card_memory = isCardMemory
      this.show_reason_image_in_card_memory = isCardMemory
    },
    getFormDataForSaveQuestion () {
      const FormDataQuestion = new FormData()

      FormDataQuestion.append('remove-image-existing', 'no')
      FormDataQuestion.append('question-text', this.$refs['FormQuestionTextField'].question_text)
      FormDataQuestion.append('is-test', this.$refs['FormQuestionTypeTestCheckbox'].is_test)
      FormDataQuestion.append('is-card-memory', this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory)
      FormDataQuestion.append('is-visible', this.$refs['FormQuestionIsVisibleCheckbox'].is_visible)
      FormDataQuestion.append('reason-question', this.$refs['FormReasonTextArea'].reason_value)
      FormDataQuestion.append('file-reason', this.$refs['FormAddQuestionImage'].image)

      if (this.reasonText) {
        FormDataQuestion.append('show_reason_text_in_test', this.show_reason_text_in_test ? 'yes' : 'no')
        FormDataQuestion.append('show_reason_text_in_card_memory', this.show_reason_text_in_card_memory ? 'yes' : 'no')
      } else {
        FormDataQuestion.append('show_reason_text_in_test', 'no')
        FormDataQuestion.append('show_reason_text_in_card_memory', 'no')
      }

      if (this.imageReason || this.isThereImageQuestionClone) {
        FormDataQuestion.append('show_reason_image_in_test', this.show_reason_image_in_test ? 'yes' : 'no')
        FormDataQuestion.append('show_reason_image_in_card_memory', this.show_reason_image_in_card_memory ? 'yes' : 'no')
      } else {
        FormDataQuestion.append('show_reason_image_in_test', 'no')
        FormDataQuestion.append('show_reason_image_in_card_memory', 'no')
      }

      if (!this.isTestQuestion) {
        FormDataQuestion.append('answer-correct', this.$refs['FormAnswerCorrectField'].answer_value)
        FormDataQuestion.append('is-question-binary-alternatives', 'no')

        return FormDataQuestion
      }

      if (this.isQuestionBinary) {
        FormDataQuestion.append('answer-correct', this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_value)
        FormDataQuestion.append('another-answer-binary-alternative', this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value)
        FormDataQuestion.append('is-question-binary-alternatives', 'yes')

        return FormDataQuestion
      }

      FormDataQuestion.append('is-question-binary-alternatives', 'no')
      FormDataQuestion.append('answer-correct', this.$refs['FormAnswerCorrectField'].answer_value)
      FormDataQuestion.append('is-grouper-answer-correct', this.$refs['FormAnswerCorrectField'].is_grouper_answer)

      FormDataQuestion.append('answer-one', this.$refs['FormAnswerOneField'].answer_value)
      FormDataQuestion.append('is-grouper-answer-one', this.$refs['FormAnswerOneField'].is_grouper_answer)

      FormDataQuestion.append('answer-two', this.$refs['FormAnswerTwoField'].answer_value)
      FormDataQuestion.append('is-grouper-answer-two', this.$refs['FormAnswerTwoField'].is_grouper_answer)

      FormDataQuestion.append('answer-three', this.$refs['FormAnswerThreeField'].answer_value)
      FormDataQuestion.append('is-grouper-answer-three', this.$refs['FormAnswerThreeField'].is_grouper_answer)

      return FormDataQuestion
    },
    loadImageQuestion (relationships) {
      if (relationships.image) {
        const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
        const serverApiDevelopment = process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
        const serverApiProduction = process.env.VUE_APP_BASE_URL_API_PRODUCTION

        if (relationships.image.attributes.type_path === 'url') {
          this.$refs['FormAddQuestionImage'].urlImage = relationships.image.attributes.path
          this.$refs['FormAddQuestionImage'].previewImageForClone = true
          this.isThereImageQuestionClone = true
        }

        if (relationships.image.attributes.type_path === 'local') {
          this.$refs['FormAddQuestionImage'].urlImage = `${IsDevelopmentEnviroment ? serverApiDevelopment : serverApiProduction}${relationships.image.attributes.path}`
          this.$refs['FormAddQuestionImage'].previewImageForClone = true
          this.isThereImageQuestionClone = true
        }

      }
    },
    loadAnswersQuestion (dataAnswers, { isTest, isCardMemory, isQuestionBinary }) {

      const dataAnswersAlternativesNoCorrect = dataAnswers.filter((answer) => answer.attributes.is_correct_answer === 'no')
      const answerCorrect = dataAnswers.find((answer) => answer.attributes.is_correct_answer === 'yes')

      /* //console.log(dataAnswersAlternativesNoCorrect)
      //console.log(answerCorrect) */

      this.$refs['FormAnswerCorrectField'].answer_id = answerCorrect.id
      this.$refs['FormAnswerCorrectField'].answer_value = answerCorrect.attributes.answer_text
      this.$refs['FormAnswerCorrectField'].is_grouper_answer = answerCorrect.attributes.is_grouper_answer === 'yes'

      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_id = answerCorrect.id
      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_value = answerCorrect.attributes.answer_text
      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].is_grouper_answer = answerCorrect.attributes.is_grouper_answer === 'yes'

      if (!isTest && isCardMemory && !isQuestionBinary && answerCorrect) {
        console.info('Pregunta de tipo tarjeta de memoria')

        return
      }

      if (isTest && !isQuestionBinary) {
        console.info('Pregunta de tipo Test y pregunta de alternativas no binaria')

        if (dataAnswersAlternativesNoCorrect && dataAnswersAlternativesNoCorrect.length > 0) {

          this.$refs['FormAnswerOneField'].answer_id = dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerOneField'].answer_value = dataAnswersAlternativesNoCorrect[0].attributes.answer_text
          this.$refs['FormAnswerOneField'].is_grouper_answer = dataAnswersAlternativesNoCorrect[0].attributes.is_grouper_answer === 'yes'

          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_id = dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value = dataAnswersAlternativesNoCorrect[0].attributes.answer_text
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].is_grouper_answer = false

          this.$refs['FormAnswerTwoField'].answer_id = dataAnswersAlternativesNoCorrect[1].id
          this.$refs['FormAnswerTwoField'].answer_value = dataAnswersAlternativesNoCorrect[1].attributes.answer_text
          this.$refs['FormAnswerTwoField'].is_grouper_answer = dataAnswersAlternativesNoCorrect[1].attributes.is_grouper_answer === 'yes'

          this.$refs['FormAnswerThreeField'].answer_id = dataAnswersAlternativesNoCorrect[2].id
          this.$refs['FormAnswerThreeField'].answer_value = dataAnswersAlternativesNoCorrect[2].attributes.answer_text
          this.$refs['FormAnswerThreeField'].is_grouper_answer = dataAnswersAlternativesNoCorrect[2].attributes.is_grouper_answer === 'yes'
        }

        return
      }

      if (isTest && isQuestionBinary) {
        console.info('Pregunta de tipo Test y pregunta de alternativas binaria')

        if (dataAnswersAlternativesNoCorrect && dataAnswersAlternativesNoCorrect.length > 0) {
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_id = dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value = dataAnswersAlternativesNoCorrect[0].attributes.answer_text
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].is_grouper_answer = false

          this.$refs['FormAnswerOneField'].answer_id = dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerOneField'].answer_value = dataAnswersAlternativesNoCorrect[0].attributes.answer_text
          this.$refs['FormAnswerOneField'].is_grouper_answer = false
        }

        return
      }

      //console.log(dataAnswers)
      /* console.log({
        isTest,
        isCardMemory,
        isQuestionBinary
      }) */
    },
    syncValuesForm(response) {
      //console.log(response.data)

      this.loadingButtonCreateQuestion = false
      this.disabledButtonCreateQuestion = false

      const { attributes, relationships } = response.data.data
      const { topic } = response.data.meta

      this.$refs['FormQuestionTextField'].question_text = attributes['question-text']
      /* Consultar todo sobre el tipo de pregunta es */

      const ITS_CARD_MEMORY_BOOLEAN = attributes.its_for_card_memory === 'yes'
      const ITS_TEST_BOOLEAN = attributes.its_for_test === 'yes'
      const ITS_BINARY_QUESTION_BOOLEAN = attributes.is_question_binary_alternatives === 'yes'
      const ITS_VISABLE_QUESTION_BOOLEAN = attributes.is_visible === 'yes'

      const SHOW_REASON_TEXT_IN_TEST = attributes.show_reason_text_in_test === 'yes'
      const SHOW_REASON_TEXT_IN_CARD_MEMORY = attributes.show_reason_text_in_card_memory === 'yes'
      const SHOW_REASON_IMAGE_IN_TEST = attributes.show_reason_image_in_test === 'yes'
      const SHOW_REASON_IMAGE_IN_CARD_MEMORY = attributes.show_reason_image_in_card_memory === 'yes'

      this.show_reason_text_in_test = SHOW_REASON_TEXT_IN_TEST
      this.show_reason_text_in_card_memory = SHOW_REASON_TEXT_IN_CARD_MEMORY
      this.show_reason_image_in_test = SHOW_REASON_IMAGE_IN_TEST
      this.show_reason_image_in_card_memory = SHOW_REASON_IMAGE_IN_CARD_MEMORY

      this.questionData = response.data
      this.topicData = topic

      this.isCardMemoryQuestion = ITS_CARD_MEMORY_BOOLEAN
      this.isTestQuestion = ITS_TEST_BOOLEAN
      this.isQuestionBinary = ITS_BINARY_QUESTION_BOOLEAN

      this.$refs['FormQuestionTypeTestCheckbox'].is_test = ITS_TEST_BOOLEAN
      this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory = ITS_CARD_MEMORY_BOOLEAN
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible = ITS_VISABLE_QUESTION_BOOLEAN

      this.answerGrouperSelected = ''

      this.$refs['FormReasonTextArea'].reason_value = attributes['reason-text']
      this.reasonText = attributes['reason-text']

      this.loadAnswersQuestion(relationships.answers.data, {
        isTest: ITS_TEST_BOOLEAN,
        isCardMemory: ITS_CARD_MEMORY_BOOLEAN,
        isQuestionBinary: ITS_BINARY_QUESTION_BOOLEAN
      })
      this.loadImageQuestion(relationships)

    }
  },
  head: {
    title: {
      inner: 'Copiar pregunta subtema'
    }
  }
}
</script>
