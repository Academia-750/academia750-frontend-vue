<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="items"
    show-select
    item-key="topic-group-id"
    no-data-text="No hay grupos de temas disponibles"
    :items-per-page="30"
    class="elevation-1"
  >
  </v-data-table>
</template>

<script>
export default {
  name: 'FormDatatableSelectTopicGroups',
  props: {
    items: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    }
  },
  data: () => ({
    selected: [],
    headers: [
      {
        text: 'Grupo de tema',
        sortable: true,
        value: 'topic-group-name'
      }
    ]
  }),
  watch: {
    selected (value) {
      this.$emit('emitSelectedItems', value)
    }
  }
}
</script>
