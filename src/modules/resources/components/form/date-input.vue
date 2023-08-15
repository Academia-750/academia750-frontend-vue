<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    mode="aggressive"
    :name="label"
    :rules="rules"
  >
    <v-menu
      ref="datePicker"
      v-model="dateMenu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateFormatted"
          :error-messages="errors"
          label="Date"
          hint="MM/DD/YYYY format"
          persistent-hint
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          filled
          @blur="date = parseDate(dateFormatted)"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        no-title
        @input="dateMenu = false"
      ></v-date-picker>
    </v-menu>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'DateInput',
  props: {
    date: {
      type: Date,
      default: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }
  },
  data: (vm) => ({
      dateMenu: false,
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
  }),
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
    }
  }
}
</script>
