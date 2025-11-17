<template>
  <v-card>
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
          La fecha límite para este seguimiento teórico ha pasado. Ya no puedes
          enviar respuestas.
        </v-alert>
        <div
          v-else-if="totalValidationError && allFieldsFilled"
          class="error--text text-caption"
        >
          El total debe ser igual a
          {{ assessment.total_questions }} preguntas
        </div>
        <div class="d-flex">
          <ResourceButton
            v-if="!isDeadlinePassed"
            :loading="submitting"
            text-button="Enviar Respuesta"
            color="primary"
            icon-button="mdi-send"
            :disabled="submitting || !isFormValid"
            @click="submitResult"
          />
          <ResourceButton
            v-if="isEditing && !isDeadlinePassed"
            text-button="Cancelar"
            color="secondary"
            icon-button="mdi-close"
            :disabled="submitting"
            class="ml-2"
            @click="cancelEdit"
          />
        </div>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import AssessmentRepository from '@/services/AssessmentRepository'
import moment from 'moment'
import Toast from '@/utils/toast'

export default {
  name: 'AssessmentForm',
  components: {
    FieldInput: () =>
      import(
        /* webpackChunkName: "FieldInput" */ '@/modules/resources/components/form/input.vue'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      )
  },
  props: {
    assessment: {
      type: Object,
      required: true
    },
    assessmentId: {
      type: [String, Number],
      required: true
    },
    isDeadlinePassed: {
      type: Boolean,
      default: false
    },
    assessmentResult: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      submitting: false,
      questionsRight: '',
      questionsWrong: '',
      questionsNotAnswered: '',
      totalValidationError: false,
      totalValidationSuccess: false
    }
  },
  computed: {
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
    },
    isEditing() {
      return this.assessmentResult !== null
    }
  },
  watch: {
    assessmentResult: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.questionsRight = newValue.questions_right.toString()
          this.questionsWrong = newValue.questions_wrong.toString()
          this.questionsNotAnswered = newValue.questions_not_answered.toString()
        }
      }
    }
  },
  methods: {
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
        const data = {
          questions_right: parseInt(this.questionsRight, 10),
          questions_wrong: parseInt(this.questionsWrong, 10),
          questions_not_answered: parseInt(this.questionsNotAnswered, 10)
        }

        const isEdit = this.assessmentResult !== null
        const result = await AssessmentRepository.submitAssessmentResult(
          this.assessmentId,
          data
        )

        if (result) {
          this.$emit('result-submitted', result)
          Toast.success(
            isEdit
              ? 'Tu respuesta ha sido actualizada correctamente'
              : 'Tu respuesta ha sido registrada correctamente'
          )
        }
      } catch (error) {
        console.error('Error submitting result:', error)
      } finally {
        this.submitting = false
      }
    },
    cancelEdit() {
      this.$emit('cancel-edit')
    }
  }
}
</script>
