export default {
  watch: {
    optionsDatatable: {
      handler () {
        this.loadDatatatable()
      },
      deep: true
    },
    testsSelected: {
      handler () {
        if (this.singleSelectDatatable) {

          if (this.testsSelected.length === 0) {
            this.$emit('emitChangeSelectedTests', null)

            return
          }

          this.$emit('emitChangeSelectedTests', this.testsSelected[0])

          return
        }

        this.$emit('emitChangeSelectedTests', this.testsSelected)
      },
      deep: true
    }
  }
}
