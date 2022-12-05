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
          sortable: true,
          text: '#Registros con éxito',
          align: 'center',
          value: 'total-number-successful-records',
          show: true
        },
        {
          position: 4,
          sortable: true,
          text: '#Registros fallidos',
          align: 'center',
          value: 'total-number-failed-records',
          show: true
        },
        {
          position: 5,
          sortable: true,
          text: 'Fecha de inicio',
          align: 'center',
          value: 'created-at',
          show: true
        },
        {
          position: 6,
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
