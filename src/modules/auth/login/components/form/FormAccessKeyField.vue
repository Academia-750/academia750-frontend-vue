<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="access_key"
    mode="aggressive"
    name="Identificador de acceso"
    rules="required|min:8|max:10"
  >
    <v-text-field
      ref="access-key-field"
      v-model="access_key"
      :counter="10"
      :error-messages="errors"
      :disabled="isDisabled"
      label="DNI"
      outlined
      required
      @keyup.enter="$emit('submitForm')"
    ></v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'LoginFormAccessKeyField',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      access_key: ''
    }
  },
  watch: {
    access_key(value) {
      this.$emit('AccessKeyBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.access_key = ''
    },
    onFocusAccesKeyField() {
      this.$refs['access-key-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['access-key-field']['blur']()
    }
  }
}
</script>
