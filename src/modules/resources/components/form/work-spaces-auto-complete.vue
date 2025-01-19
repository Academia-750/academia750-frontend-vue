<template>
  <BaseAutocomplete
    ref="autocomplete"
    name="categoría"
    label="Categoría"
    :limit="limit"
    :values="workspaces"
    :value="workspace"
    :rules="rules"
    :load-data="loadWorkspaces"
    item-text="name"
    item-value="id"
    :multiple="multiple"
    :disabled="disabled"
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
    multiple: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 10
    },
    dense: {
      type: Boolean,
      default: false
    },
    // Used for single selection
    workspace: {
      type: Object,
      default: () => {}
    },
    // Used for multiple selection
    workspaces: {
      type: Array,
      default: () => []
    },
    rules: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    asAdmin: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    async loadWorkspaces(value) {
      const workspaces = await WorkspaceRepository.searchWorkspaces({
        content: value,
        limit: this.limit,
        asAdmin: this.asAdmin
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
