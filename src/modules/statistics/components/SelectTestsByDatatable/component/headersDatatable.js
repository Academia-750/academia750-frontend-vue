export default {
  data () {
    return {
      headersDatatable: [
        {
          position: 1,
          text: 'Cuestionario generado',
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
        }
      ]
    }
  }
}
