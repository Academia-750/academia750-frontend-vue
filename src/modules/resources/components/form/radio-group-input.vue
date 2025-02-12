<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    :vid="id"
    mode="aggressive"
    :name="label"
    :rules="rules"
  >
    <v-radio-group
      :id="id"
      :value="value"
      :name="id"
      :error-messages="errors"
      :label="label"
      :disabled="disabled"
      row
      @change="onChange"
    >
      <v-radio
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value"
      ></v-radio>
    </v-radio-group>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'RadioGroupInput',
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
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
    },
    options: {
      type: Array,
      required: true,
      validator: (value) => {
        return value.every(
          (option) =>
            typeof option === 'object' && 'label' in option && 'value' in option
        )
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    onChange(value) {
      this.$emit('input', value)
    }
  }
}
</script>
