<template>
  <v-card-text class="ma-0 pa-0">
    <v-data-table
      :headers="headersDatatable"
      :items="itemsDatatable"
      multi-sort
      no-data-text="No hay temas disponibles"
      :items-per-page="10"
      :mobile-breakpoint="600"
      :search="search"
      class="elevation-1"
    >
      <template v-slot:no-data>
        <resource-banner-no-data-datatable
          message-text="No hay temas disponibles"
        />
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script src="./previewTopicsWorstTests.js"></script>
<style src="./previewTopicsWorstTests.css"></style>
