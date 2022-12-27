<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Tarjeta de memoria"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar
      flat
      class="indigo lighten-5 my-2"
      outlined
    >
      <resource-button-go-back-router :width-number-limit="300" />
      <resource-title-toolbar-datatable
        :width-limit-toolbar-title="420"
        title-text="Tarjeta de memoria"
      />
      <resource-divider-title-datatable :width-limit-title-divider="620"/>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center">
        <v-btn
          small
          color="light-blue darken-3"
          class="white--text mx-1 align-self-center"
          @click="fetchRecordData"
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
    <v-card-text v-if="ItemsQuestionsByCardsMemory">
      <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}" class="d-flex justify-center mx-auto">
        <v-row dense class="ma-0 pa-0">
          <v-col
            v-for="question in ItemsQuestionsByCardsMemory"
            :key="`Sección Tarjeta - ${question.id}`"
            cols="12"
            sm="12"
            md="6"
            lg="4"
            xl="4"
            class="d-flex justify-center"
          >
            <card-memory-item
              :question-with-answers="question"
            />
          </v-col>
        </v-row>
      </v-container>
      <v-container class="max-width d-flex justify-center">
        <v-pagination
          v-model="pageNumber"
          class="my-4"
          :length="totalNumberPages"
        ></v-pagination>
      </v-container>
    </v-card-text>
  </v-card-text>
</template>

<script src="./FetchCardMemory.js"></script>
