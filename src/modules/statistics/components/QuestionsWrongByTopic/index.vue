<template>
  <v-card-text class="ma-0 pa-0">
    <v-data-table
      :headers="filter__headers_datatable"
      :items.sync="itemsDatatableQuestionsWrong"
      item-key="id"
      multi-sort
      show-expand
      single-expand
      :expanded.sync="QuestionsWrongItemsExpanded"
      no-data-text="No hay datos disponibles"
      :items-per-page="10"
      :mobile-breakpoint="600"
      class="elevation-1"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->

        <resource-header-crud-title
          text-header="Preguntas incorrectas"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar
          flat
          class="blue lighten-4 my-2"
          outlined
        >
          <resource-title-toolbar-datatable title-text="Preguntas incorrectas" />
          <!-- <resource-divider-title-datatable /> -->
          <!-- <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <v-btn
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
            </v-btn>
          </div> -->
        </v-toolbar>
        <!-- <resource-text-field-search
          ref="ResourceTextFieldSearch"
          label-text-field="Buscar temas"
          :is-disabled="!topic_id"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        /> -->
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable message-text="No hay preguntas incorrectas" />
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="py-3 px-1 mt-2 grey lighten-2">
            <span>Explicación de la pregunta: </span> <span class="font-weight-black">{{ item['reason-text'] }}</span>
          </div>
        </td>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script src="./QuestionsWrongByTopic.js"></script>
<style src="./QuestionsWrongByTopic.css"></style>
