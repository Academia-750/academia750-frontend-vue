<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="email"
    mode="aggressive"
    name="Correo electrónico"
    :rules="rules"
  >
    <v-text-field
      ref="email-field"
      v-model="email"
      :error-messages="errors"
      :disabled="isDisabled"
      filled
      label="Correo electrónico"
      required
      clearable
      @keyup.enter="$emit('submitForm')"
    >
      <template v-slot:prepend>
        <v-icon class="d-none d-sm-none d-md-block">
          mdi-email
        </v-icon>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'EmailFieldInput',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      email: ''
    }
  },
  watch: {
    email(value) {
      this.$emit('EmailBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.name_person = ''
    },
    onFocusAccesKeyField() {
      this.$refs['email-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['email-field']['blur']()
    }
  }
}
</script>
