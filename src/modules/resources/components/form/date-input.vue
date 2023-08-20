<template>
  <v-menu
    ref="datePicker"
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
        :rules="rules"
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
    disabled: {
      type: Boolean,
      default: false
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
