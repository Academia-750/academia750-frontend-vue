<template>
  <div>
    <v-list-item
      v-if="!menuItem.items && display(menuItem)"
      :input-value="menuItem.value"
      :to="calculateRouteLink(menuItem)"
      :exact="menuItem.exact"
      :disabled="menuItem.disabled"
      active-class="white--text"
      :href="menuItem.href"
      :target="menuItem.target"
      link
    >
      <v-list-item-icon>
        <v-icon :small="small" :class="{ 'grey--text': menuItem.disabled }">
          {{ menuItem.icon || 'mdi-circle-medium' }}
        </v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>
          {{ menuItem.key ? $t(menuItem.key) : menuItem.text }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-group
      v-else-if="display(menuItem)"
      :value="menuItem.regex ? menuItem.regex.test($route.path) : false"
      :disabled="menuItem.disabled"
      :sub-group="subgroup"
      link
    >
      <template v-slot:activator>
        <v-list-item-icon v-if="!subgroup">
          <v-icon :small="small">{{
            menuItem.icon || 'mdi-circle-medium'
          }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ menuItem.key ? $t(menuItem.key) : menuItem.text }}
          </v-list-item-title>
        </v-list-item-content>
      </template>

      <slot></slot>
    </v-list-group>
  </div>
</template>

<script>
/*
|---------------------------------------------------------------------
| Navigation Menu Item Component
|---------------------------------------------------------------------
|
| Navigation items for the NavMenu component
|
*/
export default {
  props: {
    menuItem: {
      type: Object,
      default: () => {}
    },
    subgroup: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    calculateRouteLink(itemMenu) {
      let routeTo = itemMenu.link

      if (!routeTo) {
        if (typeof itemMenu.to === 'string') {
          routeTo = {
            name: itemMenu.to
          }
        } else {
          routeTo = itemMenu.to
        }
      }

      return routeTo
    },
    display(menuItem) {
      // No permission requested
      if (!(menuItem.roles || menuItem.permissions)) {
        return true
      }

      // Any or both conditions
      return (
        this.$hasRoles(menuItem.roles) ||
        this.$hasPermission(menuItem.permissions)
      )
    }
  }
}
</script>
