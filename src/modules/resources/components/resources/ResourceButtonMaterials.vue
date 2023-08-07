<template>
  <v-btn
    small
    color="primary"
    :dark="!disabled"
    class="mx-1 align-self-center"
    :disabled="disabled"
    @click="pushRouteListMaterials"
  >
    <span
      v-if="$vuetify.breakpoint.width >= widthLimit"
      class="font-weight-bold mr-1"
    >
      {{ textButton }}
    </span>
    <v-icon small dark>{{ iconButton }}</v-icon>
  </v-btn>
</template>

<script>
import buttonsActionsDatatable from '@/modules/resources/mixins/componentButtonsCrud'

export default {
  name: 'ResourceButtonAdd',
  mixins: [buttonsActionsDatatable],
  props: {
    widthLimit: {
      type: Number,
      default: 425
    },
    onlyDispatchClickEvent: {
      type: Boolean,
      default: false
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
      default: 'mdi-book-open-page-variant'
    },
    configRoute: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    pushRouteListMaterials() {
      if (this.onlyDispatchClickEvent) {
        this.$emit('DispatchClickEvent')

        return
      }

      this.$router.push(this.configRoute)
    }
  }
}
</script>

<style lang="scss" scoped></style>
