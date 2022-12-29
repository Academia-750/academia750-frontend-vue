<template>
  <v-card-text>
    <v-data-table
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
      item-key="id"
      multi-sort
      no-data-text="No hay tests completados"
      :items-per-page="5"
      :mobile-breakpoint="600"
      class="elevation-1"
      sort-by="created-at"
      sort-desc
      :server-items-length="informationMeta.total"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->
        <resource-header-crud-title
          text-header="Tests completados"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-button-go-back-router />
          <resource-title-toolbar-datatable title-text="Tests completados" />
          <resource-divider-title-datatable />
          <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <resource-button-add text-button="Crear nuevo test" :config-route="{ name: 'generate-questionnaire', query: { 'select-type-test': 'test' } }" />
          </div>
        </v-toolbar>
        <!-- <resource-text-field-search
          ref="ResourceTextFieldSearch"
          @emitSearchWord="searchFieldExecuted"
        /> -->
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable message-text="No hay tests completados" />
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-edit
            text-button="Ver resultados del Test"
            icon-button="mdi-pencil"
            color-button="success"
            :config-route="{ name: 'fetch-history-test-complete', params: { id: item.id } }"
          />
        </div>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script src="./TestsCompleted.js"></script>
<style src="./TestsCompleted.css"></style>
