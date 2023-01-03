<template>
  <v-card-text ref="resolveTestView">
    <resource-header-crud-title
      text-header="Resolver test"
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
        title-text="Resolver test"
      />
      <!-- <resource-divider-title-datatable :width-limit-title-divider="620"/>
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
      </div> -->
    </v-toolbar>
    <progress-linear-state-test
      :number-questions-resolved="numberQuestionsResolved"
      :total-number-questions-test="totalNumberQuestionsTest"
    />
    <v-card-text>
      <div v-if="ItemsQuestionsByTests && ItemsQuestionsByTests.length > 0">
        <v-container :class="{'ma-0': $vuetify.breakpoint.mdAndDown, 'pa-0': $vuetify.breakpoint.mdAndDown}">
          <v-row dense class="ma-0 pa-0">
            <v-col
              v-for="(question, index) in ItemsQuestionsByTests"
              :key="`Sección Test Pregunta - ${question.id}`"
              cols="12"
              sm="12"
              md="12"
              lg="12"
              xl="12"
            >
              <questionnaire-item
                v-if="testData"
                :test-uuid="testData.id"
                :index="index"
                :question-with-answers="question"
                @emitSaveAnswerAndUpdateProgressTest="setDataStatisticProgress($event.number_of_questions_answered_of_test, $event.total_questions_of_this_test)"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-container v-if="isLastPage" class="max-width d-flex justify-end">
          <v-btn
            color="blue lighten-4"
            :disabled="isDisabledCloseTest"
            :loading="isLoadingCloseTest"
            elevation="6"
            rounded
            @click="closeAndGradeTestAction"
          >
            Finalizar Test <v-icon class="ml-1">mdi-pencil</v-icon>
          </v-btn>
        </v-container>
        <v-container class="max-width d-flex justify-center">
          <v-pagination
            v-model="pageNumber"
            class="my-4"
            :length="totalNumberPages"
          ></v-pagination>
        </v-container>
      </div>
      <!-- <progress-linear-state-test
        :number-questions-resolved="numberQuestionsResolved"
        :total-number-questions-test="totalNumberQuestionsTest"
      /> -->
      <v-container v-if="(!ItemsQuestionsByTests || ItemsQuestionsByTests.length === 0) && !isLoading" class="d-flex justify-center">
        <p class="font-weight-black display-1">No ha sido posible generar una prueba con preguntas disponibles. Por favor, reporte este problema al correo oficial de la academia y intente crear otra prueba más tarde.</p>
      </v-container>

    </v-card-text>
  </v-card-text>
</template>

<script src="./FetchTest.js"></script>
