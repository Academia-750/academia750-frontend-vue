<template>
  <ValidationProvider
    v-slot="{ errors }"
    :vid="vid"
    mode="aggressive"
    :name="nameProvider"
    :rules="rules"
  >
    <v-text-field
      v-model="password"
      class="input-group--focused"
      :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :type="showCurrentPassword ? 'text' : 'password'"
      :label="label"
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
  name: 'ConfirmPasswordField',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      required: true
    },
    vid: {
      type: String,
      required: true
    },
    nameProvider: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    passwordGenerated: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showCurrentPassword: false,
      password: ''
    }
  },
  watch: {
    passwordGenerated(value) {
      this.password = value
      this.showCurrentPassword = true
    }
  },
  methods: {
    resetField () {
      this.password = ''
      this.showCurrentPassword = false
    }
  }
}
</script>
