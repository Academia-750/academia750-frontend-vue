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
      <template v-slot:top>
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->

        <resource-header-crud-title
          text-header="Los 5 peores temas"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar
          flat
          class="blue lighten-4 my-2"
          outlined
        >
          <resource-title-toolbar-datatable title-text="Los 5 peores temas" />
        </v-toolbar>
        <!-- <resource-text-field-search
          ref="ResourceTextFieldSearch"
          label-text-field="Buscar temas"
          @emitSearchTextBinding="search = $event"
        /> -->
      </template>
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
