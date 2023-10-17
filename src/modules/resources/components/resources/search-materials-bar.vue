<template>
  <div>
    <!-- ------------ SEARCH ------------ -->
    <resource-text-field-search
      :search-word="state.tableOptions.content"
      :classes-wrapper="{}"
      label-text-field="Buscar por nombre"
      @emitSearchTextBinding="searchFieldWithDebounce"
      @emitSearchWord="searchFieldExecuted"
    />
    <div class="tabs align-center mx-3 type-section">
      <!-- ------------ TYPE ------------ -->
      <v-select
        :items="types"
        item-text="label"
        item-value="key"
        persistent-hint
        label="Tipos"
        class="v-select ml-2"
        style="padding: 4px 0"
        :value="state.type"
        outlined
        clearable
        @change="onChangeType"
      ></v-select>

      <!-- ------------ TAGS ------------ -->
      <TagsAutoComplete
        :tags="state.tags"
        tag-type="material"
        :dense="true"
        @change="onChangeTags"
      />

      <!-- -----------WORKSPACE ------------ -->
      <v-select
        v-show="!hideWorkspace"
        :value="state.workspace"
        :items="workspaces"
        item-text="label"
        item-value="key"
        persistent-hint
        label="Categoría"
        outlined
        class="ml-2 v-select "
        style="padding: 4px 0"
        clearable
        @change="onChangeWorkspace"
      ></v-select>
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
    },
    tags: {
      type: Array,
      default: () => []
    },
    hideWorkspace: {
      type: Boolean,
      default: false
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
v-text-field.v-text-field--enclosed:not(.v-text-field--rounded) > .v-input__control > .v-input__slot, .v-text-field.v-text-field--enclosed .v-text-field__details {
    padding: 7px 12px;
}
.tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 11px;
  margin-top: 15px;
}
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
  .v-select::v-deep {
  .v-input__slot {
    padding: 8px !important;
  }
}
}
@media screen and (max-width: 600px) {
  .tabs {
  grid-template-columns: repeat(2, 1fr);
}
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
