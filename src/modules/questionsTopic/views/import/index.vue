<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Importar preguntas"
      :can-rendering-header="true"
    />
    <v-container fluid class="blue lighten-5">
      <vue-dropzone
        id="dropzoneFilesQuestions"
        ref="dropzoneFilesImportQuestions"
        :options="dropzoneOptions"
        @vdropzone-file-added="vdropAddedFile"
        @vdropzone-queue-complete="vdropQueueCompleted"
        @vdropzone-success-multiple="vdropSuccessProcessSendFiles"
      >
      </vue-dropzone>
      <div class="d-flex justify-center mt-4">
        <v-btn
          dark
          color="success"
          :loading="loadingButton"
          @click="sendFilesApi"
        >
          <v-icon dark class="mr-1"> mdi-check </v-icon>
          Enviar
        </v-btn>
      </div>
    </v-container>
  </v-card-text>
</template>

<script src="./importQuestions.js"></script>
