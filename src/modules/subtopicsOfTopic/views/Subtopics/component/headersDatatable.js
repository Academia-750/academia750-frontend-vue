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
          text: 'Preguntas',
          align: 'center',
          value: 'manage-questions',
          show: true
        }
      ]
    }
  }
}
