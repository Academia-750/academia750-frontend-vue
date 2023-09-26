<template>
  <v-card-text>
    <v-data-table
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
      item-key="id"
      no-data-text="No hay temas disponibles"
      :items-per-page="10"
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
          text-header="Tarjetas de memoria"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-button-go-back-router />
          <resource-title-toolbar-datatable title-text="Tarjetas de memoria" />
          <resource-divider-title-datatable />
          <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <resource-button-add
              text-button="Crear tarjeta"
              :config-route="{
                name: 'generate-questionnaire',
                query: { 'select-type-test': 'card-memory' }
              }"
            />
          </div>
        </v-toolbar>
        <!-- <resource-text-field-search
          ref="ResourceTextFieldSearch"
          @emitSearchWord="searchFieldExecuted"
        /> -->
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable
          message-text="No hay tarjetas de memoria disponibles"
        />
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-edit
            text-button="Ver"
            icon-button="mdi-eye"
            color-button="success"
            :config-route="{
              name: 'fetch-card-memory',
              params: { id: item.id }
            }"
          />
        </div>
      </template>
      <template v-slot:[`item.created-at`]="{ item }">
        {{ $formatDate(item.created_at) }}
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script src="./CardsMemory.js"></script>
<style src="./CardsMemory.css"></style>
