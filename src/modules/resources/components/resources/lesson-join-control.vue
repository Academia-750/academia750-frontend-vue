<template>
  <div v-if="$hasPermission(PermissionEnum.JOIN_LESSONS)">
    <!-- Capacity Info (if applicable) -->
    <div v-if="lesson.max_students && !isMobile" style="min-width: 200px">
      <span
        v-if="lesson.max_students - lesson.will_join_count > 0"
        style="font-size: 10px"
      >
        {{ lesson.max_students - lesson.will_join_count }} huecos libres: de
        {{ lesson.max_students }} disponibles
      </span>
      <v-chip v-else small color="error" dark label>Espacio Lleno</v-chip>
    </div>

    <!-- Join Switch -->
    <SwitchInput
      v-if="showSwitch"
      :id="switchId"
      :class="switchClass"
      :label="willJoinLabel"
      :value="lesson.will_join === 1"
      :disabled="!effectiveCanJoin"
      :no-margin="true"
      :hide-details="true"
      @click="handleJoin"
    />
    <span v-else></span>
  </div>
</template>

<script>
import { PermissionEnum } from '@/utils/enums'
import moment from 'moment'

export default {
  name: 'LessonJoinControl',
  components: {
    SwitchInput: () =>
      import(
        /* webpackChunkName: "SwitchInput" */ '@/modules/resources/components/form/switch-input.vue'
      )
  },
  props: {
    lesson: {
      type: Object,
      required: true
    },
    join: {
      type: Function,
      required: true
    },
    switchId: {
      type: String,
      default: 'joinLesson'
    },
    switchClass: {
      type: String,
      default: ''
    },
    compact: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      PermissionEnum
    }
  },
  computed: {
    joinLabel() {
      return this.lesson.type === 'space' ? 'Reservado' : 'Asistiré'
    },
    notJoinLabel() {
      return this.lesson.type === 'space' ? 'Reservar' : 'No asistiré'
    },
    showSwitch() {
      // TODO: Will add starting date to join as optional in the future
      return this.lesson.is_active
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
    willJoinLabel() {
      return this.lesson.will_join === 1 ? this.joinLabel : this.notJoinLabel
    },
    effectiveCanJoin() {
      const date = this.lesson?.date

      if (date && moment(date).isBefore(moment(), 'day')) {
        return false
      }

      if (this.lesson?.will_join === 1) {
        return true
      }

      // Do not allow joining before allow_joining_from_date if set
      const allowFrom = this.lesson?.allow_joining_from_date

      if (allowFrom && moment(allowFrom).isAfter(moment(), 'day')) {
        return false
      }

      if (
        this.lesson?.max_students &&
        this.lesson?.will_join_count >= this.lesson?.max_students
      ) {
        return false
      }

      return true
    }
  },
  methods: {
    async handleJoin(value) {
      // If joining a space, show confirmation dialog
      if (value && this.lesson.type === 'space') {
        const result = await this.$swal.fire({
          width: '400px',
          icon: 'warning',
          title: 'Confirmar reserva',
          html: 'Si reservas tu puesto pero luego no haces uso de él, puedes incurrir en penalizaciones. Haz un uso responsable.',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Sí, reservar',
          cancelButtonText: 'Cancelar'
        })

        if (!result.isConfirmed) {
          return
        }
      }

      this.join(this.lesson.id, value)
    }
  }
}
</script>
