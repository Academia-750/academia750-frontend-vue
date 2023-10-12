<template>
  <div>
    <v-row>
      <v-col>
        <v-sheet>
          <!--- TYPE VIEW --->
          <div flat class="d-flex justify-end">
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
          <!-- Calendar section -->
          <!--- MONTH SELECT --->
          <div flat class="d-flex justify-center mb-4">
            <div class="d-flex justify-center align-center">
              <v-btn fab x-small color="primary" @click="prev">
                <v-icon small> mdi-chevron-left </v-icon>
              </v-btn>
              <div v-if="loading" class="d-flex flex-column justify-center align-center pa-8">
                <v-progress-circular
                  :size="30"
                  :width="4"
                  color="primary"
                  indeterminate
                >
                </v-progress-circular>
                <p class="pa-1">Preparando tus clases...</p>
              </div>
              <div v-show="!loading">
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
                      {{ title() }}
                    </v-btn>
                  </template>
                  <v-date-picker
                    :value="focus"
                    position="left"
                    elevation="4"
                    no-title
                    :first-day-of-week="1"
                    @input="onMiniCalendar"
                  ></v-date-picker>
                </v-menu>
              </div>
              <v-btn fab x-small color="primary" @click="next">
                <v-icon small> mdi-chevron-right </v-icon>
              </v-btn>
            </div>
          </div>
          <!--- CALENDAR --->
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
            @change="onLoad"
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
    events: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    calendarMenu: false,
    types: [
      { key: 'month', label: 'Mensual' },
      { key: 'week', label: 'Semanal' }
    ]
  }),

  computed: {
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
    }
  },
  mounted() {},
  methods: {
    onDateClick(date) {
      this.$emit('date', date)
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
      this.$emit('event', event)
    },
    onLoad({ start, end }) {
      this.$emit('load', { start: start.date, end: end.date })
    },
    title() {
      if (!this.$refs.calendar) {
        return ''
      }
      const { title } = this.$refs.calendar

      return title.charAt(0).toUpperCase() + title.slice(1)
    }
  }
}
</script>
<style lang="scss" scoped></style>
