<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="current-password"
    mode="aggressive"
    name="Contraseña actual"
    :rules="rules"
  >
    <v-text-field
      ref="current-password-field"
      v-model="currentPassword"
      class="input-group--focused"
      :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showCurrentPassword ? 'text' : 'password'"
      label="Contraseña actual"
      :error-messages="errors"
      :disabled="isDisabled"
      filled
      clearable
      @click:append="showCurrentPassword = !showCurrentPassword"
    >
      <template v-slot:prepend>
        <v-icon class="d-none d-sm-none d-md-block">
          mdi-lock
        </v-icon>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'CurrentPasswordInput',
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
      showCurrentPassword: false,
      currentPassword: ''
    }
  },
  watch: {
    currentPassword(value) {
      this.$emit('CurrentPasswordBinding', value)
    }
  },
  methods: {
    resetField () {
      this.currentPassword = ''
      this.showCurrentPassword = false
    }
  }
}
</script>
