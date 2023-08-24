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
