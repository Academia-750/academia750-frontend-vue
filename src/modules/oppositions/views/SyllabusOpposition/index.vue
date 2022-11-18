<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Temario"
      :can-rendering-header="$vuetify.breakpoint.width < 620"
    />
    <resource-header-crud-title
      :text-header="'Oposicion: ' + opposition.name"
      :can-rendering-header="opposition !== null"
    />
    <v-toolbar
      flat
      class="indigo lighten-5 my-2"
      outlined
    >
      <resource-button-go-back-router :width-number-limit="325"/>
      <resource-title-toolbar-datatable :width-limit-toolbar-title="620" title-text="Temario" />
      <resource-divider-title-datatable :width-limit-title-divider="620"/>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center">
        <v-btn
          small
          color="light-blue darken-3"
          class="white--text mx-1 align-self-center"
          @click="fetchSyllabusOppositionApi"
        >
          <v-icon
            right
            dark
            class="mr-1"
          >
            mdi-refresh
          </v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-card-text>
      <v-card
        class="mx-auto"
        max-width="800"
      >
        <v-sheet class="pa-4 primary lighten-2">
          <v-text-field
            v-model="searchWord"
            label="Buscar"
            dark
            flat
            solo-inverted
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-sheet>
        <v-card-text>
          <v-treeview
            v-if="syllabus.length > 0"
            :items="syllabus"
            :search="searchWord"
            :open.sync="openTreeviews"
          >
            <template v-slot:prepend="{ item }">
              <v-icon>{{ item.icon }}</v-icon>
            </template>
          </v-treeview>
          <div v-else class="d-flex justify-center mt-2">
            <p class="font-weight-bold subtitle-1">No hay datos disponibles</p>
          </div>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card-text>
</template>

<script src="./Syllabus.js"></script>
