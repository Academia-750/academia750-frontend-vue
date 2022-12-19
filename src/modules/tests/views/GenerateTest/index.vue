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
    <v-container
      v-if="oppositionSelected.length > 0"
      :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}"
      class="d-flex justify-center"
    >
      <div>
        <span class="title">Oposición: </span><span class="title font-weight-bold">{{ oppositionSelected[0].name }}</span>
      </div>
    </v-container>
    <v-container
      v-show="topicsSelected.length === 0"
      :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}"
    >
      <select-opposition-by-datatable
        ref="selectOppositionByDatatable"
        :show-select="topicsSelected.length === 0"
        @OppositionSelectedBinding="oppositionSelected = $event"
      />
      <hr>
    </v-container>
    <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}" class="mt-3">
      <p class="title font-weight-bold d-flex justify-center">Número de preguntas</p>
      <form-number-questions-radio-buttons
        ref="FormNumberQuestionsRadioButtons"
        vid="number-questions"
        rules="required"
        @NumberQuestionsTestBinding="numberOfQuestionsSelected = $event"
      />
      <hr>
    </v-container>
    <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}" class="mt-3">
      <p class="title font-weight-bold d-flex justify-center">Deseas generar</p>
      <form-type-test-radio-buttons
        ref="FormTypeTestRadioButtons"
        vid="type-test"
        rules="required"
        @TypeTestBinding="typeTestSelected = $event"
      />
      <hr>
    </v-container>
    <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}" class="mt-3">
      <p class="title font-weight-bold d-flex justify-center">Grupos de temas</p>
      <form-topic-group-radio-buttons
        ref="FormTopicGroupRadioButtons"
        vid="topic-group"
        rules="required"
        @TopicGroupTestBinding="topicGroupSelected = $event"
      />
      <hr>
    </v-container>
    <v-container
      v-if="oppositionSelected.length > 0 && topicGroupSelected.length > 0"
      :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}"
    >
      <select-topics-by-datatable

        ref="selectTopicsByDatatable"
        :opposition-id="oppositionSelected[0]?.id"
        :topic-group-id="topicGroupSelected"
        @TopicsSelectedBinding="topicsSelected = $event"
      />
      <hr>
    </v-container>
    <v-container
      v-if="oppositionSelected.length === 0 || topicGroupSelected.length === 0"
      :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}"
      class="d-flex justify-center"
    >
      <p class="title font-weight-bold red--text">Por favor, primero seleccione una Oposición y un grupo de tema</p>
    </v-container>
    <v-container
      :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}"
    >
      <preview-topics-selected

        ref="previewTopicsSelectedDatatable"
        :items-datatable="topicsSelected"
        @RemoveTopicSelectedByIdBinding="removeTopicSelected"
      />
    </v-container>
  </v-card-text>
</template>

<script src="./GenerateTest.js"></script>
