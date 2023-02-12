export default {
  computed: {
    get_items_per_page_options_datatable() {
      let itemsPerPageOptions = []

      // Tamaño pantalla 4k
      if (this.$vuetify.breakpoint.width >= 2560) {
        itemsPerPageOptions = [
          5, 10, 25, 50, 100, 250, 500
        ]
      }

      // Tamaño laptop grande
      if (this.$vuetify.breakpoint.width >= 1440) {
        itemsPerPageOptions = [
          5, 10, 25, 50, 100, 250
        ]
      }

      // Tamaño laptop normal
      if (this.$vuetify.breakpoint.width >= 1024 && this.$vuetify.breakpoint.width < 1440) {
        itemsPerPageOptions = [
          5, 10, 25, 50, 100
        ]
      }

      // Tamaño tablet
      if (this.$vuetify.breakpoint.width >= 768 && this.$vuetify.breakpoint.width < 1024) {
        itemsPerPageOptions = [
          5, 10, 25, 50, 100
        ]
      }

      // Tamaño mobile grande
      if (this.$vuetify.breakpoint.width >= 425 && this.$vuetify.breakpoint.width < 768) {
        itemsPerPageOptions = [
          5, 10, 25, 50, 100
        ]
      }

      // Tamaño mobile mediano
      if (this.$vuetify.breakpoint.width >= 375 && this.$vuetify.breakpoint.width < 425) {
        itemsPerPageOptions = [
          5, 10, 25, 50, 100
        ]
      }

      // Tamaño mobile pequeño
      if (this.$vuetify.breakpoint.width >= 320 && this.$vuetify.breakpoint.width < 375) {
        itemsPerPageOptions = [
          5, 10, 25, 50, 100
        ]
      }

      // Tamaño mobile super pequeño
      if (this.$vuetify.breakpoint.width < 320) {
        itemsPerPageOptions = [
          5, 10, 25, 50, 100
        ]
      }

      return {
        'items-per-page-options': itemsPerPageOptions
      }
    },
    filter__headers_datatable() {
      return this.headersDatatable.filter((x) => x.show)
    },
    get_headers_datatable () {
      return this.filter__headers_datatable.sort( (nextObject, previousObject) => {
        return nextObject.position - previousObject.position
      })
    }
  }
}
