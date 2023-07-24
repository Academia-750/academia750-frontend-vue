import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('groupsService', ['currentUserForUpdate', 'tabViewGroups']),
    checkIfThereIsAtLeast_1ModifiedData() {
      const { firstName, lastName, phone, email } = this.cache.data.group

      return (
        firstName !== this.form.firstName ||
        lastName !== this.form.lastName ||
        phone !== this.form.phone ||
        email !== this.form.email
      )
    },
    textButtonCancelDataEditGroup() {
      return this.isUpdateGroup ? 'Revertir cambios' : 'Cancelar proceso'
    },
    cancelProcessFormGroup() {
      return (
        this.form.dni ||
        this.form.firstName ||
        this.form.lastName ||
        this.form.phone ||
        this.form.email
      )
    },
    getTitleByUserDataForUpdateOrCreate() {
      return this.currentUserForUpdate === null
        ? 'Crear alumno'
        : 'Editar alumno'
    },
    activeStyleBlockButton() {
      return this.$vuetify.breakpoint.width <= 600
    },
    isUpdateUser() {
      return this.currentUserForUpdate !== null
    }
  }
}
