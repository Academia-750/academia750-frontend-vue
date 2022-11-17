export default {
  computed: {
    can_rendering_button_small () {
      return this.$vuetify.breakpoint.width >= 440
    },
    can_rendering_button_normal () {
      return this.$vuetify.breakpoint.width >= 650
    },
    can_rendering_icon_small () {
      return this.$vuetify.breakpoint.width >= 440 && !this.can_rendering_icon_normal
    },
    can_rendering_icon_normal () {
      return this.$vuetify.breakpoint.width >= 650
    },
    can_rendering_icon_button () {
      return this.$vuetify.breakpoint.width >= 340
    }
  }
}
