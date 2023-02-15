<template>
  <v-container class="mt-3 mb-1">
    <v-row dense>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        xl="4"
        class="d-flex justify-center"
      >
        <span class="font-weight-bold">Respuestas correctas: </span>
        <span class="ml-1 green--text font-weight-bold">{{ totalQuestionsCorrect }}</span>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="4"
        xl="4"
        class="d-flex justify-center"
      >
        <span class="font-weight-bold">Respuestas erróneas: </span>
        <span class="ml-1 red--text font-weight-bold">{{ totalQuestionsWrong }}</span>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
        xl="4"
        class="d-flex justify-center"
      >
        <span class="font-weight-bold">Preguntas no respondidas: </span>
        <span class="ml-1 secondary--text font-weight-bold">{{ totalQuestionsUnanswered }}</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HeadResultsHistoryTest',
  props: {
    totalQuestionsCorrect: {
      type: [String, Number],
      required: true
    },
    totalQuestionsWrong: {
      type: [String, Number],
      required: true
    },
    totalQuestionsUnanswered: {
      type: [String, Number],
      required: true
    }
  }
}
</script>
