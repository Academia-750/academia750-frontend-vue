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
      <AssessmentForm
        v-if="!assessmentResult || isEditingResult"
        :assessment="currentAssessment"
        :assessment-id="assessmentId"
        :is-deadline-passed="isDeadlinePassed"
        :assessment-result="isEditingResult ? assessmentResult : null"
        @result-submitted="handleResultSubmitted"
        @cancel-edit="handleCancelEdit"
      />

      <!-- Stats Results Section -->
      <v-card v-if="assessmentResult && !isEditingResult" class="mb-4">
        <v-card-title>
          <span>Tu Resultado</span>
          <v-spacer></v-spacer>
          <ResourceButton
            text-button="Editar"
            color="primary"
            icon-button="mdi-pencil"
            :disabled="isDeadlinePassed"
            @click="toggleEditMode"
          />
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3">
              <div class="text-center">
                <div class="text-h4 primary--text">
                  {{ assessmentResult.questions_right }}
                </div>
                <div class="text-body-2">Correctas</div>
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="text-center">
                <div class="text-h4 error--text">
                  {{ assessmentResult.questions_wrong }}
                </div>
                <div class="text-body-2">Incorrectas</div>
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="text-center">
                <div class="text-h4 warning--text">
                  {{ assessmentResult.questions_not_answered }}
                </div>
                <div class="text-body-2">Sin responder</div>
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="text-center">
                <div :class="`text-h4 ${getMarkColorClass()}--text`">
                  {{ formattedMark }}
                </div>
                <div class="text-body-2">
                  Nota (Pos. {{ assessmentResult.position }})
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <div class="mb-2"></div>

      <!-- Leaderboard Section -->
      <AssessmentRanking ref="rankingComponent" :assessment-id="assessmentId" />
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
import { getMarkColor } from '@/modules/lessons/_common/assessment.helper'

export default {
  name: 'StudentAssessmentDetail',
  components: {
    Vtoolbar: () =>
      import(
        /* webpackChunkName: "Vtoolbar" */ '@/modules/resources/components/resources/toolbar'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    AssessmentRanking: () =>
      import(
        /* webpackChunkName: "AssessmentRanking" */ './assessment-ranking.vue'
      ),
    AssessmentForm: () =>
      import(/* webpackChunkName: "AssessmentForm" */ './assessment-form.vue')
  },
  data() {
    return {
      loading: true,
      assessment: null,
      assessmentResult: null,
      error: null,
      isEditingResult: false
    }
  },
  computed: {
    assessmentId() {
      return this.$route.params.assessmentId
    },
    assessmentTitle() {
      const assessment = this.currentAssessment

      if (assessment && assessment.title) {
        return assessment.title
      }

      return 'Seguimiento Teórico'
    },
    currentAssessment() {
      // Get assessment from result if available, otherwise use loaded assessment
      return (
        (this.assessmentResult && this.assessmentResult.assessment) ||
        this.assessment
      )
    },
    isDeadlinePassed() {
      const assessment = this.currentAssessment

      if (!assessment || !assessment.deadline) {
        return false
      }
      // Deadline format from API is 'd-m-Y H:i:s'
      const deadline = moment(assessment.deadline, 'DD-MM-YYYY HH:mm:ss')

      return moment().isAfter(deadline)
    },
    formattedMark() {
      if (!this.assessmentResult || this.assessmentResult.mark === null) {
        return 'N/A'
      }

      const mark = parseFloat(this.assessmentResult.mark)

      if (isNaN(mark)) {
        return 'N/A'
      }

      return mark
    }
  },
  async mounted() {
    try {
      await Promise.all([this.loadAssessment(), this.loadAssessmentResult()])
    } catch (error) {
      console.error('Error in mounted:', error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    getMarkColorClass() {
      if (!this.assessmentResult || !this.assessmentResult.mark) {
        return 'grey'
      }

      return getMarkColor(
        this.assessmentResult.mark,
        this.assessment?.lowest_mark,
        this.assessment?.highest_mark
      )
    },
    async loadAssessmentResult() {
      try {
        const result = await AssessmentRepository.getAssessmentResult(
          this.assessmentId
        )

        if (result) {
          this.assessmentResult = result
          // Extract assessment from result if available (prefer this over loaded assessment)
          if (result.assessment) {
            this.assessment = result.assessment
          }
        }
      } catch (error) {
        console.error('Error loading assessment result:', error)
      }
    },
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
    toggleEditMode() {
      if (this.isDeadlinePassed) {
        return
      }

      this.isEditingResult = true
    },
    handleResultSubmitted(result) {
      this.assessmentResult = result
      this.isEditingResult = false
      // Refresh ranking after submitting result
      if (this.$refs.rankingComponent) {
        this.$refs.rankingComponent.refresh()
      }
    },
    handleCancelEdit() {
      this.isEditingResult = false
    }
  },
  head: {
    title: {
      inner: 'Detalle de Seguimiento Teórico'
    }
  }
}
</script>
