export default {
  components: {
    NombreFieldInput: () =>
      import(
        /* webpackChunkName: "NombreFieldInput" */ '@/modules/groups/components/form/NombreFieldInput'
      )
  }
}
