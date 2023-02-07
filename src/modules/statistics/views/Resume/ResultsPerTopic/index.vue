<template>
  <v-card-text>
    <!-- <pre>{{ topicsSelectedData }}</pre>
    <pre>{{ topicSelectedForQueryQuestionsWrong }}</pre> -->
    <resource-header-crud-title
      text-header="Resultados por tema"
      :can-rendering-header="$vuetify.breakpoint.width < 700"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-button-go-back-router />
      <resource-title-toolbar-datatable title-text="Resultados por tema" />
    </v-toolbar>
    <v-container>
      <v-select
        v-model="period"
        :items="periodsSelectForm"
        item-text="label"
        item-value="key"
        filled
        persistent-hint
        label="Selecciona un periodo"
        dense
      ></v-select>
    </v-container>
    <v-container>
      <select-topics-by-datatable
        title-top-datatable="Resultados de por tema (selecciona máximo 5 temas)"
        @emitChangeSelectedTopics="topicsSelectedData = $event"
      />
    </v-container>
    <v-container>
      <div class="d-flex justify-end my-2">
        <v-btn
          small
          :disabled="disabledButtonFetchRecord"
          color="light-blue darken-3"
          class="white--text mx-1 align-self-center"
          @click="getHistoryStatisticsDataGraphApiAction"
        >
          Mostrar gráfica
          <v-icon right dark class="mr-1"> mdi-refresh </v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-container class="ma-0 pa-0 d-flex justify-center mx-auto">
      <div class="mx-auto" style="width: 98% !important">
        <graph-statistics-topics-dialog
          ref="GraphStatisticsTopicsDialogComponent"
          :array-counts-questions-correct="arrayCountsQuestionsCorrect"
          :array-counts-questions-wrong="arrayCountsQuestionsWrong"
          :array-counts-questions-unanswered="arrayCountsQuestionsUnanswered"
          :categories-topics="categoriesTopics"
        />
      </div>
    </v-container>
  </v-card-text>
</template>

<script src="./ResultsPerTopic.js"></script>
<style src="./ResultsPerTopic.css"></style>
