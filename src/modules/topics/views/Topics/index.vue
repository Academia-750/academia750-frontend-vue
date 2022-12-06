<template>
  <v-card-text>
    <div class="d-flex justify-end my-2">
      <v-btn
        class="mx-1 white--text"
        dark
        small
        color="success"
        @click="
          $router.push({
            name: 'import-topics'
          })
        "
      >
        <span>Importar Temas</span>
        <v-icon class="ml-1" small dark> mdi-plus </v-icon>
      </v-btn>
      <v-btn
        class="mx-1 white--text"
        dark
        small
        color="primary"
        @click="
          $router.push({
            name: 'import-subtopics'
          })
        "
      >
        <span>Importar Subtemas</span>
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
      :server-items-length="informationMeta.total"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->
        <resource-header-crud-title
          text-header="Gestión de temas"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-button-go-back-router />
          <resource-title-toolbar-datatable title-text="Gestión de temas" />
          <resource-divider-title-datatable />
          <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <resource-button-add :config-route="{ name: 'create-topic' }" />
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
            color-button="blue darken-1"
            :config-route="{ name: 'update-topic', params: { id: item.id } }"
          />
          <resource-button-delete
            @actionConfirmShowDialogDelete="deleteTopicConfirm(item)"
          />
        </div>
      </template>
      <template v-slot:[`item.manage-subtopics`]="{ item }">
        <v-btn
          class="mx-1 white--text"
          dark
          :x-small="!can_rendering_button_small"
          :small="can_rendering_button_small"
          color="success"
          @click="
            $router.push({
              name: 'manage-subtopics-of-topic',
              params: {
                id: item.id
              }
            })
          "
        >
          <span>Subtemas</span>
          <v-icon
            v-if="can_rendering_icon_button"
            class="ml-1"
            :x-small="!can_rendering_icon_small"
            :small="can_rendering_icon_small"
            dark
          >
            mdi-eye
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.manage-oppositions`]="{ item }">
        <v-btn
          class="mx-1 white--text"
          dark
          :x-small="!can_rendering_button_small"
          :small="can_rendering_button_small"
          color="success"
          @click="
            $router.push({
              name: 'manage-oppositions-of-topic',
              params: {
                id: item.id
              }
            })
          "
        >
          <span>Oposiciones</span>
          <v-icon
            v-if="can_rendering_icon_button"
            class="ml-1"
            :x-small="!can_rendering_icon_small"
            :small="can_rendering_icon_small"
            dark
          >
            mdi-eye
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.manage-questions`]="{ item }">
        <v-btn
          class="mx-1 white--text"
          dark
          :x-small="!can_rendering_button_small"
          :small="can_rendering_button_small"
          color="success"
          @click="
            $router.push({
              name: 'manage-questions-of-topic',
              params: {
                id: item.id
              }
            })
          "
        >
          <span>Preguntas</span>
          <v-icon
            v-if="can_rendering_icon_button"
            class="ml-1"
            :x-small="!can_rendering_icon_small"
            :small="can_rendering_icon_small"
            dark
          >
            mdi-eye
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <resource-dialog-confirm-delete
      ref="dialogConfirmDeleteAction"
      title="¿Estás seguro de eliminar el Tema?"
      @actionDelete="deleteTopicAction"
    >
      <template #identifier-record>
        <div
          v-if="currentItemsSelectedForDelete"
          class="d-flex justify-center align-center"
        >
          <span class="mr-1 font-italic subtitle-1">Tema:</span>
          <span class="font-weight-bold subtitle-1">{{
            currentItemsSelectedForDelete.name
          }}</span>
        </div>
      </template>
    </resource-dialog-confirm-delete>
  </v-card-text>
</template>

<script src="./Topic.js"></script>
<style src="./Topic.css"></style>
