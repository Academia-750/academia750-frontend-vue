export default {
  data() {
    return {
      headersDatatable: [
        {
          position: 1,
          text: 'Nombre archivo',
          align: 'start',
          sortable: true,
          value: 'name-file',
          show: true
        },
        {
          position: 2,
          sortable: true,
          text: 'Número de registros',
          align: 'center',
          value: 'total-number-of-records',
          show: true
        },
        {
          position: 3,
          sortable: false,
          text: 'Acciones',
          align: 'center',
          value: 'actions-resource',
          show: true
        }
      ]
    }
  }
}
