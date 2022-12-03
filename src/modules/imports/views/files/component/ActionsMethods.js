import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions('importsService', ['getImportProcesses'])
  }
}
