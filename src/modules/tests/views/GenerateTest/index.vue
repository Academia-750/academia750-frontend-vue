<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Generar Test"
      :can-rendering-header="$vuetify.breakpoint.width < 700"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-button-go-back-router />
      <resource-title-toolbar-datatable title-text="Generar Test" />
    </v-toolbar>
    <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}">
      <select-opposition-by-datatable
        ref="selectOppositionByDatatable"
        @OppositionSelectedBinding="oppositionSelected = $event"
      />
    </v-container>
    <hr>
    <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}" class="mt-3">
      <p class="title font-weight-bold d-flex justify-center">Número de preguntas</p>
      <form-number-questions-radio-buttons
        ref="FormNumberQuestionsRadioButtons"
        vid="number-questions"
        rules="required"
        @NumberQuestionsTestBinding="numberOfQuestions = $event"
      />
    </v-container>
    <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}" class="mt-3">
      <p class="title font-weight-bold d-flex justify-center">Deseas generar</p>
      <form-type-test-radio-buttons
        ref="FormTypeTestRadioButtons"
        vid="type-test"
        rules="required"
        @TypeTestBinding="typeTest = $event"
      />
    </v-container>
  </v-card-text>
</template>

<script src="./GenerateTest.js"></script>
