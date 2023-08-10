<template>
  <v-combobox
    v-model="tags"
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
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tagsList: [],
      loading: false
    }
  },
  computed: {
    ...mapState('workspaceMaterialStore', ['tags', 'editItem'])
  },
  mounted() {
    this.loadTags()
  },
  methods: {
    ...mapMutations('workspaceMaterialStore', ['SET_EDIT_ITEM', 'SET_WORKSPACE', 'SET_TYPE', 'SET_TAGS']),
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
      this.SET_TAGS(value)
      this.$emit('change', value)
    },
    remove (item) {
      this.tags.splice(this.tags.indexOf(item), 1)
      this.$emit('remove', item)
    }
  }
}
</script>
