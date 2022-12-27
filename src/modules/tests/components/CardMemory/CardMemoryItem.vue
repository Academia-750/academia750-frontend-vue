<template>
  <div>
    <p>{{ questionWithAnswers.attributes['question-text'] }}</p>
  </div>
</template>

<script>
export default {
  name: 'CardMemoryItem',
  props: {
    questionWithAnswers: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
