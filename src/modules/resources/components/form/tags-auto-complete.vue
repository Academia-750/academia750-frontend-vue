<template>
  <BaseAutocomplete
    ref="autocomplete"
    name="temas"
    label="Temas"
    :limit="limit"
    :values="tags"
    :rules="rules"
    :load-data="loadTags"
    @change="onChange"
  />
</template>

<script>
import WorkspaceMaterialRepository from '@/services/WorkspaceMaterialRepository'
import BaseAutocomplete from './base-multiple-autocomplete.vue'

export default {
  name: 'TagsAutoComplete',
  components: { BaseAutocomplete },
  props: {
    limit: {
      type: Number,
      default: 5
    },
    tagType: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      default: () => []
    },
    rules: {
      type: String,
      default: ''
    }
  },

  methods: {
    async loadTags(value) {
      const items = await WorkspaceMaterialRepository.searchTags({
        content: value,
        limit: this.limit,
        type: this.tagType
      })

      return items.map((item) => item.name)
    },
    onChange(values) {
      this.$emit('change', values)
    },
    resetErrors() {
      this.$refs['autocomplete'] && this.$refs['autocomplete'].resetErrors()
    }
  }
}
</script>
