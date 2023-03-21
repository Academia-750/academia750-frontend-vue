<template>
  <h3 class="titulo_1">{{ title }}</h3>
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
