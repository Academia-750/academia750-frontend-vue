<template>
  <v-list-item-icon>
    <v-icon>{{ iconName }}</v-icon>
  </v-list-item-icon>
</template>

<script>
export default {
  name: 'IconArrowLinkListMenu',
  props: {
    iconName: {
      type: String,
      default: 'mdi-arrow-right-drop-circle'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
