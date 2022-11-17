export default {
  computed: {
    can_rendering_button_small () {
      return this.$vuetify.breakpoint.width >= 440
    },
    can_rendering_icon_small () {
      return this.$vuetify.breakpoint.width >= 440
    },
    can_rendering_icon_button () {
      return this.$vuetify.breakpoint.width >= 340
    }
  }
}
