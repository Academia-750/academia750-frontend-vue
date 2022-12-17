<template>
  <v-card-text>
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-button-go-back-router />
      <resource-title-toolbar-datatable title-text="Gestión de temas" />
    </v-toolbar>
    <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}">
      <pre>
        {{ oppositionSelected }}
      </pre>
      <select-opposition-by-datatable
        ref="selectOppositionByDatatable"
        @OppositionSelectedBinding="oppositionSelected = $event"
      />
    </v-container>
  </v-card-text>
</template>

<script src="./GenerateTest.js"></script>
