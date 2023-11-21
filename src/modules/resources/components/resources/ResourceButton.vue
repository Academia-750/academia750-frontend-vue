<template>
  <v-btn
    small
    :color="color"
    :dark="!disabled"
    class="mx-1 align-self-center"
    :disabled="disabled"
    @click="onClick"
  >
    <v-progress-circular
      v-show="loading"
      :size="20"
      :width="4"
      color="primary"
      indeterminate
      class="pr-4"
    >
    </v-progress-circular>
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
    },
    configRoute: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      if (this.disabled) {
        return
      }
      if (this.configRoute && Object.keys(this.configRoute).length) {
        this.$router.push(this.configRoute)
      }
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped></style>
