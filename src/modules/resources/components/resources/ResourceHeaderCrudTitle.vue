<template>
  <v-card
    v-if="canRenderingHeader"
    :class="classeWrapperCard"
    elevation="24"
    outlined
    @click="$emit('emitClickHeaderCard')"
  >
    <v-card-text class="mt-2">
      <p class="text-center">
        <span :class="classesParagraphText">{{ textHeader }}</span>
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ResourceHeaderCrudTitle',
  props: {
    canRenderingHeader: {
      type: Boolean,
      default: true
    },
    classesParagraphText: {
      type: Object,
      default: function () {
        return {
          'font-italic': true,
          'font-weight-bold': true,
          'title': true
        }
      }
    },
    classeWrapperCard: {
      type: Object,
      default: function () {
        return {
          'mb-3': true,
          'mx-2': true,
          'cursor-pointer': true
        }
      }
    },
    textHeader: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
  .cursor-pointer {
    cursor: pointer !important;
  }
</style>
