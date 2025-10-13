<template>
  <v-card-text>
    <div>
      <LessonInfoModal ref="lessonInfoModal" />
      <v-card v-if="!isMobile" flat>
        <v-card-text>
          <LessonToolBar>
            <template v-if="lesson" slot="info">
              <div class="d-flex align-center">
                <div class="text-bold mr-2">Clase:</div>
                <span class="font-weight-bold subtitle-2">
                  {{ lesson.name }}
                </span>
              </div>
            </template>
            <template v-else slot="info">
              <div class="d-flex w-full justify-between">
                Selecciona una clase
              </div>
            </template>
            <template v-if="lesson" slot="actions">
              <!-- Column for Time -->
              <div class="d-flex align-center">
                <!-- There are two different switch for desktop and mobile in this same page -->
                <SwitchInput
                  v-if="$hasPermission(PermissionEnum.JOIN_LESSONS)"
                  id="joinLesson"
                  class="mt-3"
                  :label="lesson.will_join === 1 ? 'Asistiré' : 'No asistiré'"
                  :value="lesson.will_join === 1"
                  :disabled="!canJoinLesson(lesson)"
                  @click="(value) => joinLesson(lesson.id, value)"
                />
                <ResourceButton
                  color="success"
                  icon-button="mdi-information"
                  text-button="Información"
                  @click="openInfoModal(lesson)"
                />
                <resource-button
                  v-if="lesson.is_active === 1"
                  text-button="Entrar Clase"
                  icon-button="mdi-eye"
                  color="success"
                  :disabled="!$hasPermission(PermissionEnum.SEE_ONLINE_LESSON)"
                  :config-route="{
                    name: 'join-online-class',
                    params: { id: lesson.id }
                  }"
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
            @event="onLesson"
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
          <template #actions="event">
            <div class="d-flex justify-end flex-fill">
              <v-icon
                class="px-2"
                color="success"
                @click.stop="onLesson(event)"
              >
                mdi-information
              </v-icon>

              <!-- There are two different switch for desktop and mobile in this same page -->
              <SwitchInput
                v-if="$hasPermission(PermissionEnum.JOIN_LESSONS)"
                id="joinLesson"
                class="px-2"
                :value="event.will_join === 1"
                :disabled="!canJoinLesson(getLessonById(event.id))"
                @click="(value) => joinLesson(event.id, value)"
              />
            </div>
          </template>
        </MobileCalendar>
      </div></div
  ></v-card-text>
</template>

<script>
import notifications from '@/mixins/notifications'
import { mapState, mapMutations, mapActions } from 'vuex'
import moment from 'moment'
import { PermissionEnum } from '@/utils/enums'
import LessonRepository from '@/services/LessonRepository'
import Toast from '@/utils/toast'

export default {
  name: 'StudentsLessons',
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
    ...mapState('studentLessonsStore', ['lesson', 'lessons', 'date', 'type']),
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
          will_join: item.will_join
        }
      })
    }
  },
  beforeCreate() {
    this?.$hasPermissionMiddleware(PermissionEnum.SEE_LESSONS)
  },

  methods: {
    ...mapMutations('studentLessonsStore', [
      'SET_DATE',
      'SET_TYPE',
      'SET_LESSONS'
    ]),
    ...mapActions('studentLessonsStore', ['setLesson', 'updateJoinLesson']),

    onDate() {
      this.setLesson(false)
    },
    onLesson(event) {
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
    getLessonById(lessonId) {
      return this.lessons.find((l) => l.id === lessonId) || {}
    },
    canJoinLesson(lesson) {
      if (!lesson) return false
      // If trying to unjoin, allow if date hasn't passed
      if (lesson.will_join === 1) {
        return lesson.can_join !== false
      }
      
      return (
        lesson.can_join !== false &&
        (lesson.is_full !== true || lesson.will_join === 1)
      )
    },

    async onLoad({ start, end }) {
      this.isLoading = true // Show the loader while fetching lessons
      const params = {
        from: start,
        to: end
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
        // Auto select the first next lesson or the last lesson if all are in the past
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
        console.error('Error fetching lessons:', error)
      } finally {
        // Ensure that isLoading is set to false regardless of success or failure
        this.isLoading = false
      }
    },
    async joinLesson(lessonId, value) {
      const res = await LessonRepository.joinLesson(lessonId, value)

      if (!res) {
        return
      }

      if (value) {
        Toast.success('Has confirmado tu asistencia a la clase.')
      }

      // Refresh selected object
      this.updateJoinLesson({ lessonId, value })
    }
  },
  head: {
    title: {
      inner: 'Mis lecciones'
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
