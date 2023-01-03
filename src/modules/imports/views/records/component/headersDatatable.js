export default {
  data() {
    return {
      headersDatatable: [
        {
          position: 1,
          text: '#Fila',
          align: 'start',
          sortable: true,
          value: 'number-of-row',
          show: true
        },
        {
          position: 3,
          sortable: true,
          text: 'Fecha de registro',
          align: 'center',
          value: 'created-at',
          show: true
        },
        {
          position: 4,
          text: 'Estado de carga',
          align: 'center',
          sortable: false,
          value: 'has-errors',
          show: true
        },
        { text: 'Descripción', value: 'data-table-expand' }
        /* ,
        {
          position: 2,
          sortable: false,
          text: 'Acciones',
          align: 'center',
          value: 'actions-resource',
          show: true
        } */
      ]
    }
  }
}
