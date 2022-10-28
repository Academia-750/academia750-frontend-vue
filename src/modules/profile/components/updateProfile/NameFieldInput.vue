<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="first-name"
    mode="aggressive"
    name="Nombre"
    :rules="rules"
  >
    <v-text-field
      ref="name-person-field"
      v-model="name_person"
      :counter="25"
      :error-messages="errors"
      :disabled="isDisabled"
      label="Nombre"
      filled
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
      name_person: ''
    }
  },
  watch: {
    name_person(value) {
      this.$emit('NamePersonBinding', value)
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
