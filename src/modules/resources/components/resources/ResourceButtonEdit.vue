<template>
  <div>
    <v-btn
      class="mx-1 white--text"
      dark
      :x-small="!can_rendering_button_small"
      :small="can_rendering_button_small"
      color="success"
      @click="pushRouteEditEdit"
    >
      <span >Editar</span>
      <v-icon
        v-if="can_rendering_icon_button"
        class="ml-1"
        :x-small="!can_rendering_icon_small"
        :small="can_rendering_icon_small"
        dark
      >
        mdi-pencil
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import buttonsActionsDatatable from '@/modules/resources/mixins/componentButtonsCrud'

export default {
  name: 'ResourceButtonEdit',
  mixins: [buttonsActionsDatatable],
  props: {
    configRoute: {
      type: Object,
      required: true
    },
    onlyDispatchClickEvent: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    pushRouteEditEdit () {
      if (this.onlyDispatchClickEvent) {
        this.$emit('DispatchClickEvent')

        return
      }

      this.$router.push(
        this.configRoute
      )
    }
  }
}
</script>
