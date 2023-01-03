<template>
  <v-card
    class="mx-auto"
    max-width="100%"
    tile
  >
    <v-list rounded>
      <v-list-item-group
        v-model="answer_selected_id"
        color="primary"
      >
        <v-list-item
          v-for="answer in answers"
          :key="answer.value"
          :value="answer.value"
        >
          <v-list-item-content>
            <v-list-item-title v-text="answer.answer"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'AnswersListSolveActionQuestionnaire',
  props: {
    answers: {
      type: Array,
      required: true
    },
    questionUuid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      answer_selected_id: null
    }
  },
  watch: {
    answer_selected_id(value) {
      //this.resolveQuestion()
      this.$emit('AnswerSelectedBinding', value)
      this.$emit('changeSelectedAnswer', value)
    }
  }
}
</script>
