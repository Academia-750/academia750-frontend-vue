<template>
  <div>
    <v-toolbar>
      <v-toolbar-title class="d-flex align-items-center">
        <v-icon large class="mx-1">mdi-book-edit</v-icon>
        <span class="font-weight-bold d-none d-sm-inline text-xs-caption text-sm-h6">Resultados del Test</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        color="teal darken-2"
        class="white--text"
        title="Cargar nuevamente mis datos"
        @click="fetchRecordData"
      >
        <v-icon
          right
          dark
          class="mx-1"
        >
          mdi-reload
        </v-icon>
        <span class="d-none d-sm-inline">Cargar</span>
      </v-btn>
    </v-toolbar>
    <div v-if="testData">
      <head-results-history-test
        :total-questions-correct="testData.attributes.total_questions_correct"
        :total-questions-wrong="testData.attributes.total_questions_wrong"
        :total-questions-unanswered="testData.attributes.total_questions_unanswered"
      />
      <div class="my-2 d-flex justify-center">
        <span class="font-weight-black display-1">Puntuación total: {{ testData.attributes.test_result }}</span>
      </div>
      <symbology-history-test />
      <v-container>
        <v-divider class="grey lighten-2 my-1"></v-divider>
      </v-container>
      <v-container class="mt-3">
        <resume-question-state-history-test />
      </v-container>
    </div>
  </div>
</template>
<script src="./ResultsOfTest.js"></script>
