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
      no-data-text="Este tema no tiene preguntas disponibles"
      :items-per-page="10"
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
          <resource-button-go-back-router
            :path-route-go-back="{ name: 'manage-topics' }"
          />
          <resource-title-toolbar-datatable title-text="Gestión de preguntas" />
          <resource-divider-title-datatable />
          <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <resource-button-add
              v-if="
                topicData !== null &&
                topicData.attributes.is_available === 'yes'
              "
              :config-route="{
                name: 'create-question-topic',
                params: {
                  id: topicData.id
                }
              }"
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
        <resource-banner-no-data-datatable
          message-text="Este tema no tiene preguntas disponibles"
        />
      </template>
      <template v-slot:[`item.question-is-visible`]="{ item }">
        <!-- <pre>
          {{ item }}
        </pre> -->
        <change-state-visibility-question-switch
          :question-id="item.id"
          :state-question-visibility="item['is-visible'] === 'yes'"
          @emitStateQuestionVisibility="
            ChangeStateVisibilityQuestionSwitchMethod(item.id, $event)
          "
        />
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex flex-wrap justify-right">
          <div class="mt-1">
            <resource-button-edit
              text-button="Ver"
              icon-button="mdi-eye"
              color-button="success"
              :config-route="{
                name: 'fetch-question-topic',
                params: { question_id: item.id }
              }"
            />
          </div>
          <div class="mt-1">
            <resource-button-copy
              v-if="topicData !== null"
              text-button="Copiar"
              color-button="blue darken-1"
              :config-route="{
                name: 'clone-question-topic',
                params: { id: topicData.id, question_id: item.id }
              }"
            />
          </div>
          <div class="mt-1">
            <resource-button-edit
              v-if="topicData !== null && item.can_this_question_be_affected"
              color-button="blue darken-1"
              :config-route="{
                name: 'update-question-topic',
                params: { id: topicData.id, question_id: item.id }
              }"
            />
          </div>

          <div class="mt-1">
            <resource-button-delete
              v-if="topicData !== null && item.can_this_question_be_affected"
              @actionConfirmShowDialogDelete="deleteQuestionConfirm(item)"
            />
          </div>
        </div>
        <!-- <div v-else class="d-flex justify-center">
          <span class="font-weight-bold">Esta pregunta está siendo usada en un Test y no se puede modificar</span>
        </div> -->
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
