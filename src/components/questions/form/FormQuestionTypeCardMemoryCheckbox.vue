<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    vid="is-card-memory"
    mode="aggressive"
    name="Pregunta para tarjeta de memoria"
  >
    <v-checkbox
      v-model="is_card_memory"
      :disabled="isDisabled"
      :error-messages="errors"
      color="blue darken-1"
      required
      type="checkbox"
      :label="`Es para tarjeta de memoria: ${question_for_card_memory_label}`"
    ></v-checkbox>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FormQuestionTypeCardMemoryCheckbox',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      is_card_memory: false
    }
  },
  computed: {
    question_for_card_memory_label () {
      return this.is_card_memory ? 'Si' : 'No'
    }
  },
  watch: {
    is_card_memory(value) {
      this.$emit('QuestionIsCardMemoryBinding', value)
    }
  },
  methods: {
    resetIsCardMemory() {
      this.is_card_memory = ''
    }
  }
}
</script>
