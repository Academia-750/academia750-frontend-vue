<template>
  <v-card-text>
    <resource-header-crud-title
      v-if="topicData"
      :text-header="getNameCurrentTopic"
      :can-rendering-header="true"
    />
    <resource-header-crud-title
      v-if="questionData"
      :text-header="getNameCurrentQuestion"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-button-go-back-router :width-number-limit="300" :path-route-go-back="{ name: 'manage-questions-of-topic' }" />
      <resource-title-toolbar-datatable
        :width-limit-toolbar-title="420"
        title-text="Actualizar pregunta"
      />
      <resource-divider-title-datatable :width-limit-title-divider="620"/>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center">
        <resource-button-add :config-route="{ name: 'create-question-topic' }"/>
        <v-btn
          small
          color="light-blue darken-3"
          class="white--text mx-1 align-self-center"
          @click="fetchDataQuestionForUpdate"
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
      <validation-observer ref="FormUpdateQuestion" v-slot="{ invalid }">
        <v-row dense>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="8"
            class="d-flex align-center"
          >
            <form-question-text-field
              ref="FormQuestionTextField"
              rules="required"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="2"
            class="d-flex flex-column"
          >
            <form-question-type-test-checkbox ref="FormQuestionTypeTestCheckbox" />
            <form-question-type-card-memory-checkbox
              ref="FormQuestionTypeCardMemoryCheckbox"
              @QuestionIsCardMemoryBinding="isCardMemoryQuestion = $event"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="2"
            class="d-flex flex-column"
          >
            <form-question-is-visible-checkbox
              ref="FormQuestionIsVisibleCheckbox"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="6"
            class="d-flex align-center"
          >
            <v-row dense>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
              >
                <form-answer-field
                  ref="FormAnswerCorrectField"
                  rules="required"
                  vid="answer-correct"
                  name-field-validate="Respuesta correcta"
                  ref-text-field="answer-correct-field"
                  label="Respuesta correcta"
                  placeholder="Escribe la respuesta correcta"
                  correct-answer
                />
                <!-- <v-divider class="my-3"/> -->
                <form-answer-field
                  ref="FormAnswerOneField"
                  rules="required"
                  vid="answer-one"
                  name-field-validate="Respuesta 1"
                  ref-text-field="answer-one-field"
                  label="Respuesta 1"
                  placeholder="Escribe la respuesta 1"
                />
                <form-answer-field
                  ref="FormAnswerTwoField"
                  rules="required"
                  vid="answer-two"
                  name-field-validate="Respuesta 2"
                  ref-text-field="answer-two-field"
                  label="Respuesta 2"
                  placeholder="Escribe la respuesta 2"
                />
                <form-answer-field
                  ref="FormAnswerThreeField"
                  rules="required"
                  vid="answer-three"
                  name-field-validate="Respuesta 3"
                  ref-text-field="answer-three-field"
                  label="Respuesta 3"
                  placeholder="Escribe la respuesta 3"
                />
              </v-col>
            </v-row>
          </v-col>
          <!-- <v-divider
            vertical
          ></v-divider> -->
          <!-- -------------------------------- -->
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="6"
            class="d-flex align-center"
          >
            <v-row dense>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
              >
                <form-reason-text-area
                  ref="FormReasonTextArea"
                  rules=""
                  vid="reason-question"
                  name-field-validate="Explicación"
                />
                <form-add-question-image
                  ref="FormAddQuestionImage"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-center flex-column flex-sm-row"
          >
            <v-btn
              :loading="loadingButtonUpdateQuestion"
              :disabled="disabledButtonUpdateQuestion || invalid"
              color="light-blue darken-3"
              class="mt-3 white--text"
              @click="UpdateQuestion"
            >
              <v-icon right dark class="mr-1"> mdi-database-refresh </v-icon>
              Actualizar
            </v-btn>
          </v-col>
        </v-row>
      </validation-observer>
    </v-card-text>
  </v-card-text>
</template>

<script src="./UpdateQuestionsTopic.js"></script>
