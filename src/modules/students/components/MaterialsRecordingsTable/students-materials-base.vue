<template>
  <v-card-text>
    <ServerDataTable
      ref="table"
      :headers="headers"
      :store-name="storeName"
      :load="loadStudentsMaterials"
    >
      <template v-slot:top>
        <!-- ------------ TOP ------------ -->
  
        <ResourceHeaderCrudTitle
          text-header="Students Materials"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
  
        <!-- ------------ ACTIONS ------------ -->
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-title-toolbar-datatable title-text="Students Materials" />
  
          <v-spacer />
  
          <resource-button
            icon-button="mdi-autorenew"
            @click="resetTableOptions"
          />
        </v-toolbar>
  
        <!-- ------------ SEARCH ------------ -->
        <SearchBar
          store-name="studentsMaterialsStore"
          @onChangeTags="onChangeTags"
          @onChangeLessons="onChangeLessons"
          @searchFieldExecuted="searchFieldExecuted"
          @searchFieldWithDebounce="searchFieldWithDebounce"
        />
      </template>
  
      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>
  
      <!-- ------------ SLOTS ------------ -->
      <template v-slot:[`item.tags`]="{ item }">
        <div v-if="item.tags">
          <v-chip
            v-for="(tag, index) in item.tags.split(',')"
            :key="index"
            class="ma-1"
            label
            small
          >
            {{ tag }}
          </v-chip>
        </div>
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <slot name="actions" v-bind="item"></slot>
      </template>
    </ServerDataTable>
  </v-card-text>
</template>
  
  <script>
  import _ from 'lodash'
  import { mapMutations, mapActions, mapState } from 'vuex'
  import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
  import headers from './students-materials-columns'
  import LessonRepository from '@/services/LessonRepository'
  import ServerDataTable from '@/modules/resources/components/resources/server-data-table.vue'
  import DownloadFile from '@/utils/DownloadMaterial'
  import { PermissionEnum } from '@/utils/enums'
  
  export default {
    name: 'StudentsMaterialsBase',
    components: {
      ResourceBannerNoDataDatatable: () =>
        import(
          /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
        ),
      ResourceTitleToolbarDatatable: () =>
        import(
          /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
        ),
      ResourceHeaderCrudTitle: () =>
        import(
          /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'
        ),
      SearchBar: () =>
        import(
          /* webpackChunkName: "SearchBar" */ '../searchBar/search-materials-bar.vue'
        ),
      ResourceButton: () =>
        import(
          /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
        ),
        // TagsAutoComplete: () =>
        // import(
        //   /* webpackChunkName: "TagsAutoComplete" */ '@/modules/resources/components/form/tags-auto-complete'
        // ),
      ServerDataTable
    },
    mixins: [componentButtonsCrud],
    props: {
      storeName: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState('studentsMaterialsStore', ['tags','lessons']),
      headers() {
        return headers
      },
      store() {
        return this.$store.state.storeName
      }
    },
    created() {
      this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 600)
    },
    mounted() {
      this.loadStudentsMaterials()
      this.$refs.table.reload()
    },
    methods: {
      ...mapActions('studentsMaterialsStore', ['resetTableOptions']),
      ...mapMutations('studentsMaterialsStore', [
        'SET_LESSONS',
        'SET_TAGS',
        'SET_TABLE_OPTIONS'
      ]),
      onChangeTags(value) {
        this.SET_TAGS(value)
        this.SET_TABLE_OPTIONS({ offset: 0 })
        this.$refs.table.reload()
      },
      onChangeLessons(value) {
        this.SET_LESSONS(value)
        this.SET_TABLE_OPTIONS({ offset: 0 })
        this.$refs.table.reload()
      },
      
      async loadStudentsMaterials(pagination) {
        const params = {
          ...pagination,
          tags: this.tags,
          lessons: this.lessons,
          type: this.type
        }

        console.log('called', params)
        
        const res = await LessonRepository.studentsMaterialList(params)
          
        return res
      },
  
      searchFieldExecuted($event) {
        this.SET_TABLE_OPTIONS({ content: $event, offset: 0 })
        this.$refs.table.reload()
      },
      searchFieldWithDebounce(value) {
        this.searchFieldExecuted(value)
      }
    }
  }
  </script>
  <style scoped>
  .v-data-table > .v-data-table__wrapper .v-data-table__mobile-table-row {
    margin-top: 10px;
    border: 2px solid #ededed;
    display: block;
    box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
    -webkit-box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
    -moz-box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
  }
  
  /* each cell border in mobile */
  .v-data-table > .v-data-table__wrapper .v-data-table__mobile-row {
    border-bottom: 2px solid #ededed;
  }
  
  .theme--light.v-divider {
    border-color: rgba(0, 0, 0, 0.6);
  }
  
  .circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  </style>
