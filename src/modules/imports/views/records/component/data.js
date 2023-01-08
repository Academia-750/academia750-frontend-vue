export default {
  data() {
    return {
      importProcessData: null,
      headersDescriptionRecord: [
        {
          text: 'Columna',
          align: 'start',
          sortable: false,
          value: 'name-row',
          show: true
        },
        {
          sortable: false,
          text: 'Errores',
          align: 'center',
          value: 'description-errors',
          show: true
        }
      ],
      expandedItemsDatatable: []
    }
  }
}
