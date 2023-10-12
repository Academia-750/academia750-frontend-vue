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
    <v-row class="ml-1 mr-1">
      <v-col cols="6" md="4">
        <TagsAutoComplete
          tag-type="material"
          :tags="tags"
          :dense="true"
          @change="onChangeTags"
        />
      </v-col>
      <v-col cols="6" md="4">
        <LessonsAutoComplete
          tag-type="material"
          :lessons="lessons"
          :dense="true"
          @change="onChangeLessons"
        />
      </v-col>
      <v-col cols="6" md="4">
        <WorkSpacesAutoComplete
          tag-type="material"
          :workspaces="workspaces"
          :dense="true"
          @change="onChangeWorkspaces"
        />
      </v-col>
    </v-row>
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
    LessonsAutoComplete: () =>
      import(
        /* webpackChunkName: "TagsAutoComplete" */ '@/modules/resources/components/form/lessons-auto-complete'
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
