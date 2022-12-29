<template>
  <claim-question-card-memory :question-uuid="question.id" />
</template>

<script>
import ClaimQuestionCardMemory from '../CardMemory/ClaimQuestionCardMemory'

export default {
  name: 'ClaimQuestionHistoryTest',
  components: {
    ClaimQuestionCardMemory
  },
  props: {
    question: {
      type: Object,
      required: true
    }
  }
}
</script>
