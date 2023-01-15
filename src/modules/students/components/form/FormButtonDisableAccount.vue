<template>
  <v-btn
    class="mx-1 my-1"
    dark
    small
    :loading="loadingButton"
    color="deep-purple darken-1"
    @click="disableUsersSelected"
  >
    <span >Desactivar</span>
    <v-icon
      class="ml-1"
      small
      dark
    >
      mdi-close-circle
    </v-icon>
  </v-btn>
</template>

<script>
import ActionsByMultipleRecordsMixin from '../../mixins/ActionsByMultipleRecords.js'
import DatatableManageStudents from '../../mixins/DatatableManageStudents'
import { mapMutations } from 'vuex'

export default {
  mixins: [ActionsByMultipleRecordsMixin, DatatableManageStudents],
  methods: {
    ...mapMutations('studentsService', ['SET_MATCHES_RESET_OPTIONS_DATATABLE']),
    disableUsersSelected () {
      if (!this.hasSelectedAnyRecord) {
        this.alertErrorNotSelectedAnyRecord({
          message: 'Por favor, primero debes seleccionar al menos un alumno para desactivar'
        })

        return
      }

      this.actionMultipleRecordsApiRequest({
        action: 'lock-account',
        messageSuccess: 'Los alumnos seleccionados fueron desactivados.'
      })

      this.loadStudentsFromCurrentTab()
    }
  }
}
</script>
