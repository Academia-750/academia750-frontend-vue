<template>
  <v-autocomplete
    v-model="inputValue"
    :items="itemsGroups"
    :loading="loading"
    auto-select-first
    dense
    outlined
    small-chips
    clearable
    :autofocus="autofocus"
    item-text="text"
    item-value="uuid"
    label="Buscar por Nombre"
    return-object
    :no-filter="true"
    @change="onSelect"
    @update:search-input="loadGroups"
  >
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title>{{ data.item.name }}</v-list-item-title>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import GroupRepository from '@/services/GroupRepository'
export default {
  name: 'GroupAutoComplete',
  props: {
    limit: {
      type: Number,
      default: 3
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      itemsGroups: [],
      inputValue: '',
      loading: false
    }
  },

  mounted() {
    this.loadGroups('')
  },

  methods: {
    clearAutoComplete() {
      this.inputValue = ''
    },
    async loadGroups(value) {
      this.loading = true
      const groups = await GroupRepository.list({
        content: value,
        limit: this.limit
      })
      
      this.itemsGroups = groups.results.map((item) => {
        return {
          text: `${item.name}`,
          name: `${item.name}`,
          id: `${item.id}`
        }
      })
      this.loading = false
    },

    onSelect(item) {
      this.$emit('change', item)
    },
    clear() {
      this.inputValue = ''
    }
  }
}
</script>
