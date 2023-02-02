<template>
  <v-card-text>
    <!-- <pre>{{ topicsSelectedData }}</pre>
    <pre>{{ topicSelectedForQueryQuestionsWrong }}</pre> -->
    <resource-header-crud-title
      text-header="Histórico de preguntas"
      :can-rendering-header="$vuetify.breakpoint.width < 700"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-button-go-back-router />
      <resource-title-toolbar-datatable title-text="Histórico de preguntas" />
    </v-toolbar>
    <v-container>
      <v-select
        v-model="periodSelected"
        :items="periodsSelectForm"
        item-text="label"
        item-value="key"
        filled
        persistent-hint
        label="Selecciona un periodo"
        dense
      ></v-select>
    </v-container>
    <v-container class="ma-0 pa-0 d-flex justify-center mx-auto">
      <div class="mx-auto" style="width: 98% !important">
        <select-tests-by-datatable
          ref="TestsByPeriodDatatable"
          single-select-datatable
          title-top-datatable="Tests por periodo"
          @emitChangeSelectedTests="testSelected = $event"
        />
      </div>
    </v-container>
    <v-divider class="grey lighten-2 mt-6 mb-3"></v-divider>
    <v-container>
      <v-select
        v-model="typeQuestionSelected"
        :items="typeQuestionsSelectForm"
        item-text="label"
        item-value="key"
        filled
        persistent-hint
        label="Selecciona el tipo de pregunta"
        dense
      ></v-select>
    </v-container>
    <v-container>
      <div class="my-1 d-flex justify-center">
        <span class="text-caption">Recuerda tener 1 test seleccionado</span>
      </div>
      <div class="d-flex justify-end my-2">
        <v-btn
          small
          color="light-blue darken-3"
          class="white--text mx-1 align-self-center"
          :disabled="!testSelected"
          @click="fetchRecordData"
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
    <v-container v-if="totalNumberPages > 0" class="max-width d-flex justify-center">
      <v-pagination
        v-model="pageNumber"
        class="my-4"
        :length="totalNumberPages"
      ></v-pagination>
    </v-container>
    <v-container class="mt-1">
      <v-row dense>
        <v-col
          v-for="(questionItem) in questionDataHistory"
          :key="`section-item-question-result-${questionItem.id}`"
          cols="12"
        >
          <div :id="`element-item-question-result-${questionItem.id}`">
            <item-question-history-test :question="questionItem" :questions-data-history="questionDataHistoryState" />
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="questionDataHistory.length === 0" class="d-flex justify-center">
      <span class="title font-weight-black">No se encontraron resultados para tu búsqueda</span>
    </v-container>
    <v-container v-if="totalNumberPages > 0" class="max-width d-flex justify-center">
      <v-pagination
        v-model="pageNumber"
        class="my-4"
        :length="totalNumberPages"
      ></v-pagination>
    </v-container>
  </v-card-text>
</template>

<script src="./HistoryQuestionsStudent.js"></script>
<style src="./HistoryQuestionsStudent.css"></style>
