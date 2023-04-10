<template>
  <v-card-text class="overflow-x-auto overflow-y-hidden d-flex justify-center">
    <div class="mx-auto" style="width: 96% !important;">
      <resource-header-crud-title
        text-header="Generar cuestionario"
        :can-rendering-header="$vuetify.breakpoint.width < 700"
      />
      <v-toolbar flat class="indigo lighten-5 my-2" outlined>
        <resource-button-go-back-router />
        <resource-title-toolbar-datatable title-text="Generar cuestionario" />
      </v-toolbar>
      <validation-observer ref="FormCreateTest" v-slot="{ invalid }">
        <!-- <v-container
          v-if="oppositionSelected.length > 0"
          :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}"
          class="d-flex justify-center"
        >
          <div>
            <span class="title">Oposición: </span><span class="title font-weight-bold">{{ oppositionSelected[0].name }}</span>
          </div>
        </v-container> -->
        <v-container
          :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}"
          class="mx-auto"
        >
          <select-opposition-by-datatable
            ref="selectOppositionByDatatable"
            :show-select="true"
            @ClearTopicsSelectedBinding="clearTopicsSelected"
            @OppositionSelectedBinding="oppositionSelected = $event"
          />
          <v-divider class="my-1 blue-grey lighten-4" />
        </v-container>
        <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}" class="mt-3 mx-auto">
          <p class="title font-weight-bold d-flex justify-center">Número de preguntas</p>
          <form-number-questions-radio-buttons
            ref="FormNumberQuestionsRadioButtons"
            vid="number-questions"
            rules="required"
            @NumberQuestionsTestBinding="numberOfQuestionsSelected = $event"
          />
          <v-divider class="my-1 blue-grey lighten-4" />
        </v-container>
        <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}" class="mt-3 mx-auto">
          <p class="title font-weight-bold d-flex justify-center">Tipo de cuestionario</p>
          <form-type-test-radio-buttons
            ref="FormTypeTestRadioButtons"
            vid="type-test"
            rules="required"
            @TypeTestBinding="typeTestSelected = $event"
          />
          <v-divider class="my-1 blue-grey lighten-4" />
        </v-container>
        <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}" class="mt-3 mx-auto">
          <p class="title font-weight-bold d-flex justify-center">Grupos de temas</p>
          <form-topic-group-radio-buttons
            ref="FormTopicGroupRadioButtons"
            vid="topic-group"
            rules="required"
            @TopicGroupTestBinding="topicsGroupSelected = $event"
          />
          <v-divider class="my-1 blue-grey lighten-4" />
        </v-container>
        <v-container
          v-show="oppositionSelected.length > 0 && topicsGroupSelected.length > 0"
          :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}"
          class="mx-auto"
        >
          <select-topics-by-datatable
            ref="selectTopicsByDatatable"
            :opposition-id="oppositionSelected.length > 0 ? oppositionSelected[0]?.id : ''"
            :topics-group-id="topicsGroupSelected"
            @TopicsSelectedBinding="topicsSelected = $event"
          />
          <v-divider class="my-1 blue-grey lighten-4" />
        </v-container>
        <v-container
          v-if="oppositionSelected.length === 0 || topicsGroupSelected.length === 0"
          :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}"
          class="mx-auto d-flex justify-center"
        >
          <p class="title font-weight-bold red--text">Por favor, primero seleccione una Oposición y un grupo de tema</p>
        </v-container>
        <v-container
          :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}"
          class="mx-auto"
        >
          <preview-topics-selected
            ref="previewTopicsSelectedDatatable"
            :items-datatable="topicsSelected"
            @RemoveTopicSelectedByIdBinding="removeTopicSelected"
          />
        </v-container>
        <v-container
          :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}"
          class="mx-auto d-flex justify-center mt-5"
        >
          <v-btn
            color="light-blue darken-3"
            class="white--text mx-1 align-self-center"
            :loading="loadingButtonCreateTest"
            :disabled="invalid || topicsSelected.length === 0 || disabledButtonCreateTest"
            @click="CreateTest"
          >
            <v-icon
              right
              dark
              class="mr-1"
            >
              mdi-plus
            </v-icon>
            {{ getTextButtonCreateTest }}
          </v-btn>
        </v-container>
        <v-fab-transition>
          <v-btn
            class="my-5 mx-2"
            color="blue darken-1"
            dark
            fixed
            bottom
            right
            fab
            :disabled="false"
            title="Generar cuestionario"
            @click="CreateTest"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-fab-transition>
      </validation-observer>
    </div>

  </v-card-text>
</template>

<script src="./GenerateTest.js"></script>
