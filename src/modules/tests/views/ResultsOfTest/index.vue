<template>
  <div ref="viewResultsOfTestComponent">
    <v-toolbar>
      <v-toolbar-title class="d-flex align-items-center">
        <v-icon large class="mx-1">mdi-book-edit</v-icon>
        <span class="font-weight-bold d-none d-sm-inline text-xs-caption text-sm-h6">Resultados del Test</span>
      </v-toolbar-title>

      <!-- <v-spacer></v-spacer>

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
      </v-btn> -->
    </v-toolbar>
    <div v-if="testData">
      <head-results-history-test
        :total-questions-correct="testData.attributes.total_questions_correct"
        :total-questions-wrong="testData.attributes.total_questions_wrong"
        :total-questions-unanswered="testData.attributes.total_questions_unanswered"
      />
      <div class="my-2 d-flex justify-center mx-auto">
        <span class="font-weight-black display-1 mx-auto">Puntuación total: {{ testData.attributes.test_result }}</span>
      </div>
      <symbology-history-test />
      <v-container>
        <v-divider class="grey lighten-2"></v-divider>
      </v-container>
      <v-container class="mt-1">
        <resume-question-state-history-test
          :questions-data-history="questionDataHistoryState"
          :questions="questionsDataHistoryByTest"
          @scrollToElementRefQuestion="scrollToElementRefQuestion"
        />
      </v-container>
      <v-container class="max-width d-flex justify-center">
        <v-pagination
          v-model="pageNumber"
          class="my-4"
          :length="totalNumberPages"
        ></v-pagination>
      </v-container>
      <v-container class="mt-1">
        <v-divider class="grey lighten-2"></v-divider>
        <v-row dense>
          <v-col
            v-for="(questionItem) in questionsDataHistoryByTest"
            :key="`section-item-question-result-${questionItem.id}`"
            cols="12"
          >
            <div :id="`element-item-question-result-${questionItem.id}`">
              <item-question-history-test :question="questionItem" :questions-data-history="questionDataHistoryState" />
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-container class="max-width d-flex justify-center">
        <v-pagination
          v-model="pageNumber"
          class="my-4"
          :length="totalNumberPages"
        ></v-pagination>
      </v-container>
      <v-fab-transition>
        <v-btn
          class="my-5 mx-2"
          color="blue lighten-3"
          dark
          fixed
          small
          bottom
          right
          fab
          @click="$vuetify.goTo(0)"
        >
          <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>
  </div>
</template>
<script src="./ResultsOfTest.js"></script>
