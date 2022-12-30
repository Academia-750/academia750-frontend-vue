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
      <select-topics-by-datatable />
    </v-container>
    <v-container>
      <graph-statistics-topics />
    </v-container>
  </v-card-text>
</template>

<script src="./Resume.js"></script>
<style src="./Resume.css"></style>
