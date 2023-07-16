export default {
  watch: {
    currentUserForUpdate (value) {
      if (value === null) {
        this.ResetForm()

        return
      }

      this.loadDataUserForUpdate(value)
    }
  }
}
