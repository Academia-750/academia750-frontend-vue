<template>
  <v-card-text>
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
        > Cargar datos
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
    <v-container class="ma-0 pa-0">
      <graph-statistics-topics />
    </v-container>
  </v-card-text>
</template>

<script src="./Resume.js"></script>
<style src="./Resume.css"></style>
