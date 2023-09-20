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
          value: 'first-name',
          show: true
        },
        {
          position: 3,
          text: 'Apellidos',
          align: 'start',
          sortable: true,
          value: 'last-name',
          show: true
        },
        {
          position: 4,
          text: 'Teléfono',
          align: 'start',
          sortable: true,
          value: 'phone',
          show: true
        },
        {
          position: 5,
          text: 'Email',
          align: 'start',
          sortable: true,
          value: 'email',
          show: true
        },
        {
          position: 6,
          text: 'Grupos',
          align: 'start',
          sortable: false,
          value: 'groups',
          show: true
        },
        {
          position: 7,
          text: 'Perfil',
          align: 'start',
          sortable: false,
          value: 'role',
          show: true
        },
        {
          position: 8,
          sortable: true,
          text: 'Fecha de alta',
          align: 'center',
          value: 'created-at',
          show: true
        },
        {
          position: 9,
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
