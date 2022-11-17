<template>
  <div>
    <v-btn
      class="mx-1 white--text"
      dark
      :x-small="!can_rendering_button_small"
      :small="can_rendering_button_small"
      color="red"
    >
      <span >Eliminar</span>
      <v-icon
        v-if="can_rendering_icon_button"
        class="ml-1"
        :x-small="!can_rendering_icon_small"
        :small="can_rendering_icon_small"
        dark
      >
        mdi-delete
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import buttonsActionsDatatable from '@/modules/resources/mixins/buttonsActionsDatatable'

export default {
  name: 'ResourceButtonDelete',
  mixins: [buttonsActionsDatatable],
  props: {
    configRoute: {
      type: Object,
      required: true
    }
  },
  methods: {
    pushRouteDeleteView () {
      this.$router.push(
        this.configRoute
      )
    }
  }
}
</script>
