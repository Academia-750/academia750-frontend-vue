export default {
  data() {
    return {
      headersDatatable: [
        {
          position: 1,
          text: 'DNI/NIE',
          align: 'start',
          sortable: true,
          value: 'dni',
          show: true
        },
        {
          position: 2,
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'full_name',
          show: true
        },
        {
          position: 4,
          sortable: true,
          text: 'Teléfono',
          align: 'start',
          value: 'phone',
          show: true
        },
        {
          position: 5,
          sortable: false,
          text: 'Email',
          align: 'start',
          value: 'email',
          show: true
        },
        {
          position: 6,
          sortable: false,
          text: 'Fecha de alta',
          align: 'center',
          value: 'created_at',
          show: true
        },
        {
          position: 7,
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
