<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    mode="aggressive"
    :vid="name"
    :name="label"
    :rules="rules"
  >
    <v-text-field
      :name="name"
      :error-messages="errors"
      :disabled="disabled"
      filled
      :label="label"
      required
      clearable
      @keyup.enter="update(value)"
    >
      <template v-if="icon" v-slot:prepend>
        <v-icon class="d-none d-sm-none d-md-block">
          {{ icon }}
        </v-icon>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FieldInput',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      value: ''
    }
  },
  watch: {
    value(value) {
      this.update(value)
    }
  },
  mounted() {
    this.resetErrors()
  },
  methods: {
    resetErrors() {
      this.$refs.validationProvider.reset()
    },
    update(value) {
      this.$emit('input', value)
    }
  }
}
</script>
