<template>
  <p class="font-weight-black text-center text-h6 text-sm-h4 text-md-h3 text-lg-h3 text-xl-h3 mb-4">{{ title }}</p>
</template>

<script>
export default {
  name: 'TitleGroupsByLevel',
  props: {
    title: {
      type: String,
      default: 'Grupos por nivel'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
