<template>
  <v-btn
    small
    :color="color"
    :dark="!disabled"
    class="mx-1 align-self-center"
    :disabled="disabled"
    @click="onClick"
  >
    <span
      v-if="textButton && $vuetify.breakpoint.width >= widthLimit"
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
    color: {
      type: String,
      default: 'normal'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    textButton: {
      type: String,
      default: ''
    },
    iconButton: {
      type: String,
      default: 'mdi-plus'
    }
  },
  methods: {
    onClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped></style>
