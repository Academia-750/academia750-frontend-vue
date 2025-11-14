<template>
  <div>
    <Vtoolbar :title="assessmentTitle" icon="mdi-clipboard-text" :back="true" />

    <v-container
      v-if="loading"
      class="d-flex justify-center align-center"
      style="min-height: 400px"
    >
      <v-progress-circular
        :size="70"
        :width="7"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </v-container>

    <v-container v-else-if="assessment">
      <!-- Answer Assessment Section -->
      <v-card v-if="!assessmentResult">
        <v-card-title>Responder Seguimiento Teórico</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <strong>Total de Preguntas:</strong>
              {{ assessment.total_questions }}
            </v-col>
            <v-col cols="12" md="4">
              <strong>Factor de Penalización:</strong>
              {{ assessment.penalty_factor }}
            </v-col>
            <v-col cols="12" md="4">
              <strong>Fecha Límite:</strong>
              {{ formattedDeadline }}
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <validation-observer ref="formAssessment">
            <v-row>
              <v-col cols="12" md="4">
                <FieldInput
                  id="questionsRight"
                  ref="questionsRightInput"
                  v-model="questionsRight"
                  label="Total Correctas"
                  :filled="true"
                  :outlined="false"
                  type="number"
                  :disabled="isDeadlinePassed"
                  rules="required|numeric|min_value:0"
                  @input="validateTotal"
                />
              </v-col>
              <v-col cols="12" md="4">
                <FieldInput
                  id="questionsWrong"
                  ref="questionsWrongInput"
                  v-model="questionsWrong"
                  label="Total Incorrectas"
                  :filled="true"
                  :outlined="false"
                  type="number"
                  :disabled="isDeadlinePassed"
                  rules="required|numeric|min_value:0"
                  @input="validateTotal"
                />
              </v-col>
              <v-col cols="12" md="4">
                <FieldInput
                  id="questionsNotAnswered"
                  ref="questionsNotAnsweredInput"
                  v-model="questionsNotAnswered"
                  label="Total Sin Responder"
                  :filled="true"
                  :outlined="false"
                  type="number"
                  :disabled="isDeadlinePassed"
                  rules="required|numeric|min_value:0"
                  @input="validateTotal"
                />
              </v-col>
            </v-row>
            <!-- Deadline Warning (under inputs) -->
            <v-alert
              v-if="isDeadlinePassed"
              border="left"
              colored-border
              type="warning"
              :elevation="0"
              style="
                background-color: white;
                border-color: #ff9800;
                border-width: 4px;
              "
            >
              La fecha límite para este seguimiento teórico ha pasado. Ya no
              puedes enviar respuestas.
            </v-alert>
            <div
              v-else-if="totalValidationError && allFieldsFilled"
              class="error--text text-caption"
            >
              El total debe ser igual a
              {{ assessment.total_questions }} preguntas
            </div>
            <div>
              <ResourceButton
                v-if="!isDeadlinePassed"
                :loading="submitting"
                text-button="Enviar Respuesta"
                color="primary"
                icon-button="mdi-send"
                :disabled="submitting || !isFormValid"
                @click="submitResult"
              />
            </div>
          </validation-observer>
        </v-card-text>
      </v-card>

      <!-- Leaderboard Section (TODO) -->
      <v-card class="mb-4">
        <v-card-title>Clasificación</v-card-title>
        <v-card-text>
          <p class="text--secondary">Próximamente...</p>
        </v-card-text>
      </v-card>

      <!-- Stats Results Section -->
      <v-card v-if="assessmentResult" class="mb-4">
        <v-card-title>Tu Resultado</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4">
              <div class="text-center">
                <div class="text-h4 primary--text">
                  {{ assessmentResult.questions_right }}
                </div>
                <div class="text-body-2">Correctas</div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-center">
                <div class="text-h4 error--text">
                  {{ assessmentResult.questions_wrong }}
                </div>
                <div class="text-body-2">Incorrectas</div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-center">
                <div class="text-h4 warning--text">
                  {{ assessmentResult.questions_not_answered }}
                </div>
                <div class="text-body-2">Sin responder</div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>

      <!-- Already Submitted Message -->
      <v-alert
        v-if="assessmentResult && !isDeadlinePassed"
        type="info"
        prominent
        class="mb-4"
      >
        <v-alert-title>Ya has enviado tu respuesta</v-alert-title>
        Has completado este seguimiento teórico. Puedes ver tus resultados
        arriba.
      </v-alert>
    </v-container>

    <v-container v-else-if="error">
      <v-alert type="error" prominent>
        <v-alert-title>Error</v-alert-title>
        {{ error }}
      </v-alert>
    </v-container>
  </div>
</template>

<script>
import AssessmentRepository from '@/services/AssessmentRepository'
import moment from 'moment'
import Toast from '@/utils/toast'

export default {
  name: 'StudentAssessmentDetail',
  components: {
    Vtoolbar: () =>
      import(
        /* webpackChunkName: "Vtoolbar" */ '@/modules/resources/components/resources/toolbar'
      ),
    FieldInput: () =>
      import(
        /* webpackChunkName: "FieldInput" */ '@/modules/resources/components/form/input.vue'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      )
  },
  data() {
    return {
      loading: true,
      submitting: false,
      assessment: null,
      assessmentResult: null,
      error: null,
      questionsRight: '',
      questionsWrong: '',
      questionsNotAnswered: '',
      totalValidationError: false,
      totalValidationSuccess: false
    }
  },
  computed: {
    assessmentId() {
      return this.$route.params.assessmentId
    },
    assessmentTitle() {
      if (this.assessment && this.assessment.title) {
        return this.assessment.title
      }

      return 'Seguimiento Teórico'
    },
    isDeadlinePassed() {
      if (!this.assessment || !this.assessment.deadline) {
        return false
      }
      // Deadline format from API is 'd-m-Y H:i:s'
      const deadline = moment(this.assessment.deadline, 'DD-MM-YYYY HH:mm:ss')

      return moment().isAfter(deadline)
    },
    formattedDeadline() {
      if (!this.assessment || !this.assessment.deadline) {
        return 'Sin fecha límite'
      }

      return moment(this.assessment.deadline, 'DD-MM-YYYY HH:mm:ss').format(
        'DD-MM-YYYY HH:mm'
      )
    },
    totalAnswered() {
      const right = parseInt(this.questionsRight) || 0
      const wrong = parseInt(this.questionsWrong) || 0
      const notAnswered = parseInt(this.questionsNotAnswered) || 0

      return right + wrong + notAnswered
    },
    allFieldsFilled() {
      return (
        this.questionsRight !== '' &&
        this.questionsWrong !== '' &&
        this.questionsNotAnswered !== ''
      )
    },
    isFormValid() {
      if (!this.assessment) {
        return false
      }

      return (
        this.totalAnswered === this.assessment.total_questions &&
        this.questionsRight !== '' &&
        this.questionsWrong !== '' &&
        this.questionsNotAnswered !== ''
      )
    }
  },
  async mounted() {
    await this.loadAssessment()
    await this.loadAssessmentResult()
    this.loading = false
  },
  methods: {
    async loadAssessment() {
      try {
        const assessment = await AssessmentRepository.getStudentAssessment(
          this.assessmentId
        )

        if (assessment) {
          this.assessment = assessment
        } else {
          this.error =
            'No se pudo cargar la información del seguimiento teórico'
        }
      } catch (error) {
        console.error('Error loading assessment:', error)
        this.error = 'Error al cargar el seguimiento teórico'
      }
    },
    async loadAssessmentResult() {
      try {
        const result = await AssessmentRepository.getAssessmentResult(
          this.assessmentId
        )

        if (result) {
          this.assessmentResult = result
        }
      } catch (error) {
        console.error('Error loading assessment result:', error)
      }
    },
    validateTotal() {
      if (!this.assessment) {
        return
      }

      const total = this.totalAnswered
      const expected = this.assessment.total_questions

      this.totalValidationError = total !== expected && total > 0
      this.totalValidationSuccess =
        total === expected && this.questionsRight !== '' && total > 0
    },
    async submitResult() {
      const status = await this.$refs.formAssessment.validate()

      if (!status) {
        return
      }

      if (!this.isFormValid) {
        Toast.error(
          `El total debe ser igual a ${this.assessment.total_questions} preguntas`
        )

        return
      }

      this.submitting = true

      try {
        const result = await AssessmentRepository.submitAssessmentResult(
          this.assessmentId,
          {
            questions_right: parseInt(this.questionsRight, 10),
            questions_wrong: parseInt(this.questionsWrong, 10),
            questions_not_answered: parseInt(this.questionsNotAnswered, 10)
          }
        )

        if (result) {
          this.assessmentResult = result
          Toast.success('Tu respuesta ha sido registrada correctamente')
        }
      } catch (error) {
        console.error('Error submitting result:', error)
      } finally {
        this.submitting = false
      }
    }
  },
  head: {
    title: {
      inner: 'Detalle de Seguimiento Teórico'
    }
  }
}
</script>
