<template>
  <BaseAutocomplete
    ref="autocomplete"
    class="workspace-autocomplete"
    name="workspace"
    label="Categoría"
    :limit="limit"
    :values="workspaces"
    :rules="rules"
    :load-data="loadWorkspaces"
    item-text="name"
    item-value="id"
    @change="onChangeWorkspaces"
  />
</template>

<script>
import WorkspaceRepository from '@/services/WorkspaceRepository'
import BaseAutocomplete from './base-multiple-autocomplete.vue'

export default {
  name: 'WorkSpacesAutoComplete',
  components: { BaseAutocomplete },
  props: {
    limit: {
      type: Number,
      default: 5
    },
    dense: {
      type: Boolean,
      default: false
    },
    workspaces: {
      type: Array,
      default: () => []
    },
    rules: {
      type: String,
      default: ''
    }
  },

  methods: {
    async loadWorkspaces(value) {
      const workspaces = await WorkspaceRepository.searchWorkspaces({
        content: value,
        limit: this.limit
      })

      return workspaces.map((item) => {
        return {
          name: item.name,
          id: item.id
        }
      })
    },
    onChangeWorkspaces(value) {
      this.$emit('change', value)
    },

    resetErrors() {
      this.$refs['autocomplete'] && this.$refs['autocomplete'].resetErrors()
    }
  }
}
</script>
<style lang="scss" scoped>
.workspace-autocomplete::v-deep {
  .v-input__slot {
    padding: 8px !important;
  }
}
</style>
