<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="name"
    mode="aggressive"
    name="Nombre de Subtema"
    :rules="rules"
  >
    <v-text-field
      ref="name-subtopic-field"
      v-model="name_subtopic"
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
  name: 'FormFieldNameSubtopic',
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
      name_subtopic: ''
    }
  },
  watch: {
    name_subtopic(value) {
      this.$emit('NameSubtopicBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.name_subtopic = ''
    },
    onFocusAccesKeyField() {
      this.$refs['name-subtopic-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['name-subtopic-field']['blur']()
    }
  }
}
</script>
