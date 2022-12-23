<template>
  <v-card-text class="ma-0 pa-0">
    <resource-header-crud-title
      v-if="topicData !== null"
      :text-header="getNameCurrentTopic"
      :can-rendering-header="true"
    />
    <resource-header-crud-title
      text-header="Agregar a Oposición"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar
      flat
      class="indigo lighten-5 my-2"
      outlined
    >
      <resource-button-go-back-router :width-number-limit="300"/>
      <resource-title-toolbar-datatable :width-limit-toolbar-title="420" title-text="Agregar a Oposición" />
    </v-toolbar>
    <v-card-text>
      <select-opposition-by-datatable
        ref="selectOppositionByDatatable"
      />
      <select-subtopics-by-datatable
        ref="selectSubtopicsByDatatable"
      />

      <div class="d-flex justify-end">
        <v-btn
          class="mt-5 mb-3 white--text"
          dark
          small
          color="success"
          @click="AssignOpposition"
        >
          <span>Agregar</span>
          <v-icon
            class="ml-1"
            small
            dark
          >
            mdi-plus
          </v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card-text>
</template>

<script src="./AssignOpposition.js"></script>
