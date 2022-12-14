<template>
  <v-card-text>
    <div class="d-flex justify-end my-2">
      <v-btn
        class="mx-1 white--text"
        dark
        small
        color="secondary"
        @click="
          $router.push({
            name: 'manage-subtopics-of-topic',
            params: {
              id: item.id
            }
          })
        "
      >
        <span>Importar Preguntas</span>
        <v-icon class="ml-1" small dark> mdi-plus </v-icon>
      </v-btn>
    </div>
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
      sort-by="created-at"
      sort-desc
      :server-items-length="informationMeta.total"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->
        <resource-header-crud-title
          v-if="topicData !== null"
          :text-header="getNameCurrentTopic"
          :can-rendering-header="true"
        />
        <resource-header-crud-title
          text-header="Gestión de Subtemas de un Tema"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-button-go-back-router />
          <resource-title-toolbar-datatable
            title-text="Gestión de Subtemas de un Tema"
          />
          <resource-divider-title-datatable />
          <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <resource-button-add
              v-if="topicData !== null"
              :config-route="{
                name: 'create-subtopic',
                params: { id: topicData.id }
              }"
            />
          </div>
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
            v-if="topicData !== null"
            :config-route="{
              name: 'update-subtopic',
              params: { id: topicData.id, subtopic_id: item.id }
            }"
          />
          <resource-button-delete
            @actionConfirmShowDialogDelete="deleteSubtopicConfirm(item)"
          />
        </div>
      </template>
      <template v-slot:[`item.manage-questions`]="{ item }">
        <resource-button-edit
          v-if="topicData !== null"
          text-button="Alta de preguntas"
          color-button="primary"
          :config-route="{
            name: 'manage-questions-of-subtopic',
            params: { id: topicData.id, subtopic_id: item.id }
          }"
        />
      </template>
    </v-data-table>
    <resource-dialog-confirm-delete
      ref="dialogConfirmDeleteAction"
      title="¿Estás seguro de eliminar el Subtema?"
      @actionDelete="deleteSubtopicAction"
    >
      <template #identifier-record>
        <div
          v-if="currentItemsSelectedForDelete"
          class="d-flex justify-center align-center"
        >
          <span class="mr-1 font-italic subtitle-1">Subtema:</span>
          <span class="font-weight-bold subtitle-1">{{
            currentItemsSelectedForDelete.name
          }}</span>
        </div>
      </template>
    </resource-dialog-confirm-delete>
  </v-card-text>
</template>

<script src="./Subtopic.js"></script>
<style src="./Subtopic.css"></style>
