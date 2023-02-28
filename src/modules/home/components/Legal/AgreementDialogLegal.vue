<template>
  <v-row justify="center">
    <v-dialog
      v-model="isOpenDialog"
      width="600px"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="isOpenDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <iframe
            id="inlineFrameLegalFile"
            title="Legal File PDF"
            width="100%"
            height="800"
            :src="srcFileLegal"
          >
          </iframe>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="isOpenDialog = false">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'AgreementDialogLegal',
  props: {
    title: {
      type: String,
      required: true
    },
    srcFileLegal: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpenDialog: false
    }
  }
}
</script>
