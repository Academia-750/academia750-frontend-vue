<template>
  <v-card-text>
    <resource-header-crud-title
      v-if="topicData !== null"
      :text-header="getNameCurrentTopic"
      :can-rendering-header="true"
    />
    <resource-header-crud-title
      text-header="Gestion de Oposiciones de un tema"
      :can-rendering-header="$vuetify.breakpoint.width < 700"
    />
    <v-data-table
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
      item-key="id"
      no-data-text="Este tema no tiene oposiciones disponibles"
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
        <v-toolbar
          flat
          class="indigo lighten-5 my-2"
          outlined
        >
          <resource-button-go-back-router :path-route-go-back="{ name: 'manage-topics' }"/>
          <resource-title-toolbar-datatable title-text="Gestion de Oposiciones de un tema" />
          <resource-divider-title-datatable />
          <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <resource-button-add
              v-if="topicData !== null && topicData.attributes.is_available === 'yes'"
              text-button="Agregar Oposición"
              :config-route="{ name: 'assing-opposition-to-topic', params: { id: topicData.id } }"
            />
          </div>
        </v-toolbar>
        <resource-text-field-search
          ref="ResourceTextFieldSearch"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable message-text="Este tema no tiene oposiciones disponibles"/>
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-edit
            v-if="topicData !== null && topicData.attributes.is_available === 'yes' && item.is_available === 'yes'"
            :is-disabled="item.is_available === 'no'"
            text-button="Editar subtemas"
            :config-route="{ name: 'update-subtopics-opposition-by-topic', params: { id: topicData.id, opposition_id: item.id } }"
          />
          <resource-button-delete
            v-if="topicData !== null && topicData.attributes.is_available === 'yes' && item.is_available === 'yes'"
            :is-disabled="item.is_available === 'no'"
            @actionConfirmShowDialogDelete="unassignOppositionConfirm(item)"
          />

        </div>
      </template>
      <template v-slot:[`item.syllabus`]="{ item }">
        <button-datatable-syllabus :config-route="{ name: 'syllabus-opposition', params: { id: item.id } }"/>
      </template>
    </v-data-table>
    <resource-dialog-confirm-delete
      ref="dialogConfirmDeleteAction"
      title="¿Estás seguro de remover la Oposición del tema?"
      @actionDelete="unassignOppositionAction"
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
