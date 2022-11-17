<template>
  <v-card-text>
    <v-data-table
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      item-key="id"
      no-data-text="No hay datos disponibles"
      :items-per-page="5"
      :mobile-breakpoint="600"
      class="elevation-1"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->
        <resource-header-crud-title
          text-header="Gestion de Oposiciones"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar
          flat
          class="indigo lighten-5 my-2"
          outlined
        >
          <resource-button-go-back-router/>
          <resource-title-toolbar-datatable title-text="Gestion de Oposiciones" />
          <resource-divider-title-datatable />
          <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <resource-button-add/>
          </div>
        </v-toolbar>
        <resource-text-field-search @emitSearchWord="searchWord = $event"/>
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable/>
      </template>
      <template v-slot:[`item.actions-resource`]>
        <div class="d-flex justify-space-around">
          <resource-button-edit
            :config-route="{ name: 'update-my-profile' }"
          />
          <resource-button-delete
            :config-route="{ name: 'change-password' }"
          />
        </div>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script src="./Oppositions.js"></script>
<style src="./Oppositions.css"></style>
