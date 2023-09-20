<template>
  <v-card-text>
    <LessonInfoModal ref="lessonInfoModal" />
    <div>
      <v-card flat>
        <v-card-text>
          <LessonToolBar v-show="!isMobile">
            <template v-if="lesson" slot="info">
              <div class="d-flex align-center">
                <div class="text-bold mr-2 subtitle-1 font-weight-bold">Mis lecciones</div>
              </div>
              <div class="d-flex align-center">
                <div class="text-bold mr-2">Clase:</div>
                <span class="font-weight-bold subtitle-2">
                  {{ lesson.name }}
                </span>
              </div>

              <!-- Column for Time -->
              <div v-if="isActiveLesson(lesson)" class="d-flex px-2 mt-2">
                <SwitchInput
                  id="joinLesson"
                  label="Asistir"
                  :value="willJoin"
                  @click="joinLesson"
                />
              </div>
            </template>
            <template v-else slot="info">
              <div class="d-flex w-full justify-between">
                Selecciona o crea una clase
              </div>
            </template>
            <template v-if="lesson" slot="actions">
              <resource-button
                text-button="Información"
                icon-button="mdi-information-variant"
                color="success"
                @click="openInfoModal(lesson)"
              />
            </template>
          </LessonToolBar>
          <template v-if="!isMobile">
            <CalendarLessonsList
              ref="calendar"
              :focus="date"
              :type="type"
              role="student"
              @type="SET_TYPE"
              @lesson="onLesson"
              @load="onLessonLoad"
              @focus="SET_DATE"
            />
          </template>
          <template v-else>
            <v-date-picker
              :value="focus"
              :event-color="getEventColor"
              :events="events"
              color="primary"
              locale="es-MX"
            ></v-date-picker>
          </template>
        </v-card-text>
      </v-card>
    </div>
  </v-card-text>
</template>

<script>
import notifications from '@/mixins/notifications'
import { mapState, mapMutations, mapActions } from 'vuex'
import moment from 'moment'
import { PermissionEnum } from '@/utils/enums'
import DatatableManageStudents from '../../mixins/DatatableManageStudents'
import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'StudentsLessons',
  components: {
    CalendarLessonsList: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '../../../lessons/common/calendar-lessons-list.vue'
      ),
    LessonToolBar: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '../../../lessons/common/lesson-tool-bar.vue'
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
  mixins: [DatatableManageStudents, notifications],
  data() {
    return {
      reloadDatatableUsers: false,
      willJoin: false,
      events: []
    }
  },
  computed: {
    ...mapState('studentsService', ['lesson', 'date', 'type']),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  beforeCreate() {
    this?.$hasPermissionMiddleware(PermissionEnum.SEE_LESSONS)
  },
  mounted() {
    this.loadNotifications()
  },
  methods: {
    ...mapMutations('studentsService', ['SET_DATE', 'SET_TYPE']),
    ...mapActions('studentsService', ['setLesson']),
    isActiveLesson(lesson) {
      return (
        lesson.is_active === 1 ||
        this?.$hasPermissionMiddleware(PermissionEnum.JOIN_LESSONS)
      )
    },
    onLesson(lesson) {
      this.openInfoModal(lesson)
      this.setLesson(lesson || false)
      this.willJoin = lesson.will_join === 1
    },
    openInfoModal(lesson) {
      this.$refs.lessonInfoModal.open(lesson)
    },
    async getCalendarLessons({ start, end }) {
      const params = {
        from: start.date,
        to: end.date
      }
      
      let lessons = undefined

      // I will have to keep this in "student" in a util as a variable if the logic Abel confirms
      if (this.role === 'student') {
        lessons = await LessonRepository.studentCalendar(params)
      } else {
        lessons = await LessonRepository.calendar(params)
      }

      if (!lessons) {
        return
      }
      this.lessons = lessons.results
      this.events = lessons.results.map((item) => {
        return [
        item.date + ' ' + item.start_time
        ]
      })
      // Auto select the first next lesson or the last lesson if all is in the past
      const nextLesson =
        this.lessons
          .filter((lesson) => lesson.date > moment().format('YYYY-MM-DD'))
          .pop() || [...this.lessons].pop()

      nextLesson && this.$emit('load', nextLesson)
    },
    onLessonLoad(lesson) {
      // Only on first load
      if (this.lesson) {
        return
      }
      this.willJoin = lesson.will_join === 1
      this.setLesson(lesson || false)
    },
    async joinLesson(value) {
      const res = LessonRepository.StudentJoinLesson(this.lesson.id, value)

      if (!res) {
        return
      }
      // The switch accepts a flag
      this.willJoin = value
      // But the object expects 1 or 0. Update current selected and on the array
      this.setLesson({ ...this.lesson, will_join: value ? 1 : 0 })
      this.$refs.calendar.updateLesson(this.lesson.id, {
        will_join: value ? 1 : 0
      })
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
