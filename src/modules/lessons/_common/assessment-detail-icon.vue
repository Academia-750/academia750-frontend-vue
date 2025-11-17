<template>
  <div v-if="showIcon">
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        <v-icon
          v-bind="attrs"
          class="cursor-pointer pa-1"
          :color="iconColor"
          v-on="on"
          @click="handleClick"
        >
          mdi-clipboard-text
        </v-icon>
      </template>
      <span>{{ tooltipText }}</span>
    </v-tooltip>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'AssessmentDetailIcon',
  props: {
    item: {
      type: Object,
      required: true
    },
    assessmentId: {
      type: [Number, String],
      default: null
    }
  },
  computed: {
    showIcon() {
      // For material-based items, check type and assessment_id
      if (this.item.type === 'assessment' && this.item.assessment_id) {
        return true
      }
      // For assessment list items, check id
      if (this.item.id) {
        return true
      }
      // Also check if assessmentId prop is provided
      if (this.assessmentId) {
        return true
      }

      return false
    },
    iconColor() {
      // If not an assessment, return default color
      if (
        this.item.type !== 'assessment' &&
        !this.item.assessment_id &&
        !this.item.id
      ) {
        return 'primary'
      }

      // Check if expired (deadline has passed) - expired takes priority
      if (this.item.assessment_deadline || this.item.deadline) {
        const deadline = moment(
          this.item.assessment_deadline || this.item.deadline
        )

        if (deadline.isValid() && moment().isAfter(deadline)) {
          return 'grey' // Gray if expired
        }
      }

      // Check if replied (and not expired)
      if (this.item.assessment_replied === 1 || this.item.result) {
        return 'primary' // Blue (primary) if replied
      }

      // Not replied and not expired
      return 'orange' // Orange if not replied
    },
    tooltipText() {
      // If not an assessment, return default message
      if (
        this.item.type !== 'assessment' &&
        !this.item.assessment_id &&
        !this.item.id
      ) {
        return 'Ver detalle de evaluación'
      }

      // Check if expired (deadline has passed)
      if (this.item.assessment_deadline || this.item.deadline) {
        const deadline = moment(
          this.item.assessment_deadline || this.item.deadline
        )

        if (deadline.isValid() && moment().isAfter(deadline)) {
          return 'Seguimiento teórico expirado'
        }
      }

      // Check if replied
      if (this.item.assessment_replied === 1 || this.item.result) {
        return 'Seguimiento teórico respondido'
      }

      // Not replied and not expired
      return 'Responder seguimiento teórico'
    }
  },
  methods: {
    handleClick() {
      const assessmentId =
        this.item.assessment_id || this.item.id || this.assessmentId

      if (!assessmentId) {
        return
      }

      this.$emit('click', assessmentId)
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
