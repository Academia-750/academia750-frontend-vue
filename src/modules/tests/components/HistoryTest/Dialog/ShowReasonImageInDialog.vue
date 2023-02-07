<template>
  <v-dialog
    v-model="showReasonImageInDialog"
    transition="dialog-bottom-transition"
    max-width="800"
  >
    <template>
      <v-card max-width="800">
        <v-toolbar flat dark color="primary">
          <v-btn
            icon
            dark
            @click="showReasonImageInDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Previsualizar imagen</v-toolbar-title>
        </v-toolbar>
        <v-img contain max-width="800" :src="pathImage"></v-img>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'ShowReasonImageInDialog',
  props: {
    pathImage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showReasonImageInDialog: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
