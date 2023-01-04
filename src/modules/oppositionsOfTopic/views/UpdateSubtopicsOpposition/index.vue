<template>
  <v-card-text>
    <resource-header-crud-title
      v-if="topicData !== null"
      :text-header="getNameCurrentTopic"
      :can-rendering-header="true"
    />
    <resource-header-crud-title
      v-if="oppositionData !== null"
      :text-header="getNameCurrentOpposition"
      :can-rendering-header="true"
    />
    <v-toolbar
      flat
      class="indigo lighten-5 my-2"
      outlined
    >
      <resource-button-go-back-router :width-number-limit="325" :path-route-go-back="{ name: 'manage-oppositions-of-topic' }"/>
      <resource-title-toolbar-datatable :width-limit-toolbar-title="620" title-text="Actualizar subtemas de la Oposición" />
    </v-toolbar>
    <v-card-text class="ma-0 pa-0">
      <select-subtopics-by-datatable
        ref="selectSubtopicsByDatatable"
      />

      <div class="d-flex justify-end">
        <v-btn
          class="mt-5 mb-3 white--text"
          dark
          small
          color="success"
          @click="UpdateSubtopicsOpposition"
        >
          <span>Actualizar</span>
          <v-icon
            class="ml-1"
            small
            dark
          >
            mdi-pencil
          </v-icon>
        </v-btn>
      </div>
    </v-card-text>
  </v-card-text>
</template>

<script src="./UpdateSubtopicsOpposition.js"></script>
