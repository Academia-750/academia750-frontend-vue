<template>
  <v-dialog
    v-model="showDialog"
    max-width="600"
  >
    <v-card>
      <v-card-title class="title indigo lighten-5">
        {{ title }}
      </v-card-title>

      <v-card-text class="mt-3">
        <slot name="identifier-record"></slot>
        <v-divider class="my-2"></v-divider>
        <div class="d-flex justify-center mt-2">
          <span class="font-weight-bold red--text subtitle-1">{{ description }}</span>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="green darken-1"
          text
          @click="showDialog = false"
        >
          Cancelar
        </v-btn>

        <v-btn
          color="green darken-1"
          text
          @click="deleteRecord"
        >
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'ResourceDialogConfirmDelete',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: 'Esta accion no podrá ser revertida'
    }
  },
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    deleteRecord () {
      this.showDialog = false
      this.$emit('actionDelete')
    }
  }
}
</script>
