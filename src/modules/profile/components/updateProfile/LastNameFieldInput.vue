<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="name_person"
    mode="aggressive"
    name="Nombre"
    :rules="rules"
  >
    <v-text-field
      ref="name-person-field"
      v-model="last_name"
      :counter="25"
      :error-messages="errors"
      :disabled="isDisabled"
      filled
      label="Apellidos"
      required
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
    name_person(value) {
      this.$emit('LastNamePersonBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.name_person = ''
    },
    onFocusAccesKeyField() {
      this.$refs['name-person-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['name-person-field']['blur']()
    }
  }
}
</script>
