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
            name: 'import-questions'
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
      no-data-text="Este subtema no tiene preguntas disponibles"
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
          :text-header="getTotalQuestionsSubtopic"
          :can-rendering-header="true"
        />
        <resource-header-crud-title
          v-if="topicData !== null"
          :text-header="getNameCurrentTopic"
          :can-rendering-header="true"
        />
        <resource-header-crud-title
          v-if="subtopicData !== null"
          :text-header="getNameCurrentSubtopic"
          :can-rendering-header="true"
        />
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-button-go-back-router :path-route-go-back="{ name: 'manage-subtopics-of-topic' }"/>
          <resource-title-toolbar-datatable title-text="Gestión de preguntas" />
          <resource-divider-title-datatable />
          <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <resource-button-add
              :config-route="{ name: 'create-question-subtopic' }"
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
        <resource-banner-no-data-datatable message-text="Este subtema no tiene preguntas disponibles"/>
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div v-if="item.can_this_question_be_affected" class="d-flex justify-space-around">
          <resource-button-edit
            color-button="blue darken-1"
            :config-route="{ name: 'update-question-subtopic', params: { question_id: item.id } }"
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
      title="¿Estás seguro de eliminar la pregunta del subtema?"
      @actionDelete="deleteQuestionAction"
    >
      <template #identifier-record>
        <div
          v-if="currentItemsSelectedForDelete"
          class="d-flex justify-center align-center"
        >
          <span class="mr-1 font-italic subtitle-1">Pregunta:</span>
          <span class="font-weight-bold subtitle-1">{{
            currentItemsSelectedForDelete.name
          }}</span>
        </div>
      </template>
    </resource-dialog-confirm-delete>
  </v-card-text>
</template>

<script src="./QuestionsTopic.js"></script>
<style src="./QuestionsTopic.css"></style>
