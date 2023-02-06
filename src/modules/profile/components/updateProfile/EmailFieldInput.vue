<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="email"
    mode="aggressive"
    name="Email"
    :rules="rules"
  >
    <v-text-field
      id="__email_person"
      ref="email-field"
      v-model="email"
      name="__email"
      :error-messages="errors"
      :disabled="isDisabled"
      :filled="isFilled"
      :solo="isSolo"
      label="Email"
      required
      clearable
      @keyup.enter="$emit('submitForm')"
    >
      <template v-if="hasPrependIcon" v-slot:prepend>
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
    },
    isFilled: {
      type: Boolean,
      default: true
    },
    isSolo: {
      type: Boolean,
      default: false
    },
    hasPrependIcon: {
      type: Boolean,
      default: true
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
