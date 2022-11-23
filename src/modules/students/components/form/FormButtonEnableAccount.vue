<template>
  <v-btn
    class="mx-1 my-1"
    dark
    small
    color="success"
    :loading="loadingButton"
    @click="enableUsersSelected"
  >
    <span >Reactivar</span>
    <v-icon
      class="ml-1"
      small
      dark
    >
      mdi-check-circle
    </v-icon>
  </v-btn>
</template>

<script>
import ActionsByMultipleRecordsMixin from '../../mixins/ActionsByMultipleRecords.js'

export default {
  mixins: [ActionsByMultipleRecordsMixin],
  methods: {
    enableUsersSelected () {
      if (!this.hasSelectedAnyRecord) {
        this.alertErrorNotSelectedAnyRecord({
          message: 'Por favor, primero debes seleccionar al menos un alumno para reactivarlo'
        })

        return
      }

      this.actionMultipleRecordsApiRequest({
        action: 'unlock-account',
        messageSuccess: 'Los alumnos seleccionados fueron reactivados.'
      })

    }
  }
}
</script>
