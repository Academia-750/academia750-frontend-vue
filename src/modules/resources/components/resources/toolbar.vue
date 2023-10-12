<template>
  <div>
    <ResourceHeaderCrudTitle
      :text-header="title"
      :can-rendering-header="$vuetify.breakpoint.width < 700"
    />
    <v-toolbar flat class="indigo lighten-5 my-md-2" outlined elevation="2">
      <resource-button-go-back-router :width-number-limit="300" />
      <v-toolbar-title class="align-center d-none d-md-flex">
        <v-icon right class="">{{ icon }}</v-icon>
        <span class="ml-2 font-weight-medium text-xs-caption text-sm-h7">
          {{ title }}
        </span>
      </v-toolbar-title>
      <v-spacer />
      <slot name="actions" />
    </v-toolbar>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Toolbar',
  components: {
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ './ResourceButtonGoBackRouter.vue'
      ),
    ResourceHeaderCrudTitle: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ './ResourceHeaderCrudTitle.vue'
      )
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
