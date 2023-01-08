<template>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list disabled>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in itemsErrors"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon>mdi-alert-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-content class="caption" v-text="item"></v-list-item-content>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider class="mb-3 grey lighten-1"></v-divider>
  </v-card>
</template>

<script>
export default {
  name: 'ErrorsRecordImportList',
  props: {
    itemsErrors: {
      type: Array,
      required: true
    }
  }
}
</script>
