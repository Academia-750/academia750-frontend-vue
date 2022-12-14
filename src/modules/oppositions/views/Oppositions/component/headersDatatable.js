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
          text: 'Periodo',
          value: 'period',
          show: true
        },
        {
          position: 3,
          text: 'Fecha de alta',
          align: 'start',
          sortable: true,
          value: 'created-at',
          show: true
        },
        {
          position: 4,
          sortable: false,
          text: 'Acciones',
          align: 'center',
          value: 'actions-resource',
          show: true
        },
        {
          position: 5,
          sortable: false,
          text: 'Temario',
          align: 'center',
          value: 'syllabus',
          show: true
        }
      ]
    }
  }
}
