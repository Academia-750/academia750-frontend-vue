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
        class="v-select"
        :value="state.type"
        outlined
        clearable
        :dense="$vuetify.breakpoint.width < 700"
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
      <WorkSpacesAutoComplete
        v-show="!hideWorkspace"
        :workspace="state.workspace"
        :multiple="false"
        :as-admin="true"
        @change="onChangeWorkspace"
      />
      <!-- <v-select
        v-show="!hideWorkspace"
        :value="state.workspace"
        :items="workspaces"
        item-text="label"
        item-value="key"
        persistent-hint
        label="Categoría"
        outlined
        class="v-select"
        clearable
        :dense="$vuetify.breakpoint.width < 700"
        @change="onChangeWorkspace"
      ></v-select> -->
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

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
      ),
    WorkSpacesAutoComplete: () =>
      import(
        /* webpackChunkName: "WorkSpacesAutoComplete" */ '@/modules/resources/components/form/work-spaces-auto-complete'
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
      ]
    }
  },
  computed: {
    state() {
      return this.$store.state[this.storeName]
    }
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
    }
  }
}
</script>
<style lang="scss" scoped>
v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
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
}
@media screen and (max-width: 600px) {
  .tabs {
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
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
