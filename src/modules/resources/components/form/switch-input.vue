<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    mode="aggressive"
    :name="label"
    :vid="id"
  >
    <v-switch
      :id="id"
      class="py-0"
      :name="id"
      :value="value"
      :error-messages="errors"
      :label="label"
      readonly
      @click="onClick"
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
    id: {
      type: String,
      required: true
    }
  },
  watch: {
    value: {
      handler(value) {
        console.log({ value })
      },
      immediate: true
    }
  },
  methods: {
    onClick() {
      this.$emit('click', !this.value)
    }
  }
}
</script>
