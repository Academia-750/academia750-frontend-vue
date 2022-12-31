export default {
  data() {
    return {
      headersDatatable: [
        {
          text: 'Pregunta',
          align: 'start',
          sortable: false,
          value: 'question-text',
          show: true
        },
        {
          text: 'Respuesta marcada',
          align: 'start',
          sortable: false,
          value: 'answer-solved-in-question',
          show: true
        },
        {
          text: 'Alternativa correcta',
          align: 'start',
          sortable: false,
          value: 'answer-correct-question',
          show: true
        },
        {
          text: 'Fecha',
          align: 'start',
          sortable: false,
          value: 'finished-at',
          show: true
        },
        { text: '', value: 'data-table-expand' }
      ]
    }
  }
}
