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
      :class="['py-0', { 'ma-0 mb-0': noMargin }]"
      :name="id"
      :input-value="value"
      :error-messages="hideDetails ? [] : errors"
      :hide-details="hideDetails"
      :label="label"
      :disabled="disabled"
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
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    },
    noMargin: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: [Boolean, String],
      default: false
    }
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return
      }
      this.$emit('click', !this.value)
    }
  }
}
</script>
