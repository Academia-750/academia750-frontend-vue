<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    mode="aggressive"
    :name="label"
    :vid="name"
  >
    <v-switch
      :name="name"
      :value="value"
      :error-messages="errors"
      :label="label"
      @change="onClick"
    ></v-switch>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'SwitchInput',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    onClick(value) {
      this.$emit('change', value)
    }
  }
}
</script>
