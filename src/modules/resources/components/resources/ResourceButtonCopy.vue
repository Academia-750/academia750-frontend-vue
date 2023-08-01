<template>
  <v-btn
    small
    color="primary"
    :dark="!disabled"
    class="mx-1 align-self-center"
    :disabled="disabled"
    @click="onClick"
  >
    <span >{{ textButton }}</span>
    <v-icon small dark class="ml-1">
      mdi-content-copy
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'ResourceButtonCopy',
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
