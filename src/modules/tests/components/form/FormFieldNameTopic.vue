<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    vid="name"
    mode="aggressive"
    name="Nombre de Tema"
    :rules="rules"
  >
    <v-text-field
      ref="name-topic-field"
      v-model="name_topic"
      :counter="255"
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
  name: 'FormFieldNameTopic',
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
      name_topic: ''
    }
  },
  watch: {
    name_topic(value) {
      this.$emit('NameTopicBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.name_topic = ''
    },
    onFocusAccesKeyField() {
      this.$refs['name-topic-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['name-topic-field']['blur']()
    }
  }
}
</script>
