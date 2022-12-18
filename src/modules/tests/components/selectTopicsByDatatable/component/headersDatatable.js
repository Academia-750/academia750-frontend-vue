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
          text: 'Fecha de alta',
          align: 'start',
          sortable: true,
          value: 'created-at',
          show: true
        }
      ]
    }
  }
}
