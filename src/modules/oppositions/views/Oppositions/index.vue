<template>
  <v-card-text>
    <v-data-table
      :headers="filter__headers_datatable"
      :items="oppositions"
      :show-select="$vuetify.breakpoint.width > 290"
      :single-expand="singleExpand"
      :expanded.sync="expanded"
      item-key="id"
      no-data-text="No hay datos disponibles"
      :items-per-page="5"
      :mobile-breakpoint="600"
      class="elevation-1"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <p
          v-if="$vuetify.breakpoint.width < 700"
          class="mt-1 pt-2 mb-1 ml-2 font-weight-bold text-justify title"
        >
          Oposiciones
        </p>
        <v-toolbar
          flat
          class="indigo lighten-5"
        >
          <v-btn
            color="blue lighten-4 mr-1"
            elevation="24"
            small
          >
            <v-icon dark small>
              mdi-arrow-left
            </v-icon>
            <span class="ml-1 font-weight-bold hidden-xs-only">Volver</span>
          </v-btn>
          <v-toolbar-title
            v-if="$vuetify.breakpoint.width >= 700"
            class="ml-2"
          >
            Oposiciones
          </v-toolbar-title>
          <v-divider
            v-if="$vuetify.breakpoint.width >= 700"
            class="mx-2"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <div class="d-flex justify-center">
            <v-btn small color="primary" dark class="mx-1 align-self-center">
              <span v-if="$vuetify.breakpoint.width >= 425" class="font-weight-bold mr-1">Agregar</span>
              <v-icon small dark>mdi-plus</v-icon>
            </v-btn>
            <!-- <v-btn small color="success" dark class="mx-1 align-self-center">
              <span v-if="$vuetify.breakpoint.width >= 425" class="font-weight-bold mr-1">Importar</span>
              <v-icon small dark>mdi-file-import</v-icon>
            </v-btn> -->
          </div>
        </v-toolbar>
      </template>
      <template v-slot:no-data>
        <div class="d-flex justify-center mb-4 mt-6">
          <p class="font-weight-bold">No hay datos disponibles</p>
        </div>
      </template>
      <template v-slot:[`item.actions-resource`]>
        <div class="d-flex justify-space-around">
          <resource-button-edit
            :config-route="{ name: 'update-my-profile' }"
          />
          <resource-button-delete
            :config-route="{ name: 'change-password' }"
          />
        </div>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script src="./Oppositions.js"></script>
<style src="./Oppositions.css"></style>
