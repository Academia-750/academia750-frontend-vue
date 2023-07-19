export default {
  components: {
    NombreFieldInput: () =>
      import(
        /* webpackChunkName: "DNIFieldInput" */ '@/modules/groups/components/form/NombreFieldInput'
      )
  }
}
