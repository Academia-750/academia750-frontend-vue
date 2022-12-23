<template>
  <v-card-text>
    <v-data-table
      v-model="getSelectedItems"
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
      item-key="id"
      show-select
      multi-sort
      no-data-text="No hay datos disponibles"
      :items-per-page="5"
      :mobile-breakpoint="700"
      class="elevation-1"
      :server-items-length="informationMeta.total"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->
        <resource-header-crud-title
          :text-header="getTitleByStateAccount"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar
          flat
          class="indigo lighten-5 my-2"
          outlined
        >
          <resource-button-go-back-router/>
          <resource-title-toolbar-datatable :title-text="getTitleByStateAccount" />
          <!-- <resource-divider-title-datatable />
          <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <resource-button-add :config-route="{ name: 'create-topic' }"/>
          </div> -->
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
            :config-route="{}"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="setDataForUpdateUser(item)"
          />
          <resource-button-delete
            @actionConfirmShowDialogDelete="deleteStudentConfirm(item)"
          />
        </div>
      </template>
    </v-data-table>
    <resource-dialog-confirm-delete
      ref="dialogConfirmDeleteAction"
      title="¿Estás seguro de eliminar el alumno?"
      @actionDelete="deleteStudentAction"
    >
      <template #identifier-record>
        <div v-if="currentItemsSelectedForDelete" class="d-flex justify-center align-center">
          <span class="mr-1 font-italic subtitle-1">Alumno:</span> <span class="font-weight-bold subtitle-1">{{ currentItemsSelectedForDelete['first-name'] }} {{ currentItemsSelectedForDelete['last-name'] }}</span>
        </div>
      </template>
    </resource-dialog-confirm-delete>
  </v-card-text>
</template>

<script src="./StudentsComponent.js"></script>
<style src="./StudentsComponent.css" scoped></style>
