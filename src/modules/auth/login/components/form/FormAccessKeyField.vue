<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="vidValidationProvider"
    mode="eager"
    :name="nameValidationProvider"
    :rules="rules"
  >
    <v-text-field
      :id="idElement"
      :ref="refElement"
      v-model="access_key"
      :name="nameElement"
      :error-messages="errors"
      :disabled="isDisabled"
      :label="labelInput"
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
    },
    rules: {
      type: String,
      required: true
    },
    refElement: {
      type: String,
      default: 'access-key-field'
    },
    nameElement: {
      type: String,
      default: 'username'
    },
    idElement: {
      type: String,
      default: 'username'
    },
    labelInput: {
      type: String,
      default: 'DNI'
    },
    nameValidationProvider: {
      type: String,
      default: 'DNI/NIE'
    },
    vidValidationProvider: {
      type: String,
      default: 'access_key'
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
      this.$refs[this.refElement]['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs[this.refElement]['blur']()
    }
  }
}
</script>
