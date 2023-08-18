<template>
  <div>
    <v-row>
      <v-col>
        <v-sheet>
          <div flat class="d-flex justify-end flex-wrap">
            <div class="flex-1 justify-center">
              <v-btn fab x-small color="primary" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <div
                v-if="$refs.calendar"
                class="mx-3 font-weight-medium text-h5"
              >
                {{ title }}
              </div>
              <v-btn
                fab
                x-small
                color="primary"
                class="mr-16"
                :style="{ marginRight: '300px !important' }"
                @click="next"
              >
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
            </div>
            <ResourceButtonAdd
              class="ml-16"
              text-button="Crear Clase"
              @click="addLesson"
            />
          </div>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="$vuetify.breakpoint.xs ? 'day' : 'month'"
            :first-interval="9"
            :interval-minutes="60"
            :interval-count="12"
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
import { mapMutations, mapActions, mapState } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'CalendarLessonsList',
  components: {
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      )
  },
  mixins: [componentButtonsCrud],
  data: () => ({
    focus: '',
    from: '',
    to: '',
    lessons: [], // Full lesson object
    events: [] // Formatted for the calendar
  }),
  computed: {
    ...mapState('lessonsStore', ['lesson']),
    title() {
      const { title } = this.$refs.calendar

      return title.charAt(0).toUpperCase() + title.slice(1)
    },
    headers() {
      return headers
    }
  },
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    ...mapMutations('lessonsStore', ['SET_LESSON']),
    viewDay({ date }) {
      this.focus = date
      this.type = 'day'
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

      this.SET_LESSON(lesson)
    },
    addLesson() {
      this.SET_LESSON(false)
      this.$router.push({ name: 'create-lessons' })
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
      this.SET_LESSON(this.lessons[0]) // TODO this is not right
      this.events = lessons.results.map((item) => {
        return {
          id: item.id,
          name: item.name,
          start: item.date + ' ' + item.start_time,
          end: item.date + ' ' + item.end_time,
          color: item.color || 'red',
          timed: false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped></style>
