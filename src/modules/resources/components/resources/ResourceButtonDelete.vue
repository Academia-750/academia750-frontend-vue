<template>
  <v-btn
    class="mx-1 white--text align-self-center"
    dark
    :x-small="!can_rendering_button_small"
    :small="can_rendering_button_small"
    :disabled="isDisabled"
    color="red"
    @click="$emit('actionConfirmShowDialogDelete')"
  >
    <span>{{ textButton }}</span>
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
</template>

<script>
import buttonsActionsDatatable from '@/modules/resources/mixins/componentButtonsCrud'

export default {
  name: 'ResourceButtonDelete',
  mixins: [buttonsActionsDatatable],
  props: {
    textButton: {
      type: String,
      default: 'Eliminar'
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
