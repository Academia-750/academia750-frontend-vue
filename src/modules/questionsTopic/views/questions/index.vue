<template>
  <v-card-text>
    <v-data-table
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
      item-key="id"
      multi-sort
      no-data-text="Este tema no tiene preguntas disponibles"
      :items-per-page="5"
      :mobile-breakpoint="600"
      class="elevation-1"
      sort-by="created-at"
      sort-desc
      :server-items-length="informationMeta.total"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <resource-header-crud-title
          v-if="metaData !== null"
          :text-header="getTotalQuestionsSyllabus"
          :can-rendering-header="true"
        />
        <resource-header-crud-title
          v-if="topicData !== null"
          :text-header="getNameCurrentTopic"
          :can-rendering-header="true"
        />
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->
        <resource-header-crud-title
          text-header="Gestión de preguntas"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-button-go-back-router :path-route-go-back="{ name: 'manage-topics' }"/>
          <resource-title-toolbar-datatable title-text="Gestión de preguntas" />
          <resource-divider-title-datatable />
          <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <resource-button-add
              v-if="topicData !== null"
              :config-route="{ name: 'create-question-topic', params: {
                id: topicData.id
              } }"
            />
            <!-- <v-btn
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
            </v-btn> -->
          </div>
        </v-toolbar>
        <resource-text-field-search
          ref="ResourceTextFieldSearch"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable message-text="Este tema no tiene preguntas disponibles"/>
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div v-if="item.can_this_question_be_affected" class="d-flex justify-space-around">
          <resource-button-edit
            v-if="topicData !== null"
            color-button="blue darken-1"
            :config-route="{ name: 'update-question-topic', params: { id: topicData.id, question_id: item.id } }"
          />
          <resource-button-delete
            @actionConfirmShowDialogDelete="deleteQuestionConfirm(item)"
          />
        </div>
        <div v-else class="d-flex justify-center">
          <span class="font-weight-bold">Esta pregunta está siendo usada en un Test y no se puede modificar</span>
        </div>
      </template>
    </v-data-table>
    <resource-dialog-confirm-delete
      ref="dialogConfirmDeleteAction"
      title="¿Estás seguro de eliminar la pregunta del tema?"
      @actionDelete="deleteQuestionAction"
    >
      <template #identifier-record>
        <div
          v-if="currentItemsSelectedForDelete"
          class="d-flex justify-center align-center"
        >
          <span class="mr-1 font-italic subtitle-1">Pregunta:</span>
          <span class="font-weight-bold subtitle-1">{{
            currentItemsSelectedForDelete['question-text']
          }}</span>
        </div>
      </template>
    </resource-dialog-confirm-delete>
  </v-card-text>
</template>

<script src="./QuestionsTopic.js"></script>
<style src="./QuestionsTopic.css"></style>
