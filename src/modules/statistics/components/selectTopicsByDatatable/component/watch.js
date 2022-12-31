export default {
  watch: {
    optionsDatatable: {
      handler () {
        this.loadDatatatable()
      },
      deep: true
    },
    topicsSelected: {
      handler () {
        if (this.singleSelectDatatable) {

          if (this.topicsSelected.length === 0) {
            this.$emit('emitChangeSelectedTopics', null)

            return
          }

          this.$emit('emitChangeSelectedTopics', this.topicsSelected[0])

          return
        }

        this.$emit('emitChangeSelectedTopics', this.topicsSelected)
      },
      deep: true
    }
  }
}
