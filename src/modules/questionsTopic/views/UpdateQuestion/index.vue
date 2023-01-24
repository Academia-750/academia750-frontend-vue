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
        <!-- <v-btn
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
        </v-btn> -->
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
              rules="required|max:65535"
            />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="2"
            class="d-flex flex-column"
          >
            <form-question-type-test-checkbox
              ref="FormQuestionTypeTestCheckbox"
              @QuestionIsTestBinding="bindingIsTestState"
            />
            <form-question-type-card-memory-checkbox
              ref="FormQuestionTypeCardMemoryCheckbox"
              @QuestionIsCardMemoryBinding="bindingIsCardMemoryState"
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
            lg="12"
          >
            <v-divider class="grey lighten-2"></v-divider>
          </v-col>
          <v-col
            v-if="dataAnswersUuid.length > 0"
            cols="12"
            sm="12"
            md="12"
            lg="6"
            class="d-flex align-center"
          >
            <v-row dense>
              <v-col
                v-show="isTestQuestion"
                cols="12"
                sm="12"
                md="12"
                lg="12"
              >
                <v-container
                  class="px-0 d-flex justify-end"
                  fluid
                >
                  <v-switch
                    v-model="isQuestionBinary"
                    :label="`Es pregunta binaria: ${getLabelByQuestionBinary}`"
                  ></v-switch>
                </v-container>
              </v-col>
              <v-col
                cols="12"
                sm="12"
                md="12"
                lg="12"
              >

                <div v-show="!isQuestionBinary">
                  <form-answer-field
                    ref="FormAnswerCorrectField"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[0]"
                    rules="required|max:65535"
                    vid="answer-correct"
                    name-field-validate="Respuesta correcta"
                    ref-text-field="answer-correct-field"
                    label="Respuesta correcta"
                    placeholder="Escribe la respuesta correcta"
                    :is-required-answer="!isQuestionBinary"
                    correct-answer
                    :forbidden-grouper-answer="!isTestQuestion"
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                  <!-- <v-divider class="my-3"/> -->
                  <form-answer-field
                    v-show="isTestQuestion"
                    ref="FormAnswerOneField"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[1]"
                    rules="required|max:65535"
                    vid="answer-one"
                    name-field-validate="Respuesta 1"
                    ref-text-field="answer-one-field"
                    label="Respuesta 1"
                    placeholder="Escribe la respuesta 1"
                    :is-required-answer="!isQuestionBinary && isTestQuestion"
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                  <form-answer-field
                    v-show="isTestQuestion"
                    ref="FormAnswerTwoField"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[2]"
                    rules="required|max:65535"
                    vid="answer-two"
                    name-field-validate="Respuesta 2"
                    ref-text-field="answer-two-field"
                    label="Respuesta 2"
                    placeholder="Escribe la respuesta 2"
                    :is-required-answer="!isQuestionBinary && isTestQuestion"
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                  <form-answer-field
                    v-show="isTestQuestion"
                    ref="FormAnswerThreeField"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[3]"
                    rules="required|max:65535"
                    vid="answer-three"
                    name-field-validate="Respuesta 3"
                    ref-text-field="answer-three-field"
                    label="Respuesta 3"
                    placeholder="Escribe la respuesta 3"
                    :is-required-answer="!isQuestionBinary && isTestQuestion"
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                </div>
                <div v-show="isQuestionBinary">
                  <form-answer-field
                    ref="FormAnswerCorrectFieldOfQuestionBinary"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[0]"
                    rules="required|max:65535"
                    vid="answer-correct-of-question-binary"
                    name-field-validate="Respuesta correcta"
                    ref-text-field="answer-correct-field-of-question-binary"
                    label="Respuesta correcta"
                    placeholder="Escribe la respuesta correcta"
                    correct-answer
                    :is-required-answer="isQuestionBinary"
                    forbidden-grouper-answer
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                  <!-- <v-divider class="my-3"/> -->
                  <form-answer-field
                    v-show="isTestQuestion"
                    ref="FormAnswerAnotherFieldOfQuestionBinary"
                    :answer-grouper-selected="answerGrouperSelected"
                    :uuid="dataAnswersUuid[1]"
                    rules="required|max:65535"
                    vid="another-answer-of-question-binary"
                    name-field-validate="Segunda alternativa"
                    ref-text-field="answer-another-field-of-question-binary"
                    label="Segunda alternativa"
                    placeholder="Escribe la segunda alternativa"
                    :is-required-answer="isQuestionBinary && isTestQuestion"
                    forbidden-grouper-answer
                    @AnswerIsGrouperValueBinding="bindingCheckGroupAnswer"
                  />
                </div>
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
                <div v-if="reasonText" class="d-flex justify-space-around">
                  <v-checkbox
                    v-model="show_reason_text_in_test"
                    label="Mostrar en Test"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="show_reason_text_in_card_memory"
                    label="Mostrar en Tarjeta de memoria"
                  ></v-checkbox>
                </div>
                <form-reason-text-area
                  ref="FormReasonTextArea"
                  vid="reason-question"
                  name-field-validate="Explicación"
                  :has-reason-image="imageReason !== null"
                  :is-card-memory="isCardMemoryQuestion"
                  :is-there-image-question-update="isThereImageQuestionUpdate"
                  @ReasonQuestionBinding="reasonText = $event"
                />
                <div v-if="imageReason || isThereImageQuestionUpdate" class="d-flex justify-space-around mt-4">
                  <v-checkbox
                    v-model="show_reason_image_in_test"
                    label="Mostrar en Test"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="show_reason_image_in_card_memory"
                    label="Mostrar en Tarjeta de memoria"
                  ></v-checkbox>
                </div>
                <form-add-question-image
                  ref="FormAddQuestionImage"
                  :is-card-memory="isCardMemoryQuestion"
                  @ImageBinding="imageReason = $event"
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
