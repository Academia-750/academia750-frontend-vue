/**
 * TODO: This need to be generic
 */
export default {
  computed: {
    get_items_per_page_options_datatable() {
      let itemsPerPageOptions = []

      // Size screen 4k
      if (this.$vuetify.breakpoint.width >= 2560) {
        itemsPerPageOptions = [5, 10, 25, 50, 100, 250, 500]
      }

      // Size laptop big
      if (this.$vuetify.breakpoint.width >= 1440) {
        itemsPerPageOptions = [5, 10, 25, 50, 100, 250]
      }

      // Size laptop normal
      if (
        this.$vuetify.breakpoint.width >= 1024 &&
        this.$vuetify.breakpoint.width < 1440
      ) {
        itemsPerPageOptions = [5, 10, 25, 50, 100]
      }

      // Size tablet
      if (
        this.$vuetify.breakpoint.width >= 768 &&
        this.$vuetify.breakpoint.width < 1024
      ) {
        itemsPerPageOptions = [5, 10, 20, 40, 80]
      }

      // Size mobile big
      if (
        this.$vuetify.breakpoint.width >= 425 &&
        this.$vuetify.breakpoint.width < 768
      ) {
        itemsPerPageOptions = [5, 10, 20, 40]
      }

      // Size mobile medium
      if (
        this.$vuetify.breakpoint.width >= 375 &&
        this.$vuetify.breakpoint.width < 425
      ) {
        itemsPerPageOptions = [5, 10, 25]
      }

      // Size mobile pequeño
      if (
        this.$vuetify.breakpoint.width >= 320 &&
        this.$vuetify.breakpoint.width < 375
      ) {
        itemsPerPageOptions = [5, 10, 15]
      }

      // Size mobile super pequeño
      if (this.$vuetify.breakpoint.width < 320) {
        itemsPerPageOptions = [5, 10]
      }

      return {
        'items-per-page-options': itemsPerPageOptions
      }
    },
    filter__headers_datatable() {
      return this.headersDatatable.filter((x) => x.show)
    },
    get_headers_datatable() {
      return this.filter__headers_datatable.sort(
        (nextObject, previousObject) => {
          return nextObject.position - previousObject.position
        }
      )
    }
  }
}
