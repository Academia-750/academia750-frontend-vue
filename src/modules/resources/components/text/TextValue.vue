<template>
  <span :class="computedClasses">
    <slot>{{ text }}</slot>
  </span>
</template>

<script>
export default {
  name: 'TextValue',
  props: {
    text: {
      type: [String, Number],
      default: ''
    },
    variant: {
      type: String,
      default: 'body-1', // subtitle-1, subtitle-2, body-1, body-2, caption
      validator: (value) => ['subtitle-1', 'subtitle-2', 'body-1', 'body-2', 'caption', 'overline'].includes(value)
    }
  },
  computed: {
    computedClasses() {
      return {
        [this.variant]: true
      }
    }
  }
}
</script>
