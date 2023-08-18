<template>
  <v-menu
    ref="datePicker"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <ValidationProvider
        ref="validationProvider"
        v-slot="{ errors }"
        mode="aggressive"
        :vid="name"
        :name="label"
        :rules="rules"
      >
        <v-text-field
          v-model="date"
          :name="name"
          :error-messages="errors"
          :label="label"
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
    name: {
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
    }
  },
  data: () => ({
    date: ''
  }),
  computed: {
    dateFormatted() {
      if (!this.date) {
        return ''
      }

      return moment(this.date).format('YYYY-MM-DD')
    },
    validDate() {
      console.log({ valid: moment(this.date).isValid() })
      // Not valid date can break the popup
      if (moment(this.date).isValid()) {
        return this.date
      }

      return ''
    }
  },
  watch: {
    value() {
      console.log('HEEERE!!')
      this.date = this.value
    }
  },
  mounted() {
    this.date = this.value || ''
  },

  methods: {
    onCalendarChange(value) {
      this.date = value
      this.emitDate()
    },
    emitDate() {
      this.$emit('datePicked', this.dateFormatted)
    }
  }
}
</script>
