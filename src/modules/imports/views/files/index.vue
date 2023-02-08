<template>
  <v-card-text>
    <v-data-table
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
      item-key="id"
      no-data-text="No hay datos disponibles"
      :items-per-page="10"
      :mobile-breakpoint="600"
      class="elevation-1"
      :server-items-length="informationMeta.total"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <resource-header-crud-title
          text-header="Procesos de importacion"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-button-go-back-router />
          <resource-title-toolbar-datatable
            title-text="Procesos de importacion"
          />
        </v-toolbar>
        <resource-text-field-search
          ref="ResourceTextFieldSearch"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-edit
            icon-button="mdi-eye"
            color-button="success"
            text-button="Ver registros"
            :config-route="{
              name: 'my-imports-files-records',
              params: { id: item.id }
            }"
          />
        </div>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script src="./files.js"></script>
<style src="./files.css"></style>
