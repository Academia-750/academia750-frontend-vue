<template>
  <v-combobox
    v-model="editItem.tags"
    :items="tagsList"
    :loading="loading"
    tags-list
    clearable
    label="Etiquetas"
    multiple
    solo
    outlined
    :dense="dense"
    @change="onChangeTags"
    @update:search-input="loadTags"
  >
    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip
        v-bind="attrs"
        :input-value="selected"
        close
        small
        @click="select"
        @click:close="remove(item)"
      >
        <strong>{{ item }}</strong>&nbsp;
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import WorkspaceMaterialRepository from '@/services/WorkspaceMaterialRepository'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'TagsAutoComplete',
  props: {
    limit: {
      type: Number,
      default: 5
    },
    dense: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Array,
      default: () => []
    },
    editItem: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tagsList: [],
      loading: false
    }
  },
  mounted() {
    this.loadTags()
  },
  methods: {
    async loadTags(value) {
      this.loading = true
      const tags = await WorkspaceMaterialRepository.searchTags({
        content: value,
        limit: this.limit
      })

      this.tagsList = tags.map((item) => (
        item.name
      ))
      this.loading = false

      return tags
    },
    onChangeTags(value) {
      this.$emit('change', value)
    },
    remove (item) {
      this.$emit('remove', item)
    }
  }
}
</script>
