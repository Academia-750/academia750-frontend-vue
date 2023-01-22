<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    vid="is-visibile"
    mode="aggressive"
    name="Pregunta estará visible para otros cuestionarios"
  >
    <v-checkbox
      v-model="is_visible"
      :disabled="isDisabled"
      :error-messages="errors"
      :readonly="readonly"
      color="blue darken-1"
      :label="`Es visible: ${is_visible_question}`"
    ></v-checkbox>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FormQuestionIsVisibleCheckbox',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      is_visible: true
    }
  },
  computed: {
    is_visible_question () {
      return this.is_visible ? 'Si' : 'No'
    }
  },
  watch: {
    is_visible(value) {
      this.$emit('QuestionIsCardMemoryBinding', value)
    }
  },
  methods: {
    resetIsCardMemory(value) {
      this.is_visible = value
    }
  }
}
</script>
