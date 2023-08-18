<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    mode="aggressive"
    :name="label"
  >
    <v-menu
      ref="datePicker"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          :value="dateFormatted"
          :error-messages="errors"
          label="Date"
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          filled
          @blur="emitDate"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title @change="emitDate"></v-date-picker>
    </v-menu>
  </ValidationProvider>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DateInput',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: moment().format('YYYY/MM/DD')
    }
  },
  data: (vm) => ({
    date: ''
  }),
  computed: {
    dateFormatted() {
      if (!this.date) {
        return ''
      }

      return moment(this.date).format('YYYY/MM/DD')
    }
  },
  watch: {
    value() {
      this.date = this.parseDate(this.value)
    }
  },
  mounted() {
    if (this.value) {
      this.date = this.parseDate(this.value)
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')

      return `${year}/${month}/${day}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')

      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    emitDate() {
      this.$emit('datePicked', this.dateFormatted)
    }
  }
}
</script>
