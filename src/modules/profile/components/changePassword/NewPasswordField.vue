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

    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
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
    }
  },
  methods: {
  }
}
</script>
