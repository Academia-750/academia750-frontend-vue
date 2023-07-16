<template>
  <v-btn
    class="mx-1 my-1"
    dark
    small
    color="red"
    :loading="loadingButton"
    @click="confirmDeleteRecordsSelected"
  >
    <span >Dar de baja</span>
    <v-icon
      class="ml-1"
      small
      dark
    >
      mdi-delete
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
    confirmDeleteRecordsSelected () {
      if (!this.hasSelectedAnyRecord) {
        this.alertErrorNotSelectedAnyRecord({
          message: 'Por favor, primero debes seleccionar al menos un alumno para dar de baja'
        })

        return
      }

      this.$swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title: 'DAR DE BAJA',
        html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas eliminar todos los alumnos seleccionados y los datos relacionados a estos?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.actionMultipleRecordsApiRequest({
            action: 'delete',
            messageSuccess: 'Los alumnos seleccionados fueron eliminados.'
          })

          this.loadStudentsFromCurrentTab()

        }
      })
    }
  }
}
</script>
