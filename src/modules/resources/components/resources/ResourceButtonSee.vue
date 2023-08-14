<template>
  <v-btn
    small
    color="primary"
    :dark="!disabled"
    class="mx-1 align-self-center"
    :disabled="disabled"
    @click="onClick"
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
export default {
  name: 'ResourceButtonAdd',
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
      default: 'mdi-eye'
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

<style lang="scss" scoped></style>
