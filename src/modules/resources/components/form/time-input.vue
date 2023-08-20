<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    :vid="id"
    mode="aggressive"
    :name="label"
    :rules="rules"
  >
    <v-text-field
      :id="id"
      v-model="time"
      :name="id"
      type="time"
      :error-messages="errors"
      :label="label"
      :filled="filled"
      :disabled="disabled"
      :outlined="outlined"
      prepend-icon="mdi-clock-time-four-outline"
      @change="onChange"
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'TimeInput',
  props: {
    id: {
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
    outlined: {
      type: Boolean,
      default: false
    },
    filled: {
      type: Boolean,
      default: true
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
