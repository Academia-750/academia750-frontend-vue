<template>
  <!-- ------------ TOP ------------ -->
  <div>
    <!-- ------------ SEARCH ------------ -->
    <resource-text-field-search
      :search-word="state.tableOptions.content"
      label-text-field="Buscar por nombre"
      @emitSearchTextBinding="searchFieldWithDebounce"
      @emitSearchWord="searchFieldExecuted"
    />
    <!-- ------------ TYPE SECTION ------------ -->
    <div class="d-flex align-center mx-3 type-section">
      <v-select
        :items="types"
        item-text="label"
        item-value="key"
        persistent-hint
        label="Tipos"
        :value="state.type"
        dense
        outlined
        class="mr-2"
        clearable
        @change="onChangeType"
      ></v-select>
      <v-select
        :value="state.workspace"
        :items="workspaces"
        item-text="label"
        item-value="key"
        persistent-hint
        label="Categoría"
        dense
        outlined
        class="mr-2"
        clearable
        @change="onChangeWorkspace"
      ></v-select>
      <TagsAutoComplete
        tag-type="material"
        :dense="true"
        @change="onChangeTags"
      />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import WorkspaceRepository from '@/services/WorkspaceRepository'

export default {
  name: 'SearchBar',
  components: {
    TagsAutoComplete: () =>
      import(
        /* webpackChunkName: "TagsAutoComplete" */ '@/modules/resources/components/form/tags-auto-complete'
      ),
    ResourceTextFieldSearch: () =>
      import(
        /* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'
      )
  },
  props: {
    storeName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      types: [
        {
          key: 'material',
          label: 'Materiales'
        },
        {
          key: 'recording',
          label: 'Grabaciones'
        }
      ],
      workspaces: []
    }
  },
  computed: {
    state() {
      return this.$store.state[this.storeName]
    }
  },
  mounted() {
    this.loadWorkspaces()
  },
  methods: {
    onChangeType(value) {
      console.log('storename', this.storeName)
      this.$emit('onChangeType', value)
    },
    onChangeWorkspace(value) {
      this.$emit('onChangeWorkspace', value)
    },
    onChangeTags(value) {
      this.$emit('onChangeTags', value)
    },
    searchFieldExecuted($event) {
      this.$emit('searchFieldExecuted', $event)
    },
    searchFieldWithDebounce(value) {
      this.$emit('searchFieldExecuted', value)
    },
    async create() {
      this.$refs.table.reload()
    },
    async loadWorkspaces(pagination) {
      const params = {
        ...pagination
      }

      const res = await WorkspaceRepository.list(params)

      this.workspaces = res.results.map((item) => ({
        key: item.id.toString(),
        label: item.name
      }))
    }
  }
}
</script>
<style lang="scss" scoped>
.lessons-info {
  display: flex;
  width: 100%;
  justify-content: space-between;
  .lessons-attributes {
    display: flex;
    flex: 2;
    gap: 12px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-right: 20px;
  }
  .lessons-actions {
    display: flex;
    flex: 1;
    gap: 8px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
@media screen and (max-width: 600px) {
  .lessons-info {
    .lessons-attributes {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: flex-start;
      justify-content: center;
      margin-right: 20px;
    }
    .lessons-actions {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
    }
  }
}
</style>
