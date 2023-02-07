<template>
  <v-card-text>
    <!-- <pre>{{ topicsSelectedData }}</pre>
    <pre>{{ topicSelectedForQueryQuestionsWrong }}</pre> -->
    <resource-header-crud-title
      text-header="Errores por tema"
      :can-rendering-header="$vuetify.breakpoint.width < 700"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-button-go-back-router />
      <resource-title-toolbar-datatable title-text="Errores por tema" />
    </v-toolbar>
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
        >
          Mostrar preguntas
          <v-icon right dark class="mr-1"> mdi-refresh </v-icon>
        </v-btn>
      </div>
    </v-container>
    <v-container>
      <questions-wrong-by-topic ref="QuestionsWrongByTopic" />
    </v-container>
  </v-card-text>
</template>

<script src="./QuestionsWrongPerTopic.js"></script>
<style src="./QuestionsWrongPerTopic.css"></style>
