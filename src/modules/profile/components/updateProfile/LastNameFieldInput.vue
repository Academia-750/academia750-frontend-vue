<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="last-name"
    mode="aggressive"
    name="Nombre"
    :rules="rules"
  >
    <v-text-field
      ref="last-name-field"
      v-model="last_name"
      :counter="25"
      :error-messages="errors"
      :disabled="isDisabled"
      filled
      label="Apellidos"
      required
      clearable
      @keyup.enter="$emit('submitForm')"
    >
      <template v-slot:prepend>
        <v-icon class="d-none d-sm-none d-md-block">
          mdi-account
        </v-icon>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'NamePersonFieldInput',
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
      last_name: ''
    }
  },
  watch: {
    last_name(value) {
      this.$emit('LastNamePersonBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.last_name = ''
    },
    onFocusAccesKeyField() {
      this.$refs['last-name-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['last-name-field']['blur']()
    }
  }
}
</script>
