<template>
  <span :class="computedClasses">
    <slot>{{ text }}</slot>
  </span>
</template>

<script>
export default {
  name: 'TextLabel',
  props: {
    text: {
      type: String,
      default: ''
    },
    bold: {
      type: Boolean,
      default: true
    },
    variant: {
      type: String,
      default: 'subtitle-2', // subtitle-1, subtitle-2, body-1, body-2, caption
      validator: (value) => ['subtitle-1', 'subtitle-2', 'body-1', 'body-2', 'caption', 'overline'].includes(value)
    }
  },
  computed: {
    computedClasses() {
      return {
        'font-weight-bold': this.bold,
        [this.variant]: true
      }
    }
  }
}
</script>
