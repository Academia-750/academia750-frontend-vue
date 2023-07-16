<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="dni"
    mode="aggressive"
    name="DNI/NIE"
    :rules="rules"
  >
    <v-text-field
      ref="dni-field"
      v-model="dni"
      :error-messages="errors"
      :disabled="isDisabled"
      filled
      label="DNI/NIE"
      placeholder="DNI/NIE"
      required
      clearable
      @keyup.enter="$emit('submitForm')"
    >
      <template v-slot:prepend>
        <v-icon class="d-none d-sm-none d-md-block">
          mdi-card-account-details
        </v-icon>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'UpdateProfileDNIField',
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
      dni: ''
    }
  },
  watch: {
    dni(value) {
      this.$emit('DniBinding', value)
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
