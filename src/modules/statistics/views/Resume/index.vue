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
      <resource-title-toolbar-datatable title-text="Resumen" />
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
        > Mostrar gráfica
          <v-icon
            right
            dark
            class="mr-1"
          >
            mdi-refresh
          </v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-container class="ma-0 pa-0 d-flex justify-center mx-auto">
      <div class="mx-auto" style="width: 98% !important">
        <graph-statistics-topics
          :array-counts-questions-correct="arrayCountsQuestionsCorrect"
          :array-counts-questions-wrong="arrayCountsQuestionsWrong"
          :array-counts-questions-unanswered="arrayCountsQuestionsUnanswered"
          :categories-topics="categoriesTopics"
        />
      </div>
    </v-container>
    <v-divider class="grey lighten-1 mt-6 mb-3"></v-divider>
    <v-container>
      <preview-topics-worst-tests
        :items-datatable="topicsWorstDataInTestsStudent"
      />
    </v-container>
    <v-divider class="grey lighten-1 mt-6 mb-3"></v-divider>
    <v-container>
      <select-topics-by-datatable
        single-select-datatable
        title-top-datatable="Preguntas incorrectas por tema"
        @emitChangeSelectedTopics="topicSelectedForQueryQuestionsWrong = $event"
      />
    </v-container>
    <v-container>
      <div class="my-1 d-flex justify-center">
        <span class="text-caption">Recuerda tener 1 tema seleccionado</span>
      </div>
      <div class="d-flex justify-end my-2">
        <v-btn
          small
          color="light-blue darken-3"
          class="white--text mx-1 align-self-center"
          @click="getHistoryStatisticsQuestionsFailedTests"
        > Mostrar preguntas
          <v-icon
            right
            dark
            class="mr-1"
          >
            mdi-refresh
          </v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-container>
      <questions-wrong-by-topic
        ref="QuestionsWrongByTopic"
      />
    </v-container>
  </v-card-text>
</template>

<script src="./Resume.js"></script>
<style src="./Resume.css"></style>
