<template>
  <v-toolbar
    flat
    class="indigo lighten-5 my-md-2 mx-md-2"
    outlined
    elevation="2"
  >
    <resource-button-go-back-router
      v-if="backButton"
      :width-number-limit="300"
    />
    <v-toolbar-title class="d-flex align-center">
      <v-icon large right class="mx-1">{{ icon }}</v-icon>
      <span class="ml-2 font-weight-medium text-xs-caption text-sm-h7">
        {{ title }}
      </span>
    </v-toolbar-title>
  </v-toolbar>
</template>
<script lang="ts">
export default {
  name: 'Toolbar',
  components: {
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ './ResourceButtonGoBackRouter.vue'
      )
  },
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    backButton: {
      type: Boolean,
      default: true
    }
  }
}
</script>
