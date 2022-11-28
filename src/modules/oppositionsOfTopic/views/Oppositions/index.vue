<template>
  <v-card-text>
    <v-data-table
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
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
            <resource-button-add :config-route="{ name: 'create-opposition' }"/>
          </div>
        </v-toolbar>
        <resource-text-field-search
          ref="ResourceTextFieldSearch"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable/>
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-edit
            :config-route="{ name: 'update-opposition', params: { id: item.id } }"
          />
          <resource-button-delete
            @actionConfirmShowDialogDelete="deleteOppositionConfirm(item)"
          />

        </div>
      </template>
      <template v-slot:[`item.syllabus`]="{ item }">
        <button-datatable-syllabus :config-route="{ name: 'syllabus-opposition', params: { id: item.id } }"/>
      </template>
    </v-data-table>
    <resource-dialog-confirm-delete
      ref="dialogConfirmDeleteAction"
      title="¿Estás seguro de eliminar la Oposición?"
      @actionDelete="deleteOppositionAction"
    >
      <template #identifier-record>
        <div v-if="currentItemsSelectedForDelete" class="d-flex justify-center align-center">
          <span class="mr-1 font-italic subtitle-1">Oposicion:</span> <span class="font-weight-bold subtitle-1">{{ currentItemsSelectedForDelete.name }}</span>
        </div>
      </template>
    </resource-dialog-confirm-delete>
  </v-card-text>
</template>

<script src="./Oppositions.js"></script>
<style src="./Oppositions.css"></style>
