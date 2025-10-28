<template>
  <v-card-text>
    <div>
      <LessonInfoModal ref="lessonInfoModal" :hide-materials="true" />
      <v-card v-if="!isMobile" flat>
        <v-card-text>
          <LessonToolBar>
            <template v-if="lesson" slot="info">
              <div class="d-flex align-center">
                <div class="text-bold mr-2">Espacio:</div>
                <span class="font-weight-bold subtitle-2">
                  {{ lesson.name }}
                </span>
              </div>
            </template>
            <template v-else slot="info">
              <div class="d-flex w-full justify-between">
                Selecciona un espacio
              </div>
            </template>
            <template v-if="lesson" slot="actions">
              <div class="d-flex align-center">
                <!-- There are two different switch for desktop and mobile in this same page -->
                <SwitchInput
                  v-if="$hasPermission(PermissionEnum.JOIN_LESSONS)"
                  id="joinSpace"
                  class="mt-3"
                  :label="lesson.will_join === 1 ? 'Asistiré' : 'No asistiré'"
                  :value="lesson.will_join === 1"
                  :disabled="!canJoinSpace(lesson)"
                  @click="(value) => joinSpace(lesson.id, value)"
                />
                <ResourceButton
                  color="success"
                  icon-button="mdi-information"
                  text-button="Información"
                  @click="openInfoModal(lesson)"
                />
              </div>
            </template>
          </LessonToolBar>
          <CalendarLessonsList
            ref="calendar"
            :loading="isLoading"
            :focus="date"
            :type="type"
            :events="events"
            @type="SET_TYPE"
            @date="onDate"
            @event="onSpace"
            @load="onLoad"
            @focus="SET_DATE"
          />
        </v-card-text>
      </v-card>
      <div v-else class="d-flex justify-center pt-2 pb-2 d-md-none">
        <MobileCalendar
          :loading="isLoading"
          :focus="date"
          :events="events"
          @load="onLoad"
          @focus="SET_DATE"
        >
          <template #actions="spaceEvent">
            <div class="d-flex justify-end flex-fill">
              <v-icon
                class="px-2"
                color="success"
                @click.stop="onSpace(spaceEvent)"
              >
                mdi-information
              </v-icon>

              <!-- There are two different switch for desktop and mobile in this same page -->
              <SwitchInput
                v-if="$hasPermission(PermissionEnum.JOIN_LESSONS)"
                id="joinSpace"
                class="px-2"
                :value="spaceEvent.will_join === 1"
                :disabled="!canJoinSpaceFromEvent(spaceEvent)"
                @click="(value) => joinSpace(spaceEvent.id, value)"
              />
            </div>
          </template>
        </MobileCalendar>
      </div>
    </div>
  </v-card-text>
</template>

<script>
import notifications from '@/mixins/notifications'
import { mapState, mapMutations, mapActions } from 'vuex'
import moment from 'moment'
import { PermissionEnum } from '@/utils/enums'
import LessonRepository from '@/services/LessonRepository'
import Toast from '@/utils/toast'

export default {
  name: 'StudentSpaces',
  components: {
    CalendarLessonsList: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '@/modules/lessons/_common/calendar-lessons-list.vue'
      ),
    MobileCalendar: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '@/modules/lessons/_common/mobile-calendar-lessons-list.vue'
      ),
    LessonToolBar: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '@/modules/lessons/_common/lesson-tool-bar.vue'
      ),
    SwitchInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/switch-input.vue'
      ),
    LessonInfoModal: () =>
      import(
        /* webpackChunkName: "LessonInfoModal" */ '@/modules/resources/components/resources/lesson-info-modal.vue'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      reloadDatatableUsers: false,
      PermissionEnum,
      event: {},
      isLoading: false
    }
  },
  computed: {
    ...mapState('studentSpacesStore', ['lesson', 'lessons', 'date', 'type']),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
    events() {
      return this.lessons.map((item) => {
        return {
          id: item.id,
          name: item.name,
          start: item.date + ' ' + item.start_time,
          end: item.date + ' ' + item.end_time,
          color: item.color || '#cccccc',
          timed: false,
          will_join: item.will_join,
          max_students: item.max_students,
          student_count: item.student_count,
          will_join_count: item.will_join_count,
          date: item.date
        }
      })
    }
  },
  beforeCreate() {
    this?.$hasPermissionMiddleware(PermissionEnum.SEE_LESSONS)
  },

  methods: {
    ...mapMutations('studentSpacesStore', [
      'SET_DATE',
      'SET_TYPE',
      'SET_LESSONS'
    ]),
    ...mapActions('studentSpacesStore', ['setLesson', 'updateJoinLesson']),

    onDate() {
      this.setLesson(false)
    },
    onSpace(event) {
      const lesson = this.lessons.find((item) => item.id === event.id)

      if (!lesson) {
        return
      }
      this.openInfoModal(lesson)
      this.setLesson(lesson || false)
    },
    openInfoModal(lesson) {
      this.$refs.lessonInfoModal.open(lesson)
    },

    /**
     * Check if a student can join a space
     * Returns false if:
     * 1. The date has passed
     * 2. The max capacity is reached and student is trying to join (not unjoin)
     */
    canJoinSpace(lesson) {
      // Check if date has passed
      const isPastDate = moment(lesson.date).isBefore(moment(), 'day')

      if (isPastDate) {
        return false
      }

      // If student is already marked as joining (will_join === 1), allow them to unjoin
      if (lesson.will_join === 1) {
        return true
      }

      // Check if max capacity is reached
      if (
        lesson.max_students &&
        lesson.will_join_count >= lesson.max_students
      ) {
        return false
      }

      return true
    },

    /**
     * Check if a student can join from event data (for mobile view)
     */
    canJoinSpaceFromEvent(event) {
      const lesson = this.lessons.find((item) => item.id === event.id)

      return lesson ? this.canJoinSpace(lesson) : false
    },

    async onLoad({ start, end }) {
      this.isLoading = true // Show the loader while fetching spaces
      const params = {
        from: start,
        to: end,
        type: 'space' // Filter only space type lessons
      }

      try {
        const { results } = await LessonRepository.studentCalendar(params)

        const lessons = results

        this.SET_LESSONS(lessons)

        // We already have a current selected lesson in this month
        const alreadySelected = this.lessons.find(
          (lesson) => lesson.id === this.lesson.id
        )

        if (alreadySelected) {
          return
        }
        // Auto select the first next space or the last space if all are in the past
        const nextLesson =
          this.lessons.find(
            (lesson) => lesson.date > moment().format('YYYY-MM-DD')
          ) || this.lessons[this.lessons.length - 1]

        if (nextLesson) {
          this.setLesson(nextLesson)
          this.SET_DATE(nextLesson.date)
        }
      } catch (error) {
        // Handle any error that occurred during the request
        console.error('Error fetching spaces:', error)
      } finally {
        // Ensure that isLoading is set to false regardless of success or failure
        this.isLoading = false
      }
    },
    async joinSpace(lessonId, value) {
      const lesson = this.lessons.find((l) => l.id === lessonId)

      // Validate before making API call
      if (!this.canJoinSpace(lesson)) {
        if (moment(lesson.date).isBefore(moment(), 'day')) {
          Toast.error('No puedes cambiar la asistencia de un espacio pasado.')
        } else if (
          lesson.max_students &&
          lesson.will_join_count >= lesson.max_students &&
          value
        ) {
          Toast.error('Este espacio ha alcanzado su capacidad máxima.')
        }

        return
      }

      const res = await LessonRepository.joinLesson(lessonId, value)

      if (!res) {
        return
      }

      if (value) {
        Toast.success('Has confirmado tu asistencia al espacio.')
      } else {
        Toast.success('Has cancelado tu asistencia al espacio.')
      }

      // Refresh selected object
      this.updateJoinLesson({ lessonId, value })
    }
  },
  head: {
    title: {
      inner: 'Mis espacios'
    }
  }
}
</script>
<style lang="scss" scoped>
.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #cccccc;

  &.active {
    background-color: #66ff99;
  }
}
</style>
