<template>
  <v-card-text>
    <resource-header-crud-title
      v-if="topicData !== null"
      :text-header="getNameCurrentTopic"
      :can-rendering-header="true"
    />
    <resource-header-crud-title
      text-header="Actualizar subtemas de la Oposición"
      :can-rendering-header="$vuetify.breakpoint.width < 620"
    />
    <v-toolbar
      flat
      class="indigo lighten-5 my-2"
      outlined
    >
      <resource-button-go-back-router :width-number-limit="325"/>
      <resource-title-toolbar-datatable :width-limit-toolbar-title="620" title-text="Actualizar subtemas de la Oposición" />
    </v-toolbar>
    <v-card-text>
      <v-expansion-panels
        v-model="expandibleSections"
        multiple
        inset
        focusable
      >
        <v-expansion-panel>
          <v-expansion-panel-header>
            Actualizar subtemas
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <select-subtopics-by-datatable
              ref="selectSubtopicsByDatatable"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

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
