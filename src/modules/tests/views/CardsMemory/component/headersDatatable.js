export default {
  data () {
    return {
      headersDatatable: [
        {
          position: 1,
          text: 'Tarjeta de memoria',
          align: 'start',
          sortable: true,
          value: 'created-at',
          show: true
        },
        {
          text: 'Número de preguntas',
          align: 'start',
          sortable: true,
          value: 'test-questions-count',
          show: true
        },
        {
          position: 3,
          sortable: false,
          text: 'Opciones',
          align: 'center',
          value: 'actions-resource',
          show: true
        }
      ]
    }
  }
}
