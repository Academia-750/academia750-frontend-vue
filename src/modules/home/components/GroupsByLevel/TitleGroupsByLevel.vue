<template>
  <h2 class="titulo_1">{{ title }}</h2>
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
