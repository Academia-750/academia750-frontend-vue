<template>
  <ValidationProvider
    ref="autocomplete"
    v-slot="{ errors }"
    mode="aggressive"
    :rules="rules"
    name="workspaces"
  >
    <v-autocomplete
      :value="workspaces"
      :items="workspacesList"
      :loading="loading"
      :error-messages="errors"
      workspaces-list
      clearable
      label="Nombre de la categorial"
      multiple
      solo
      outlined
      :dense="dense"
      item-text="name"
      item-value="id"
      @change="onChangeworkspaces"
      @update:search-input="loadWorkspaces"
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          small
          @click="select"
          @click:close="remove(item.id)"
        >
          <strong>{{ item.name }}</strong>
          &nbsp;
        </v-chip>
      </template>
    </v-autocomplete>
  </ValidationProvider>
</template>

<script>
import WorkspaceRepository from '@/services/WorkspaceRepository'
export default {
  name: 'WorkSpacesAutoComplete',
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
  data() {
    return {
      workspacesList: [],
      loading: false
    }
  },
  mounted() {
    this.loadWorkspaces()
  },
  methods: {
    async loadWorkspaces(value) {
      this.loading = true
      const workspaces = await WorkspaceRepository.searchWorkspaces({
        content: value,
        limit: this.limit
      })

      this.workspacesList = workspaces.map((item) => {
        return {
          name: item.name,
          id: item.id
        }
      })
      this.loading = false
    },
    onChangeworkspaces(value) {
      this.$emit('change', value)
    },
    remove(id) {
      this.$emit(
        'change',
        this.workspaces.filter((workspaceId) => workspaceId !== id)
      )
    },
    resetErrors() {
      this.$refs['autocomplete'] && this.$refs['autocomplete'].reset()
    }
  }
}
</script>
