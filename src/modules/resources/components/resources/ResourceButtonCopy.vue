<template>
  <div>
    <v-btn
      class="mx-1 align-self-center"
      dark
      :x-small="!can_rendering_button_small"
      :small="can_rendering_button_small"
      color="primary"
      :disabled="disabled"
      @click="onClick"
    >
      <span >{{ textButton }}</span>
      <v-icon 
        dark 
        class="ml-1"
        :x-small="!can_rendering_icon_small"
        :small="can_rendering_icon_small"
      >
        mdi-content-copy
      </v-icon>
    </v-btn>
  </div>
</template>

<script>
import buttonsActionsDatatable from '@/modules/resources/mixins/componentButtonsCrud'

export default {
  name: 'ResourceButtonCopy',
  mixins: [buttonsActionsDatatable],
  props: {
    widthLimit: {
      type: Number,
      default: 425
    },
    disabled: {
      type: Boolean,
      default: false
    },
    textButton: {
      type: String,
      default: 'Agregar'
    },
    iconButton: {
      type: String,
      default: 'mdi-plus'
    },
    configRoute: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onClick() {
      if (this.configRoute && Object.keys(this.configRoute).length) {
        this.$router.push(this.configRoute)
      }
      this.$emit('click')
    }
  }
}
</script>
