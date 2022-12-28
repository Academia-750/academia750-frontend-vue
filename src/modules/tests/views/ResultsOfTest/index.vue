<template>
  <div>
    <pre>
      {{ questionsDataHistoryByTest }}
    </pre>
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
  </div>
</template>
<script src="./ResultsOfTest.js"></script>
