<template>

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
                id="joinLesson"
                :value="event.will_join === 1"
                @click="(value) => joinLesson(event.id, value)"
              />
            </div>
          </template>
        </LessonToolBar>
        <CalendarLessonsList
          ref="calendar"
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
        :focus="date"
        :events="events"
        @load="onLoad"
        @focus="SET_DATE"
      >
        <template #actions="event">
          <div class="d-flex justify-end flex-fill">
            <v-icon class="px-2" color="success" @click.stop="onLesson(event)">
              mdi-information
            </v-icon>
            <!-- There are two different switch for desktop and mobile in this same page -->
            <SwitchInput
              id="joinLesson"
              :value="event.will_join === 1"
              @click="(value) => joinLesson(event.id, value)"
            />
          </div>
        </template>
      </MobileCalendar>
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

    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    SwitchInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/switch-input.vue'
      ),
    LessonInfoModal: () =>
      import(
        /* webpackChunkName: "LessonInfoModal" */ '@/modules/resources/components/resources/lesson-info-modal.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      reloadDatatableUsers: false,
      lessons: [],
      PermissionEnum
    }
  },
  computed: {
    ...mapState('studentLessonsStore', ['lesson', 'date', 'type']),
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
    ...mapMutations('studentLessonsStore', ['SET_DATE', 'SET_TYPE']),
    ...mapActions('studentLessonsStore', ['setLesson']),

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

    async onLoad({ start, end }) {
      const params = {
        from: start,
        to: end
      }

      const { results } = await LessonRepository.studentCalendar(params)

      this.lessons = results
      // Auto select the first next lesson or the last lesson if all is in the past
      const nextLesson =
        this.lessons.filter(
          (lesson) => lesson.date > moment().format('YYYY-MM-DD')
        )[0] || [...this.lessons].pop()

      if (nextLesson) {
        this.setLesson(nextLesson)
        this.SET_DATE(nextLesson.date)
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

      // Update the lesson on the array
      const index = this.lessons.findIndex((lesson) => lesson.id === lessonId)

      if (index < 0) {
        return
      }

      this.$set(this.lessons, index, {
        ...this.lessons[index],
        will_join: value ? 1 : 0 // But the object expects 1 or 0. Update current selected and on the array
      })

      // Refresh selected object
      this.setLesson(this.lessons[index])
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
