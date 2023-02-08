<template>
  <v-card-text class="ma-0 pa-0">
    <v-data-table
      v-model="oppositionSelected"
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
      :single-select="true"
      show-select
      item-key="id"
      no-data-text="No hay datos disponibles"
      :items-per-page="10"
      :mobile-breakpoint="600"
      class="elevation-1"
      :server-items-length="informationMeta.total"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->

        <resource-header-crud-title
          text-header="Selecciona la oposición"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar
          flat
          class="blue lighten-4 my-2"
          outlined
        >
          <resource-title-toolbar-datatable title-text="Selecciona la oposición" />
          <resource-divider-title-datatable />
          <!-- <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <v-btn
              small
              elevation="24"
              color="teal darken-2"
              class="white--text ml-1"
              title="Cargar nuevamente"
              @click="loadDatatatable"
            >
              <v-icon
                dark
                small
                class="mx-1"
              >
                mdi-reload
              </v-icon>
              <span class="d-none d-sm-inline">Cargar</span>
            </v-btn>
          </div> -->
        </v-toolbar>
        <resource-text-field-search
          ref="ResourceTextFieldSearch"
          label-text-field="Buscar oposiciones"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable/>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script src="./selectOppositionByDatatable.js"></script>
<style src="./selectOppositionByDatatable.css"></style>
