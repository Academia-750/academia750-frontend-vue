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
import { mapState, mapActions } from 'vuex'
import DatatableManageStudents from '../../mixins/DatatableManageStudents.js'

export default {
  mixins: [DatatableManageStudents],
  data () {
    return {
      loadingButton: false
    }
  },
  computed: {
    ...mapState('studentsService', ['usersSelected']),
    isDisabledButton () {
      return Array.isArray(this.usersSelected) && this.usersSelected.length > 0
    }
  },
  methods: {
    ...mapActions('studentsService', ['actionsForMultipleRecords']),
    async actionMultipleRecordsApiRequest () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.loadingButton = true

        await this.actionsForMultipleRecords({
          data: {
            'action': 'delete',
            'users': this.mapIdUsersSelected()
          },
          config: {}
        })
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButton = false

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'Los alumnos seleccionados fueron eliminados.',
          timer: 7500
        })

        await this.loadStudentsFromCurrentTab()

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButton = false
        this.alertErrorRequest()
      }
    },
    alertErrorRequest () {
      this.$swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
        showConfirmButton: true,
        confirmButtonText: '¡Entendido!',
        timer: 7500
      })
    },
    alertErrorNotSelectedAnyRecord () {
      this.$swal.fire({
        icon: 'info',
        title: 'Por favor, primero debes seleccionar al menos un alumno para dar de baja',
        showConfirmButton: true,
        confirmButtonText: '¡Entendido!',
        timer: 7500
      })
    },
    confirmDeleteRecordsSelected () {
      if (Array.isArray(this.usersSelected) && this.usersSelected.length === 0) {
        this.alertErrorNotSelectedAnyRecord()

        return
      }

      this.$swal.fire({
        width: '800px',
        icon: 'question',
        title: 'DAR DE BAJA',
        html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas eliminar todos los alumnos seleccionados y los datos relaciones a estos?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.actionMultipleRecordsApiRequest()

        }
      })
    },
    mapIdUsersSelected () {
      return this.usersSelected.map((user) => {
        return user.id
      })
    }
  }
}
</script>
