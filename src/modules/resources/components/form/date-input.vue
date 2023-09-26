<template>
  <v-menu
    ref="datePicker"
    v-model="isOpen"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    :disabled="disabled"
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <ValidationProvider
        ref="validationProvider"
        v-slot="{ errors }"
        mode="aggressive"
        :vid="id"
        :name="label"
        :rules="rules + valid_date"
      >
        <v-text-field
          :id="id"
          v-model="date"
          :name="id"
          :error-messages="errors"
          :label="label"
          :disabled="disabled"
          prepend-icon="mdi-calendar"
          v-bind="attrs"
          filled
          @blur="emitDate"
          v-on="on"
        ></v-text-field>
      </ValidationProvider>
    </template>
    <v-date-picker
      :value="validDate"
      :first-day-of-week="1"
      no-title
      @change="onCalendarChange"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'

export default {
  name: 'DateInput',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: moment().format('YYYY-MM-DD')
    },
    rules: {
      type: String,
      default: ''
    },
    format: {
      type: String,
      default: 'DD/MM/YYYY'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    date: '',
    isOpen: false
  }),
  computed: {
    valid_date() {
      // In case they already pass this prop
      if (this.rules && this.rules.includes('valid_date')) {
        return ''
      }
      // Append the rule validation according to the format
      const rule =
        (this.rules ? '|' : '') +
        'valid_date' +
        (this.format ? `:${this.format}` : '')

      return rule
    },
    validDate() {
      if (!this.date) {
        return ''
      }
      // Not valid date can break the popup
      if (moment(this.date, this.format).isValid()) {
        return moment(this.date, this.format).format('YYYY-MM-DD')
      }

      return ''
    }
  },
  watch: {
    value() {
      this.date = this.value ? moment(this.value).format(this.format) : ''
    }
  },
  mounted() {
    this.date = this.value ? moment(this.value).format(this.format) : ''
  },

  methods: {
    onCalendarChange(value) {
      this.date = moment(value).format(this.format)
      this.emitDate()
      this.isOpen = false
    },
    emitDate() {
      this.$emit('datePicked', this.validDate)
    }
  }
}
</script>
