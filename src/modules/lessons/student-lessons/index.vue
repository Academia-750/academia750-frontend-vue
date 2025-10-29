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
                <LessonJoinControl
                  :lesson="lesson"
                  :join="(id, value) => joinLesson(id, value)"
                  switch-id="joinLesson"
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
          <template #actions="lessonEvent">
            <div class="d-flex align-center justify-end flex-fill">
              <v-icon
                class="px-2"
                color="success"
                @click.stop="onLesson(lessonEvent)"
              >
                mdi-information
              </v-icon>

              <!-- There are two different switch for desktop and mobile in this same page -->
              <LessonJoinControl
                :lesson="lessonEvent"
                :join="(id, value) => joinLesson(id, value)"
                switch-id="joinLessonMobile"
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
    LessonJoinControl: () =>
      import(
        /* webpackChunkName: "LessonJoinControl" */ '@/modules/resources/components/resources/lesson-join-control.vue'
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
          will_join: item.will_join,
          date: item.date
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

    /**
     * Check if a date has passed
     */
    isPastDate(date) {
      return moment(date).isBefore(moment(), 'day')
    },

    /**
     * Check if a date has passed from event data
     */
    isPastDateFromEvent(event) {
      const lesson = this.lessons.find((item) => item.id === event.id)

      return lesson ? this.isPastDate(lesson.date) : false
    },

    async onLoad({ start, end }) {
      this.isLoading = true // Show the loader while fetching lessons
      const params = {
        from: start,
        to: end,
        type: 'classroom' // Only fetch classroom type lessons
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
      const lesson = this.lessons.find((l) => l.id === lessonId)

      // Validate before making API call
      if (this.isPastDate(lesson.date)) {
        Toast.error('No puedes cambiar la asistencia de una clase pasada.')

        return
      }

      const res = await LessonRepository.joinLesson(lessonId, value)

      if (!res) {
        return
      }
      const message = value
        ? 'Has confirmado tu asistencia a la clase.'
        : 'Has cancelado tu asistencia a la clase.'

      Toast.success(message)

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
