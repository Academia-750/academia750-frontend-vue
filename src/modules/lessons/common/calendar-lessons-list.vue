<template>
  <div>
    <v-row>
      <v-col>
        <v-sheet>
          <div flat class="d-none justify-end d-md-flex">
            <div class="w-200">
              <v-select
                :value="type"
                :items="types"
                item-text="label"
                item-value="key"
                dense
                outlined
                hide-details
                class="ma-2"
                :full-width="false"
                @input="$emit('type', $event)"
              ></v-select>
            </div>
          </div>

          <div v-if="$refs.calendar" flat class="d-flex justify-center mb-4">
            <div class="d-flex justify-center align-center">
              <v-btn fab x-small color="primary" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <v-menu
                v-model="calendarMenu"
                :close-on-content-click="false"
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    class="mx-3 font-weight-medium text-h5 text-center"
                    text
                    v-on="on"
                  >
                    {{ title }}
                  </v-btn>
                </template>
                <v-date-picker
                  v-model="focus"
                  position="left"
                  elevation="4"
                  no-title
                  :first-day-of-week="1"
                  @input="onMiniCalendar"
                ></v-date-picker>
              </v-menu>
              <v-btn fab x-small color="primary" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
            </div>
          </div>
        </v-sheet>

        <v-sheet :height="$vuetify.breakpoint.mdAndUp ? 600 : undefined">
          <v-calendar
            ref="calendar"
            :value="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="computedType"
            :first-interval="8"
            :interval-minutes="60"
            :interval-count="13"
            locale="es-MX"
            :weekdays="calendarDay"
            @click:event="showEvent"
            @click:more="setWeekMode"
            @click:date="onDateClick"
            @change="getCalendarLessons"
            @input="onInputChange"
          >
            <template v-slot:event="{ event }">
              <span class="pl-1"> {{ format(event) }} </span>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import _ from 'lodash'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import LessonRepository from '@/services/LessonRepository'
import moment from 'moment'

export default {
  name: 'CalendarLessonsList',
  components: {},
  mixins: [componentButtonsCrud],
  props: {
    focus: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'month'
    },
    role: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    calendarMenu: false,
    from: '',
    to: '',
    lessons: [], // Full lesson object
    events: [], // Formatted for the calendar
    types: [
      { key: 'month', label: 'Mensual' },
      { key: 'week', label: 'Semanal' }
    ]
  }),

  computed: {
    title() {
      const { title } = this.$refs.calendar

      return title.charAt(0).toUpperCase() + title.slice(1)
    },
    calendarDay() {
      return [1, 2, 3, 4, 5, 6, 0]
    },
    computedType() {
      if (this.$vuetify.breakpoint.xs) {
        return 'day'
      }
      if (this.$vuetify.breakpoint.sm) {
        return '4day'
      }

      return this.type
    },
    headers() {
      return headers
    }
  },

  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    onDateClick() {
      this.$emit('lesson', false)
    },
    onMiniCalendar(value) {
      this.calendarMenu = false
      this.$emit('focus', value)
    },
    onInputChange(value) {
      this.$emit('focus', value)
    },
    setWeekMode({ date }) {
      this.$emit('focus', date)
      this.$emit('type', 'week')
    },
    getEventColor(event) {
      return event.color
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    format(event) {
      return `${moment(event.start).format('HH:mm')}   ${event.name}`
    },
    async showEvent({ event }) {
      const lesson = this.lessons.find((item) => item.id === event.id)

      this.$emit('lesson', lesson || false)
    },
    async getCalendarLessons({ start, end }) {
      const params = {
        from: start.date,
        to: end.date
      }
      
      let lessons = undefined

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
        return {
          id: item.id,
          name: item.name,
          start: item.date + ' ' + item.start_time,
          end: item.date + ' ' + item.end_time,
          color: item.color || '#cccccc',
          timed: false
        }
      })
      // Auto select the first next lesson or the last lesson if all is in the past
      const nextLesson =
        this.lessons
          .filter((lesson) => lesson.date > moment().format('YYYY-MM-DD'))
          .pop() || [...this.lessons].pop()

      nextLesson && this.$emit('load', nextLesson)
    }
  }
}
</script>
<style lang="scss" scoped></style>
