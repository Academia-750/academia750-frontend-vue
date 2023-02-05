export default {
  data() {
    return {
      headersDatatable: [
        {
          text: 'Tema',
          align: 'start',
          sortable: false,
          value: 'topic_name',
          show: true
        },
        {
          text: '# Preguntas Correctas',
          align: 'start',
          sortable: false,
          value: 'total_questions_correct',
          show: true
        },
        {
          text: '# Preguntas Incorrectas',
          align: 'start',
          sortable: false,
          value: 'total_questions_wrong',
          show: true
        },
        {
          text: '# Preguntas No respondidas',
          align: 'start',
          sortable: false,
          value: 'total_questions_unanswered',
          show: true
        },
        {
          text: '% Preguntas Correctas',
          align: 'start',
          sortable: false,
          value: 'percentage_with_format',
          show: true
        }
      ]
    }
  }
}
