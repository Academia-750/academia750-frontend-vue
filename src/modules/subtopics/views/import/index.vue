<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Importar subtemas"
      :can-rendering-header="$vuetify.breakpoint.width < 700"
    />
    <v-container fluid class="blue lighten-5">
      <v-toolbar flat class="indigo lighten-5 my-2" outlined>
        <resource-button-go-back-router />
        <resource-title-toolbar-datatable title-text="Importar subtemas" />
        <resource-divider-title-datatable />
        <v-spacer></v-spacer>
        <div class="d-flex justify-center">
          <resource-button-download-template
            text-button="Descargar plantilla"
            color-button="success"
            @emitDownloadTemplateCsv="downloadTemplateImportApi"
          />
        </div>
      </v-toolbar>
      <vue-dropzone
        id="dropzoneFilesSubtopics"
        ref="dropzoneFilesImportSubtopics"
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

<script src="./importSubtopics.js"></script>
