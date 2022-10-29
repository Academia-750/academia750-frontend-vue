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
      @click:append="showCurrentPassword = !showCurrentPassword"
    >
      <template v-slot:prepend>
        <v-fade-transition leave-absolute>
          <v-tooltip
            bottom
          >
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">
                mdi-help-circle-outline
              </v-icon>
            </template>
            <p class="caption"> - Entre 8 y 15 carácteres </p>
            <p class="caption"> - Al menos 1 minúscula y 1 mayúscula </p>
            <p class="caption"> - Al menos 1 dígito </p>
            <p class="caption"> - No espacios en blanco </p>
            <p class="caption"> - Al menos un carácter especial </p>
          </v-tooltip>
        </v-fade-transition>
      </template>
      <template v-if="canGeneratePassword" v-slot:append-outer>
        <v-fade-transition leave-absolute>
          <v-btn color="primary" small @click="generateRandomSecurePassword"> <v-icon small class="mr-1">mdi-cog-sync</v-icon> Generar </v-btn>
        </v-fade-transition>
      </template>

    </v-text-field>
  </ValidationProvider>
</template>

<script>
import generateSecureRandomPassword from 'secure-random-password'

export default {
  name: 'NewPasswordField',
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
  watch: {
    currentPassword(value) {
      this.$emit('PasswordBinding', value)
    },
    passwordGenerated (value) {
      console.log(value)
      this.password = value
    }
  },
  methods: {
    generateRandomSecurePassword () {
      const PASSWORD_GENERATED = generateSecureRandomPassword.randomPassword(
        {
          characters: [
            { characters: generateSecureRandomPassword.lower, exactly: 2 },
            { characters: generateSecureRandomPassword.symbols, exactly: 2 },
            generateSecureRandomPassword.upper,
            { characters: generateSecureRandomPassword.digits, exactly: 2 }
          ],
          length: parseInt(Math.random() * (15, 8) + 8)
        }
      )

      this.password = PASSWORD_GENERATED

      this.$emit('PasswordGeneratedBinding', PASSWORD_GENERATED)

      this.showCurrentPassword = true
    }
  }
}
</script>
