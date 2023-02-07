<template>
  <v-card-text>
    <!-- <pre>{{ topicsSelectedData }}</pre>
    <pre>{{ topicSelectedForQueryQuestionsWrong }}</pre> -->
    <resource-header-crud-title
      text-header="Resumen"
      :can-rendering-header="$vuetify.breakpoint.width < 700"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-button-go-back-router />
      <resource-title-toolbar-datatable title-text="5 temas a mejorar" />
    </v-toolbar>
    <v-container>
      <preview-topics-worst-tests
        :items-datatable="topicsWorstDataInTestsStudent"
      />
    </v-container>
    <v-container>
      <div class="d-flex justify-end my-2">
        <v-btn
          small
          color="light-blue darken-3"
          class="white--text mx-1 align-self-center"
          @click="showGraphTopicsToImproveInDialog"
        >
          Mostrar gráfica
          <v-icon right dark class="mr-1"> mdi-refresh </v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-container class="ma-0 pa-0 d-flex justify-center mx-auto">
      <div class="mx-auto" style="width: 98% !important">
        <graph-statistics-topics-dialog
          ref="GraphStatisticsTopicsToImproveDialogComponent"
          :array-counts-questions-correct="arrayCountsQuestionsCorrect"
          :array-counts-questions-wrong="arrayCountsQuestionsWrong"
          :array-counts-questions-unanswered="arrayCountsQuestionsUnanswered"
          :categories-topics="categoriesTopics"
        />
        <!-- <graph-statistics-topics
          :array-counts-questions-correct="arrayCountsQuestionsCorrect"
          :array-counts-questions-wrong="arrayCountsQuestionsWrong"
          :array-counts-questions-unanswered="arrayCountsQuestionsUnanswered"
          :categories-topics="categoriesTopics"
        /> -->
      </div>
    </v-container>
    <v-divider class="grey lighten-1 mt-6 mb-3"></v-divider>

  </v-card-text>
</template>

<script src="./FiveTopicToImprove.js"></script>
<style src="./FiveTopicToImprove.css"></style>
