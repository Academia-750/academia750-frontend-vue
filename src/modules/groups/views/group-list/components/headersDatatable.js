export default {
  data() {
    return {
      headersDatatable: [
        {
          position: 1,
          text: 'Código',
          align: 'start',
          sortable: true,
          value: 'code',
          show: true
        },
        {
          position: 2,
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'name',
          show: true
        },
        {
          position: 3,
          text: 'No. Alumnos',
          align: 'center',
          sortable: true,
          value: 'active_users',
          show: true
        },
        {
          position: 4,
          sortable: true,
          text: 'Fecha',
          align: 'start',
          value: 'created_at',
          show: true
        },
        {
          position: 5,
          sortable: false,
          text: 'Alumnos',
          align: 'center',
          value: 'alumnos',
          show: true
        },
        {
          position: 6,
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
