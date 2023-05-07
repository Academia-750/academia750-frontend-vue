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
          text: '# Subtemas',
          align: 'start',
          sortable: false,
          value: 'total-count-subtopics',
          show: true
        },
        {
          text: 'Grupo de tema',
          align: 'start',
          sortable: false,
          value: 'topic_group',
          show: true
        },
        {
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
        },
        {
          position: 4,
          sortable: false,
          text: 'Subtemas',
          align: 'center',
          value: 'manage-subtopics',
          show: true
        },
        {
          position: 5,
          sortable: false,
          text: 'Oposiciones',
          align: 'center',
          value: 'manage-oppositions',
          show: true
        },
        {
          position: 6,
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
