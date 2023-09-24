<template>
  <div>
    <v-date-picker
      :value="focus"
      position="left"
      elevation="4"
      no-title
      :first-day-of-week="1"
      :event-color="getEventColor"
      :events="daysWithValue"
      :reactive="true"
      @change="onInputChange"
      @update:picker-date="onLoad"
    >
    </v-date-picker>
    <div class="mb-2"></div>
    <div
      v-for="(event, index) in selectedDateEvents"
      :key="index"
      @click="onEvent(event)"
    >
      <v-sheet class="relative d-flex elevation-2 mt-1 mb-2">
        <div class="event-item">
          <div class="d-flex flex-column justify-center">
            <span class="font-weight-medium text-xs-caption text-sm-h7">
              {{ event.name }}
            </span>
            <span class="font-weight-medium text-xs-caption text-sm-h7">
              {{ date(event.start, 'HH:MM A') }} a
              {{ date(event.end, 'HH:MM A') }}
            </span>
          </div>
          <slot name="actions" v-bind="event"> </slot>
        </div>

        <div
          class="event-date d-flex flex-column items-center primary p-2 white--text"
        >
          <span class="font-weight-medium">
            {{ date(event.start, 'DD') }}
          </span>
          <span class="font-weight-medium">
            {{ date(event.start, 'MMM') }}
          </span>
        </div>
      </v-sheet>
    </div>
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
    }
  },
  data: () => ({}),
  computed: {
    daysWithValue() {
      return this.events.map((event) =>
        moment(event.start).format('YYYY-MM-DD')
      )
    },

    selectedDateEvents() {
      return this.events.filter((event) =>
        moment(event.start).isSame(this.focus, 'day')
      )
    }
  },
  mounted() {
    this.$emit('load', {
      start: moment(this.focus).startOf('month').format('YYYY-MM-DD'),
      end: moment(this.focus).endOf('month').format('YYYY-MM-DD')
    })
  },
  methods: {
    getDateColor(date) {
      // Get the list of colors used on this day
      return _.uniq(
        this.events
          .filter((event) => moment(event.start).isSame(date))
          .map((event) => event.color)
      )
    },

    onLoad(date) {
      if (
        moment(this.focus).isSame(date, 'month') &&
        moment(this.focus).isSame(date, 'year')
      ) {
        return
      }
      this.$emit('load', {
        start: moment(date).startOf('month').format('YYYY-MM-DD'),
        end: moment(date).endOf('month').format('YYYY-MM-DD')
      })
      this.$emit('focus', date)
    },

    onInputChange(value) {
      this.$emit('focus', value)
    },

    getEventColor(date) {
      return this.events
        .filter((event) => moment(event.start).isSame(date, 'day'))
        .map((event) => (event.is_active ? '#cccccc' : event.color))
    },

    onEvent(event) {
      this.$emit('event', event)
    },

    date(date, format) {
      return moment(date).locale('es-ES').format(format)
    }
  }
}
</script>
<style lang="scss" scoped>
.event-date {
  width: 45px;
  height: 45px;
  position: absolute;
  bottom: 4px;
  align-items: center;
  left: -3px;

  span:first-child {
    padding-top: 2px;
    font-size: 18px;
  }
  span:nth-child(2) {
    font-size: 10px;
    text-transform: capitalize;
    padding-bottom: 2px;
  }
}
.event-item {
  padding-left: 48px;
  height: 54px;
  display: flex;
  justify-items: center;
  flex: 1;
}
.relative {
  position: relative;
}
</style>
