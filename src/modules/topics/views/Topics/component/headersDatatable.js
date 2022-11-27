export default {
  data () {
    return {
      headersDatatable: [
        {
          position: 1,
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'name',
          show: true
        },
        {
          position: 2,
          sortable: false,
          text: 'Acciones',
          align: 'center',
          value: 'actions-resource',
          show: true
        },
        {
          position: 3,
          sortable: false,
          text: 'Subtemas',
          align: 'center',
          value: 'manage-subtopics',
          show: true
        },
        {
          position: 4,
          sortable: false,
          text: 'Oposiciones',
          align: 'center',
          value: 'manage-oppositions',
          show: true
        },
        {
          position: 5,
          sortable: false,
          text: 'Preguntas',
          align: 'center',
          value: 'manage-questions',
          show: true
        }
      ]
    }
  }
}
