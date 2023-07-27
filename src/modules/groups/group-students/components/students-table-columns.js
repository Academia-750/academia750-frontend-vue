export default function (discharged) {
  const columns = [
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
      sortable: true,
      text: 'Email',
      align: 'start',
      value: 'email',
      show: true
    },
    {
      position: 6,
      sortable: true,
      text: 'Fecha de alta',
      align: 'center',
      value: 'created_at',
      show: true
    },
    {
      position: 7,
      sortable: true,
      text: 'Fecha de Baja',
      align: 'center',
      value: 'discharged_at',
      show: discharged
    },
    {
      position: 7,
      sortable: false,
      text: 'Acciones',
      align: 'center',
      value: 'actions',
      show: !discharged
    }
  ]

  return columns.filter((column) => column.show)
}
