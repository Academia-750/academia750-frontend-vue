export default {
  data() {
    return {
      headersDatatable: [
        {
          position: 1,
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'question-text',
          show: true
        },
        {
          position: 2,
          text: 'Fecha de alta',
          align: 'start',
          sortable: true,
          value: 'created-at',
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
