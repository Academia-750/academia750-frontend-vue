import ProfileRepository from '@/services/ProfileRepository'
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
    openRoleModal(item) {
      this.$refs.searchStudent.open()
      this.user_id = item.id
    },
    onSelect(value) {
      this.role_id = value.id
    },
    async assignRole() {
      this.isAddingRole = true
      await ProfileRepository.assignRole(this.user_id,this.role_id)
      this.isAddingUser = false
      this.loadStudentsFromCurrentTab()
    }
  }
}
