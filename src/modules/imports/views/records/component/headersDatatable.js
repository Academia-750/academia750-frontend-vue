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
          sortable: true,
          value: 'has-errors',
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
