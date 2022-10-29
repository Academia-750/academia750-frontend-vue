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
        <button-tooltip-secure-password class="d-none d-sm-none d-md-block"/>
      </template>
      <template v-if="canGeneratePasswordComputed" v-slot:append-outer>
        <button-generate-secure-password
          @PasswordGeneratedBinding="passwordGeneratedByButtonEvent"
        />
      </template>

    </v-text-field>
  </ValidationProvider>
</template>

<script>
import ButtonGenerateSecurePassword from './buttonGenerateSecurePassword.vue'
import ButtonTooltipSecurePassword from './buttonTooltipSecurePassword.vue'

export default {
  name: 'NewPasswordField',
  components: {
    ButtonTooltipSecurePassword,
    ButtonGenerateSecurePassword
  },
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
    canGeneratePassword: {
      type: Boolean,
      required: true
    },
    passwordGenerated: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showCurrentPassword: false,
      password: ''
    }
  },
  computed: {
    canMdBreakpoint () {
      return this.$vuetify.breakpoint.width > 960
    },
    canGeneratePasswordComputed () {
      return this.canMdBreakpoint && this.canGeneratePassword
    }
  },
  watch: {
    currentPassword(value) {
      this.$emit('PasswordBinding', value)
    },
    passwordGenerated(value) {
      this.password = value
      this.showCurrentPassword = true
    }
  },
  methods: {
    passwordGeneratedByButtonEvent (PASSWORD_GENERATED) {
      this.password = PASSWORD_GENERATED

      this.$emit('PasswordGeneratedBinding', PASSWORD_GENERATED)

      this.showCurrentPassword = true
    },
    resetField () {
      this.password = ''
      this.showCurrentPassword = false
    }
  }
}
</script>
