<template>
  <v-toolbar-title
    v-if="$vuetify.breakpoint.width >= widthLimitToolbarTitle"
    :class="classesToolbarTitle"
  >
    {{ titleText }}

  </v-toolbar-title>

</template>

<script>
export default {
  name: 'ResourceTitleToolbarDatatable',
  props: {
    widthLimitToolbarTitle: {
      type: Number,
      default: 700
    },
    classesToolbarTitle: {
      type: Object,
      default: function () {
        return {
          'ml-2': true
        }
      }
    },
    titleText: {
      type: String,
      required: true
    }

  }
}
</script>
