<template>
  <v-divider
    v-if="$vuetify.breakpoint.width >= widthLimitTitleDivider && canShowDividerTitle"
    :class="classesTitleDivider"
    inset
    vertical
  ></v-divider>
</template>

<script>
export default {
  name: 'ResourceDividerTitleDatatable',
  props:{
    classesTitleDivider: {
      type: Object,
      default: function () {
        return {
          'mx-2': true
        }
      }
    },
    canShowDividerTitle: {
      type: Boolean,
      default: true
    },
    widthLimitTitleDivider: {
      type: Number,
      default: 700
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
