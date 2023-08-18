<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    :vid="name"
    mode="aggressive"
    :name="label"
    :rules="rules"
  >
    <v-text-field
      v-model="time"
      :name="name"
      type="time"
      :error-messages="errors"
      :label="label"
      :disabled="disabled"
      prepend-icon="mdi-clock-time-four-outline"
      @change="onChange"
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'TimeInput',
  props: {
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      time: ''
    }
  },
  watch: {
    value(value) {
      this.time = this.value
    }
  },
  mounted() {
    this.time = this.value
  },
  methods: {
    onChange(time) {
      this.$emit('change', time)
    }
  }
}
</script>
