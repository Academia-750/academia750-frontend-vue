<template>
  <v-btn
    class="mx-1 white--text"
    dark
    :x-small="!can_rendering_button_small"
    :small="can_rendering_button_small"
    :color="colorButton"
    @click="$emit('emitDownloadTemplateCsv')"
  >
    <span>{{ textButton }}</span>
    <v-icon
      v-if="can_rendering_icon_button"
      class="ml-1"
      :x-small="!can_rendering_icon_small"
      :small="can_rendering_icon_small"
      dark
    >
      {{ iconButton }}
    </v-icon>
  </v-btn>
</template>

<script>
import buttonsActionsDatatable from '@/modules/resources/mixins/componentButtonsCrud'

export default {
  name: 'ResourceButtonDownloadTemplate',
  mixins: [buttonsActionsDatatable],
  props: {
    colorButton: {
      type: String,
      default: 'success'
    },
    textButton: {
      type: String,
      default: 'Editar'
    },
    iconButton: {
      type: String,
      default: 'mdi-arrow-down'
    }
  }
}
</script>
