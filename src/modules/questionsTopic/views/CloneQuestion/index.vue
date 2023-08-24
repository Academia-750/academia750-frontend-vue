<template>
  <v-card-text>
    <resource-header-crud-title
      v-if="topicData"
      :text-header="getNameCurrentTopic"
      :can-rendering-header="true"
    />
    <resource-header-crud-title
      v-if="questionData"
      :text-header="getNameCurrentQuestion"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-button-go-back-router
        :width-number-limit="300"
        :path-route-go-back="{ name: 'manage-questions-of-topic' }"
      />
      <resource-title-toolbar-datatable
        :width-limit-toolbar-title="420"
        title-text="Actualizar pregunta"
      />
      <resource-divider-title-datatable :width-limit-title-divider="620" />
      <v-spacer></v-spacer>
      <div class="d-flex justify-center">
        <resource-button-add
          :config-route="{ name: 'create-question-topic' }"
        />
      </div>
    </v-toolbar>
    <v-card-text>
      <validation-observer ref="FormCreateQuestion" v-slot="{ invalid }">
        <v-row dense>
          <v-col cols="12" sm="12" md="12" lg="8" class="d-flex align-center">
            <FormQuestionTextField
              ref="FormQuestionTextField"
              rules="required|max:65535"
            />
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="2" class="d-flex flex-column">
            <form-question-type-test-checkbox
              ref="FormQuestionTypeTestCheckbox"
            />
            <form-question-type-card-memory-checkbox
              ref="FormQuestionTypeCardMemoryCheckbox"
            />
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="2" class="d-flex flex-column">
            <form-question-is-visible-checkbox
              ref="FormQuestionIsVisibleCheckbox"
            />
          </v-col>
          <v-col cols="12" sm="12" md="12" lg="12">
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
              <v-col v-show="isTestQuestion" cols="12" sm="12" md="12" lg="12">
                <v-container class="px-0 d-flex justify-end" fluid>
                  <v-switch
                    v-model="isQuestionBinary"
                    :label="`Es pregunta binaria: ${getLabelByQuestionBinary}`"
                  ></v-switch>
                </v-container>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="12">
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
          <v-col cols="12" sm="12" md="12" lg="6" class="d-flex align-center">
            <v-row dense>
              <v-col cols="12" sm="12" md="12" lg="12">
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
                  :is-there-image-question-update="isThereImageQuestionUpdate"
                  @ReasonQuestionBinding="reasonText = $event"
                />
                <div
                  v-if="imageReason || isThereImageQuestionUpdate"
                  class="d-flex justify-space-around mt-4"
                >
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
              @click="CloneQuestionApi"
            >
              <v-icon right dark class="mr-1"> mdi-database-plus </v-icon>
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

export default {
  components: {
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      ),
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'
      ),
    ResourceTitleToolbarDatatable: () =>
      import(
        /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
      ),
    ResourceDividerTitleDatatable: () =>
      import(
        /* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'
      ),
    ResourceHeaderCrudTitle: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'
      ),
    FormQuestionTextField: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/components/questions/form/FormQuestionTextField'
      ),
    FormQuestionTypeTestCheckbox: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/components/questions/form/FormQuestionTypeTestCheckbox'
      ),
    FormQuestionTypeCardMemoryCheckbox: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/components/questions/form/FormQuestionTypeCardMemoryCheckbox'
      ),
    FormReasonTextArea: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/components/questions/form/FormReasonTextArea'
      ),
    FormAnswerField: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/components/questions/form/FormAnswerField'
      ),
    FormAddQuestionImage: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/components/questions/form/FormAddQuestionImage'
      ),
    FormQuestionIsVisibleCheckbox: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/components/questions/form/FormQuestionIsVisibleCheckbox'
      )
  },
  data() {
    return {
      //namesRelationshipsIncludeRequest: 'topics'
      topicData: null,
      questionData: null,
      loadingButtonCloneQuestion: false,
      disabledButtonCloneQuestion: false,
      removeImagenOfQuestion: false,
      show_reason_text_in_test: true,
      show_reason_text_in_card_memory: false,
      show_reason_image_in_test: true,
      show_reason_image_in_card_memory: false,
      isThereImageQuestionUpdate: false,
      isCardMemoryQuestion: false,
      isTestQuestion: true,
      answerGrouperSelected: '',
      dataAnswersUuid: [],
      isQuestionBinary: false,
      imageReason: null,
      reasonText: null
    }
  },
  computed: {
    getNameCurrentTopic() {
      return `Pregunta del Tema: "${this.topicData?.attributes?.name}"`
    },
    getNameCurrentQuestion() {
      return `Pregunta: "${this.questionData?.data?.attributes['question-text']}"`
    },
    getClassAnswersField() {
      return {
        'd-flex': true,
        'justify-center': true,
        'flex-column':
          this.$vuetify.breakpoint.xs ||
          this.$vuetify.breakpoint.sm ||
          this.$vuetify.breakpoint.md,
        'flex-row': this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl
      }
    },
    getLabelByQuestionBinary() {
      return this.isQuestionBinary ? 'Si' : 'No'
    },
    invalidComputedValidation() {
      return !(this.isCardMemoryQuestion || this.isTestQuestion)
    }
  },

  mounted() {
    this.fetchDataQuestionForClone()
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },

  created() {
    this.dataAnswersUuid = [
      this.generateUUID(),
      this.generateUUID(),
      this.generateUUID(),
      this.generateUUID()
    ]
  },
  methods: {
    ...mapActions('questionsTopicService', ['fetchQuestion', 'createQuestion']),
    async CloneQuestionApi() {
      try {
        const FormDataQuestion = this.getFormDataForSaveQuestion()

        await this.createQuestion({
          topic_id: this.$route.params.id,
          data: FormDataQuestion,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'La pregunta ha sido creada con éxito.',
          timer: 10000
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateQuestion = false
        this.disabledButtonCreateQuestion = false

        this.ResetForm()
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateQuestion = false
        this.disabledButtonCreateQuestion = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title:
              'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
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
        this.disabledButtonCreateQuestion = true

        const response = await this.fetchQuestion({
          topic_id: this.$route.params.id,
          question_id: this.$route.params.question_id,
          config: {
            params: {
              include: 'image,answers'
            }
          }
        })

        this.syncValuesForm(response)

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonCreateQuestion = false
      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonCreateQuestion = false
      }
    },

    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateQuestion']['setErrors'](errorResponse)
    },
    bindingCheckGroupAnswer({ value, uuid }) {
      if (!value) {
        this.answerGrouperSelected = ''

        return
      }

      this.answerGrouperSelected = uuid
    },
    async ResetForm() {
      this.loadingButtonCloneQuestion = false
      this.disabledButtonCloneQuestion = false

      this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value = ''

      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_value = ''

      this.$refs['FormQuestionTextField'].question_text = ''
      this.$refs['FormQuestionTypeTestCheckbox'].is_test = true
      this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory = false
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible = true
      this.$refs['FormAnswerCorrectField'].answer_value = ''
      this.$refs['FormAnswerCorrectField'].is_grouper_answer = ''
      this.$refs['FormAnswerOneField'].answer_value = ''
      this.$refs['FormAnswerOneField'].is_grouper_answer = ''
      this.$refs['FormAnswerTwoField'].answer_value = ''
      this.$refs['FormAnswerTwoField'].is_grouper_answer = ''
      this.$refs['FormAnswerThreeField'].answer_value = ''
      this.$refs['FormAnswerThreeField'].is_grouper_answer = ''
      this.$refs['FormReasonTextArea'].reason_value = ''
      this.$refs['FormAddQuestionImage'].image = null

      this.dataAnswersUuid = [
        this.generateUUID(),
        this.generateUUID(),
        this.generateUUID(),
        this.generateUUID()
      ]

      this.isCardMemoryQuestion = false
      this.isTestQuestion = true
      this.answerGrouperSelected = ''

      this.isQuestionBinary = false
      this.imageReason = null

      this.$nextTick(() => {
        this.$refs['FormCreateQuestion']['reset']()
      })

      return true
    },
    generateUUID() {
      let d = new Date().getTime()

      let d2 =
        (typeof performance !== 'undefined' &&
          performance.now &&
          performance.now() * 1000) ||
        0

      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16

        if (d > 0) {
          r = (d + r) % 16 | 0
          d = Math.floor(d / 16)
        } else {
          r = (d2 + r) % 16 | 0
          d2 = Math.floor(d2 / 16)
        }

        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })
    },
    bindingIsTestState(isTest) {
      this.isTestQuestion = isTest
      this.show_reason_text_in_test = isTest
      this.show_reason_image_in_test = isTest
    },
    bindingIsCardMemoryState(isCardMemory) {
      this.isCardMemoryQuestion = isCardMemory
      this.show_reason_text_in_card_memory = isCardMemory
      this.show_reason_image_in_card_memory = isCardMemory
    },
    getFormDataForSaveQuestion() {
      const FormDataQuestion = new FormData()

      FormDataQuestion.append('remove-image-existing', 'no')
      FormDataQuestion.append(
        'question-text',
        this.$refs['FormQuestionTextField'].question_text
      )
      FormDataQuestion.append(
        'is-test',
        this.$refs['FormQuestionTypeTestCheckbox'].is_test
      )
      FormDataQuestion.append(
        'is-card-memory',
        this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory
      )
      FormDataQuestion.append(
        'is-visible',
        this.$refs['FormQuestionIsVisibleCheckbox'].is_visible
      )
      FormDataQuestion.append(
        'reason-question',
        this.$refs['FormReasonTextArea'].reason_value
      )
      FormDataQuestion.append(
        'file-reason',
        this.$refs['FormAddQuestionImage'].image
      )

      if (this.reasonText) {
        FormDataQuestion.append(
          'show_reason_text_in_test',
          this.show_reason_text_in_test ? 'yes' : 'no'
        )
        FormDataQuestion.append(
          'show_reason_text_in_card_memory',
          this.show_reason_text_in_card_memory ? 'yes' : 'no'
        )
      } else {
        FormDataQuestion.append('show_reason_text_in_test', 'no')
        FormDataQuestion.append('show_reason_text_in_card_memory', 'no')
      }

      if (this.imageReason || this.isThereImageQuestionUpdate) {
        FormDataQuestion.append(
          'show_reason_image_in_test',
          this.show_reason_image_in_test ? 'yes' : 'no'
        )
        FormDataQuestion.append(
          'show_reason_image_in_card_memory',
          this.show_reason_image_in_card_memory ? 'yes' : 'no'
        )
      } else {
        FormDataQuestion.append('show_reason_image_in_test', 'no')
        FormDataQuestion.append('show_reason_image_in_card_memory', 'no')
      }

      if (!this.isTestQuestion) {
        FormDataQuestion.append(
          'answer-correct',
          this.$refs['FormAnswerCorrectField'].answer_value
        )
        FormDataQuestion.append('is-question-binary-alternatives', 'no')

        return FormDataQuestion
      }

      if (this.isQuestionBinary) {
        FormDataQuestion.append(
          'answer-correct',
          this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_value
        )
        FormDataQuestion.append(
          'another-answer-binary-alternative',
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value
        )
        FormDataQuestion.append('is-question-binary-alternatives', 'yes')

        return FormDataQuestion
      }

      FormDataQuestion.append('is-question-binary-alternatives', 'no')
      FormDataQuestion.append(
        'answer-correct',
        this.$refs['FormAnswerCorrectField'].answer_value
      )
      FormDataQuestion.append(
        'is-grouper-answer-correct',
        this.$refs['FormAnswerCorrectField'].is_grouper_answer
      )

      FormDataQuestion.append(
        'answer-one',
        this.$refs['FormAnswerOneField'].answer_value
      )
      FormDataQuestion.append(
        'is-grouper-answer-one',
        this.$refs['FormAnswerOneField'].is_grouper_answer
      )

      FormDataQuestion.append(
        'answer-two',
        this.$refs['FormAnswerTwoField'].answer_value
      )
      FormDataQuestion.append(
        'is-grouper-answer-two',
        this.$refs['FormAnswerTwoField'].is_grouper_answer
      )

      FormDataQuestion.append(
        'answer-three',
        this.$refs['FormAnswerThreeField'].answer_value
      )
      FormDataQuestion.append(
        'is-grouper-answer-three',
        this.$refs['FormAnswerThreeField'].is_grouper_answer
      )

      return FormDataQuestion
    },
    loadImageQuestion(relationships) {
      if (relationships.image) {
        const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
        const serverApiDevelopment =
          process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
        const serverApiProduction = process.env.VUE_APP_BASE_URL_API_PRODUCTION

        if (relationships.image.attributes.type_path === 'url') {
          this.$refs['FormAddQuestionImage'].urlImage =
            relationships.image.attributes.path
          this.$refs['FormAddQuestionImage'].previewImageForUpdate = true
          this.isThereImageQuestionUpdate = true
        }

        if (relationships.image.attributes.type_path === 'local') {
          this.$refs['FormAddQuestionImage'].urlImage = `${
            IsDevelopmentEnviroment ? serverApiDevelopment : serverApiProduction
          }${relationships.image.attributes.path}`
          this.$refs['FormAddQuestionImage'].previewImageForUpdate = true
          this.isThereImageQuestionUpdate = true
        }
      }
    },
    loadAnswersQuestion(
      dataAnswers,
      { isTest, isCardMemory, isQuestionBinary }
    ) {
      const dataAnswersAlternativesNoCorrect = dataAnswers.filter(
        (answer) => answer.attributes.is_correct_answer === 'no'
      )
      const answerCorrect = dataAnswers.find(
        (answer) => answer.attributes.is_correct_answer === 'yes'
      )

      /* //console.log(dataAnswersAlternativesNoCorrect)
      //console.log(answerCorrect) */

      this.$refs['FormAnswerCorrectField'].answer_id = answerCorrect.id
      this.$refs['FormAnswerCorrectField'].answer_value =
        answerCorrect.attributes.answer_text
      this.$refs['FormAnswerCorrectField'].is_grouper_answer =
        answerCorrect.attributes.is_grouper_answer === 'yes'

      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_id =
        answerCorrect.id
      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].answer_value =
        answerCorrect.attributes.answer_text
      this.$refs['FormAnswerCorrectFieldOfQuestionBinary'].is_grouper_answer =
        answerCorrect.attributes.is_grouper_answer === 'yes'

      if (!isTest && isCardMemory && !isQuestionBinary && answerCorrect) {
        console.info('Pregunta de tipo tarjeta de memoria')

        return
      }

      if (isTest && !isQuestionBinary) {
        console.info(
          'Pregunta de tipo Test y pregunta de alternativas no binaria'
        )

        if (
          dataAnswersAlternativesNoCorrect &&
          dataAnswersAlternativesNoCorrect.length > 0
        ) {
          this.$refs['FormAnswerOneField'].answer_id =
            dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerOneField'].answer_value =
            dataAnswersAlternativesNoCorrect[0].attributes.answer_text
          this.$refs['FormAnswerOneField'].is_grouper_answer =
            dataAnswersAlternativesNoCorrect[0].attributes.is_grouper_answer ===
            'yes'

          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_id =
            dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value =
            dataAnswersAlternativesNoCorrect[0].attributes.answer_text
          this.$refs[
            'FormAnswerAnotherFieldOfQuestionBinary'
          ].is_grouper_answer = false

          this.$refs['FormAnswerTwoField'].answer_id =
            dataAnswersAlternativesNoCorrect[1].id
          this.$refs['FormAnswerTwoField'].answer_value =
            dataAnswersAlternativesNoCorrect[1].attributes.answer_text
          this.$refs['FormAnswerTwoField'].is_grouper_answer =
            dataAnswersAlternativesNoCorrect[1].attributes.is_grouper_answer ===
            'yes'

          this.$refs['FormAnswerThreeField'].answer_id =
            dataAnswersAlternativesNoCorrect[2].id
          this.$refs['FormAnswerThreeField'].answer_value =
            dataAnswersAlternativesNoCorrect[2].attributes.answer_text
          this.$refs['FormAnswerThreeField'].is_grouper_answer =
            dataAnswersAlternativesNoCorrect[2].attributes.is_grouper_answer ===
            'yes'
        }

        return
      }

      if (isTest && isQuestionBinary) {
        console.info('Pregunta de tipo Test y pregunta de alternativas binaria')

        if (
          dataAnswersAlternativesNoCorrect &&
          dataAnswersAlternativesNoCorrect.length > 0
        ) {
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_id =
            dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerAnotherFieldOfQuestionBinary'].answer_value =
            dataAnswersAlternativesNoCorrect[0].attributes.answer_text
          this.$refs[
            'FormAnswerAnotherFieldOfQuestionBinary'
          ].is_grouper_answer = false

          this.$refs['FormAnswerOneField'].answer_id =
            dataAnswersAlternativesNoCorrect[0].id
          this.$refs['FormAnswerOneField'].answer_value =
            dataAnswersAlternativesNoCorrect[0].attributes.answer_text
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
      ////console.log(response.data)

      this.loadingButtonCreateQuestion = false
      this.disabledButtonCreateQuestion = false

      const { attributes, relationships } = response.data.data
      const { topic } = response.data.meta

      this.$refs['FormQuestionTextField'].question_text =
        attributes['question-text']

      /* Consultar todo sobre el tipo de pregunta es */

      const ITS_CARD_MEMORY_BOOLEAN = attributes.its_for_card_memory === 'yes'
      const ITS_TEST_BOOLEAN = attributes.its_for_test === 'yes'
      const ITS_BINARY_QUESTION_BOOLEAN =
        attributes.is_question_binary_alternatives === 'yes'
      const ITS_VISABLE_QUESTION_BOOLEAN = attributes.is_visible === 'yes'

      const SHOW_REASON_TEXT_IN_TEST =
        attributes.show_reason_text_in_test === 'yes'
      const SHOW_REASON_TEXT_IN_CARD_MEMORY =
        attributes.show_reason_text_in_card_memory === 'yes'
      const SHOW_REASON_IMAGE_IN_TEST =
        attributes.show_reason_image_in_test === 'yes'
      const SHOW_REASON_IMAGE_IN_CARD_MEMORY =
        attributes.show_reason_image_in_card_memory === 'yes'

      this.questionData = response.data
      this.topicData = topic

      this.isCardMemoryQuestion = ITS_CARD_MEMORY_BOOLEAN
      this.isTestQuestion = ITS_TEST_BOOLEAN
      this.isQuestionBinary = ITS_BINARY_QUESTION_BOOLEAN

      this.$refs['FormQuestionTypeTestCheckbox'].is_test = ITS_TEST_BOOLEAN
      this.$refs['FormQuestionTypeCardMemoryCheckbox'].is_card_memory =
        ITS_CARD_MEMORY_BOOLEAN
      this.$refs['FormQuestionIsVisibleCheckbox'].is_visible =
        ITS_VISABLE_QUESTION_BOOLEAN

      this.show_reason_text_in_test = SHOW_REASON_TEXT_IN_TEST
      this.show_reason_text_in_card_memory = SHOW_REASON_TEXT_IN_CARD_MEMORY
      this.show_reason_image_in_test = SHOW_REASON_IMAGE_IN_TEST
      this.show_reason_image_in_card_memory = SHOW_REASON_IMAGE_IN_CARD_MEMORY

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
      inner: 'Copiar pregunta'
    }
  }
}
</script>
