<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="name"
    mode="aggressive"
    name="Nombre de Oposicion"
    :rules="rules"
  >
    <v-text-field
      ref="name-opposition-field"
      v-model="name_opposition"
      :counter="100"
      label="Nombre"
      placeholder="Escribe el nombre"
      :error-messages="errors"
      :disabled="isDisabled"
      filled
      required
      clearable
      @keyup.enter="$emit('submitForm')"
    >
      <template v-slot:prepend>
        <v-icon class="d-none d-sm-none d-md-block">
          mdi-text-box-check
        </v-icon>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FormFieldNameOpposition',
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
      name_opposition: ''
    }
  },
  watch: {
    name_opposition(value) {
      this.$emit('NameOppositionBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.name_opposition = ''
    },
    onFocusAccesKeyField() {
      this.$refs['name-opposition-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['name-opposition-field']['blur']()
    }
  }
}
</script>
