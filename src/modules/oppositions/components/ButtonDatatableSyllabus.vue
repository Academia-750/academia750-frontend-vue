<template>
  <v-btn
    class="mx-1 white--text"
    dark
    :x-small="!can_rendering_button_small"
    :small="can_rendering_button_small"
    color="cyan accent-2"
    @click="pushRouteEditView"
  >
    <span >{{ textButton }}</span>
    <v-icon
      v-if="can_rendering_icon_button"
      class="ml-1"
      :x-small="!can_rendering_icon_small"
      :small="can_rendering_icon_small"
      dark
    >
      mdi-format-list-text
    </v-icon>
  </v-btn>
</template>

<script>
import buttonsActionsDatatable from '@/modules/resources/mixins/componentButtonsCrud'

export default {
  name: 'ButtonDatatableSyllabus',
  mixins: [buttonsActionsDatatable],
  props: {
    textButton: {
      type: String,
      default: 'Ver Temario'
    },
    configRoute: {
      type: Object,
      required: true
    }
  },
  methods: {
    pushRouteEditView () {
      this.$router.push(
        this.configRoute
      )
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
