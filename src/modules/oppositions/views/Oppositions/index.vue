<template>
  <div>
    <v-card-text>
      <v-data-table
        :headers="filter__headers_datatable"
        :items="oppositions"
        show-select
        :single-expand="singleExpand"
        :expanded.sync="expanded"
        item-key="id"
        no-data-text="No hay datos disponibles"
        :items-per-page="5"
        :mobile-breakpoint="600"
        class="elevation-1"
        :footer-props="get_footer_props"
      >
        <template v-slot:no-data>
          <div class="d-flex justify-center mb-4 mt-6">
            <p class="font-weight-bold">No hay datos disponibles</p>
          </div>
        </template>
        <template v-slot:[`item.actions-resource`]>
          <div class="d-flex justify-space-around">
            <resource-button-edit :config-route="{ name: 'update-my-profile' }"/>
            <resource-button-delete :config-route="{ name: 'change-password' }"/>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </div>
</template>

<script src="./Oppositions.js"></script>
<style src="./Oppositions.css"></style>
