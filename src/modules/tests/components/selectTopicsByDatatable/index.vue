<template>
  <v-card-text class="ma-0 pa-0">
    <v-data-table
      v-model="topicsSelected"
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
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
          text-header="Selecciona los temas"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar
          flat
          class="blue lighten-4 my-2"
          outlined
        >
          <resource-title-toolbar-datatable title-text="Selecciona los temas" />
          <v-spacer></v-spacer>
          <v-btn
            small
            color="light-blue darken-3"
            class="white--text mx-1 align-self-center"
            @click="loadDataTopics"
          >
            <v-icon
              right
              dark
              class="mr-1"
            >
              mdi-refresh
            </v-icon>
          </v-btn>
        </v-toolbar>
        <resource-text-field-search
          ref="ResourceTextFieldSearch"
          label-text-field="Buscar temas"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable
          message-text="No hay temas disponibles"
        />
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script src="./selectTopicsByDatatable.js"></script>
<style src="./selectTopicsByDatatable.css"></style>
