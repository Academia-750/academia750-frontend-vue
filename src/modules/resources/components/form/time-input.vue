<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    mode="aggressive"
    :name="label"
  >
    <v-menu
      ref="timePicker"
      v-model="open"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="time"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="time"
          :error-messages="errors"
          :label="label"
          prepend-icon="mdi-clock-time-four-outline"
          readonly
          v-bind="attrs"
          filled
          v-on="on"
        ></v-text-field>
      </template>
      <v-time-picker
        v-if="open"
        v-model="time"
        full-width
        @click:minute="selectTime(time)"
      ></v-time-picker>
    </v-menu>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'TimeInput',
  props: {
    time: {
      type: Date,
      default: null
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      open: false
    }
  },
  watch: {
      date () {
        this.dateFormatted = this.formatDate(this.date)
        this.$emit('datePicked', this.dateFormatted)
      }
    },
  methods: {
    formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')

        return `${month}/${day}/${year}`
    },
    parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')

        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    selectTime(time) {
      this.$refs.timePicker.save(time)
      this.$emit('timeSelected', time)
    }
  }
}
</script>
