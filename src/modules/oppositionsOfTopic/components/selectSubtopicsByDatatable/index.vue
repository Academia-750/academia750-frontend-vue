<template>
  <v-card-text>
    <v-data-table
      v-model="subtopicsSelected"
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
      :single-select="false"
      show-select
      item-key="id"
      multi-sort
      no-data-text="No hay datos disponibles"
      :items-per-page="5"
      :mobile-breakpoint="600"
      class="elevation-1"
      :server-items-length="informationMeta.total"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->

        <resource-header-crud-title
          text-header="Selecciona los subtemas"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar
          flat
          class="indigo lighten-5 my-2"
          outlined
        >
          <resource-title-toolbar-datatable title-text="Selecciona los subtemas" />
        </v-toolbar>
        <resource-text-field-search
          ref="ResourceTextFieldSearch"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable/>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script src="./selectSubtopicsByDatatable.js"></script>
<style src="./selectSubtopicsByDatatable.css"></style>
