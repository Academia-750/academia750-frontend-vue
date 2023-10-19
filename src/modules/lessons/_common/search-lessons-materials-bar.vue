<template>
  <!-- ------------ TOP ------------ -->
  <div>
    <!-- ------------ SEARCH ------------ -->
    <resource-text-field-search
      :search-word="content"
      :classes-wrapper="{}"
      label-text-field="Buscar por nombre del fichero"
      @emitSearchTextBinding="searchFieldWithDebounce"
      @emitSearchWord="searchFieldExecuted"
    />
    <!-- ------------ TYPE SECTION ------------ -->
    <div class="tabs mx-3">
      <div>
        <TagsAutoComplete
          tag-type="material"
          :tags="tags"
          :dense="true"
          @change="onChangeTags"
        />
      </div>
      
      <div>
        <WorkSpacesAutoComplete
          tag-type="material"
          :workspaces="workspaces"
          :dense="true"
          @change="onChangeWorkspaces"
        />
      </div>
      
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
    WorkSpacesAutoComplete: () =>
      import(
        /* webpackChunkName: "WorkSpacesAutoComplete" */ '@/modules/resources/components/form/work-spaces-auto-complete'
      ),
    ResourceTextFieldSearch: () =>
      import(
        /* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'
      )
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    tags: {
      type: Array,
      default: () => []
    },
    lessons: {
      type: Array,
      default: () => []
    },
    workspaces: {
      type: Array,
      default: () => []
    }
  },
  created() {
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 600)
  },
  methods: {
    onChangeTags(value) {
      this.$emit('onChangeTags', value)
    },
    onChangeLessons(value) {
      this.$emit('onChangeLessons', value)
    },
    onChangeWorkspaces(value) {
      this.$emit('onChangeWorkspaces', value)
    },
    searchFieldExecuted($event) {
      this.$emit('onChangeContent', $event)
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs {
  display: grid;
  width: 70%;
  grid-template-columns: repeat(2, 1fr);
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
    width: auto;
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
