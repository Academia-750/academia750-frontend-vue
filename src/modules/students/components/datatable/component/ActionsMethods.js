export default {
  methods: {
    async deleteStudentAction () {
      if (this.currentItemsSelectedForDelete === null || this.currentItemsSelectedForDelete === undefined) {
        return
      }

      try {
        await this.deleteStudent({
          id: this.currentItemsSelectedForDelete.id,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El alumno ha sido eliminado con éxito.',
          timer: 3000
        })

        this.$refs['ResourceTextFieldSearch'].searchWordText = ''
        this.searchWord = ''

        this.loadStudentsFromCurrentTab()
      } catch (error) {
        //console.log(error)
      }
    },
    async disableAccountStudentAction(id) {
      try {
        await this.disableAccountStudent({
          id,
          data: {},
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El alumno ha sido desactivado con éxito.',
          timer: 5000
        })

        this.$refs['ResourceTextFieldSearch'].searchWordText = ''
        this.searchWord = ''

        this.loadStudentsFromCurrentTab()
      } catch (error) {
        //console.log(error)
      }
    },
    async enableAccountStudentAction(id) {
      try {
        await this.enableAccountStudent({
          id,
          data: {},
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El alumno ha sido activado con éxito.',
          timer: 5000
        })

        this.$refs['ResourceTextFieldSearch'].searchWordText = ''
        this.searchWord = ''

        this.loadStudentsFromCurrentTab()
      } catch (error) {
        //console.log(error)
      }
    }
  }
}
