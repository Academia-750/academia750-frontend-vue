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
          position: 2,
          text: '#Referencia',
          align: 'start',
          sortable: true,
          value: 'reference-number',
          show: true
        },
        {
          position: 3,
          text: 'Estado de carga',
          align: 'start',
          sortable: true,
          value: 'has_errors',
          show: true
        }
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
