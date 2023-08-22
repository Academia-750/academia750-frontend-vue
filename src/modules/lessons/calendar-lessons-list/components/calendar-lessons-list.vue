<template>
  <div>
    <v-row>
      <v-col>
        <v-sheet>
          <div flat class="d-none justify-end d-md-flex">
            <div class="w-200">
              <v-select
                v-model="type"
                :items="types"
                item-text="label"
                item-value="key"
                dense
                outlined
                hide-details
                class="ma-2"
                :full-width="false"
              ></v-select>
            </div>
          </div>
          <div flat class="d-flex justify-center mb-4">
            <div class="d-flex justify-center align-center">
              <v-btn fab x-small color="primary" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <div
                v-if="$refs.calendar"
                class="mx-3 font-weight-medium text-h5"
              >
                {{ title }}
              </div>
              <v-btn fab x-small color="primary" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
            </div>
          </div>
        </v-sheet>

        <v-sheet :height="$vuetify.breakpoint.mdAndUp ? 600 : undefined">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="computedType"
            :first-interval="7"
            :interval-minutes="60"
            :interval-count="15"
            locale="es-MX"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
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
  data: () => ({
    focus: '',
    from: '',
    to: '',
    lessons: [], // Full lesson object
    events: [], // Formatted for the calendar
    types: [
      { key: 'month', label: 'Mensual' },
      { key: 'week', label: 'Semanal' }
    ],
    type: 'month'
  }),
  computed: {
    title() {
      const { title } = this.$refs.calendar

      return title.charAt(0).toUpperCase() + title.slice(1)
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
    viewDay({ date }) {
      this.focus = date
      this.$emit('lesson', false)
    },
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    async showEvent({ event }) {
      const lesson = this.lessons.find((item) => item.id === event.id)

      this.$emit('lesson', lesson || false)
    },
    updateRange({ start, end }) {
      this.getCalendarLessons({ start, end })
    },
    async getCalendarLessons({ start, end }) {
      const params = {
        from: start.date,
        to: end.date
      }
      const lessons = await LessonRepository.calendar(params)

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
