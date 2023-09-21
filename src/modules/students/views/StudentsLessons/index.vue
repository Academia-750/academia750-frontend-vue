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
              v-model="date2"
              :event-color="date => date[9] % 2 ? 'red' : 'yellow'"
              :events="functionEvents"
            ></v-date-picker>
          </template>
        </v-card-text>
        <div class="d-flex w-full elevation-2 relative lessonSelectedDescription">
          <div>
            <div class="d-flex flex-column justify-center">
              <span class=" font-weight-medium text-xs-caption text-sm-h7">
                Fire Lesson
              </span>
              <span class="font-weight-medium text-xs-caption text-sm-h7">
                09:00 AM to 10:00 AM
              </span>
            </div>
          </div>
          <div class="d-flex">
            <SwitchInput
              id="joinLesson"
              label="Asistir"
              :value="willJoin"
              @click="joinLesson"
            />
          </div>
          <div class="d-flex px-2">
            <v-icon
              color="success"
              :dark="!disabled"
            >
              mdi-information
            </v-icon>
          </div>
        </div>
        <div class="lessonSelectedDate d-flex flex-column items-center blue lighten-2 p-2">
          <span class="font-weight-medium text-xs-caption text-sm-h7">
            17
          </span>
          <span class="font-weight-medium text-xs-caption text-sm-h7">
            Aug
          </span>
        </div>
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
      events: [],
      lessons: [],
      date2: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
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
    functionEvents (date) {
      console.log( 'calleds')
      const [year,monthNumber, day] = date.split('-')

      const firstDay = new Date(year, monthNumber - 1, 1)
      const firstDayFormatted = `${year}-${monthNumber}-01`

      // Calculate the last day of the month
      const lastDay = new Date(year, monthNumber, 0)
      const lastDayFormatted = `${year}-${monthNumber}-${lastDay.getDate()}`

          const startDate = moment(firstDayFormatted).format('YYYY-MM-DD')
          const endDate = moment(lastDayFormatted).format('YYYY-MM-DD')
        
      // this.getCalendarLessons(startDate, endDate)

      const LessonsDate = this.lessons.results.map((item) => {
      return item.date
      })
      const dayValues = LessonsDate.map((dateString) => {
        const parts = dateString.split('-')

        // Split the date string by '-'
        return parseInt(parts[2]) // Get the day part (index 2) and convert it to a number
      })

      console.log(dayValues)
      if (dayValues.includes(parseInt(day, 10))) return ['red']

      return false
    },
    async getCalendarLessons(start, end) {
      const params = {
        from: start,
        to: end
      }
      
      // I will have to keep this in "student" in a util as a variable if the logic Abel confirms
      
        this.lessons = await LessonRepository.studentCalendar(params)

        return true
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
.lessonSelectedDate {
  position: absolute;
  bottom: 15px;
  padding: 5px;
  align-items: center;
}
.lessonSelectedDescription {
  margin-left: 37px;
}
</style>
