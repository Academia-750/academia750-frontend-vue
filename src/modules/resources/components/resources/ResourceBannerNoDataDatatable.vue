<template>
  <div :class="classesWrapperDiv">
    <p :class="classesParagraph">
      <slot name="message">
        {{ messageText }}
      </slot>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ResourceBannerNoDataDatatable',
  props: {
    messageText: {
      type: String,
      default: 'No hay datos disponibles'
    },
    classesParagraph: {
      type: Object,
      default: function () {
        return {
          'font-weight-bold': true
        }
      }
    },
    classesWrapperDiv: {
      type: Object,
      default: function () {
        return {
          'd-flex': true,
          'justify-center': true,
          'mb-4': true,
          'mt-6': true
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
