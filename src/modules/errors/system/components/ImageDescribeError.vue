<template>
  <div class="overflow-y-auto">
    <v-img :src="srcImage" :max-height="maxHeight" contain />
  </div>
</template>

<script>
export default {
  name: 'ImageDescribeError',
  props: {
    srcImage: {
      type: String,
      default: '/images/errors/error-server.jpg'
    },
    maxHeight: {
      type: Number,
      default: 400
    }
  }
}
</script>