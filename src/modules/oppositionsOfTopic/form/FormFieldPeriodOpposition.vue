<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="period"
    mode="aggressive"
    name="Periodo de la oposicion"
    :rules="rules"
  >
    <v-text-field
      ref="period-opposition-field"
      v-model="period_opposition"
      :counter="100"
      label="Periodo"
      placeholder="Escribe el periodo"
      :error-messages="errors"
      :disabled="isDisabled"
      filled
      required
      clearable
      @keyup.enter="$emit('submitForm')"
    >
      <template v-slot:prepend>
        <v-icon class="d-none d-sm-none d-md-block">
          mdi-timeline
        </v-icon>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FormFieldPeriodOpposition',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      period_opposition: ''
    }
  },
  watch: {
    period_opposition(value) {
      this.$emit('PeriodOppositionBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.period_opposition = ''
    },
    onFocusAccesKeyField() {
      this.$refs['period-opposition-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['period-opposition-field']['blur']()
    }
  }
}
</script>
