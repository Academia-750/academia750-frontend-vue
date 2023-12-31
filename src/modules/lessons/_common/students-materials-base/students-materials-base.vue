<template>
  <ServerDataTable
    ref="table"
    :headers="headers"
    :store-name="storeName"
    item-key="material_id"
    :load="loadStudentsMaterials"
  >
    <template v-slot:top>
      <!-- ------------ ACTIONS ------------ -->
      <Toolbar :title="title" :icon="icon" :back="!!lesson">
        <template #actions>
          <resource-button
            icon-button="mdi-autorenew"
            @click="resetTableOptions"
          />
        </template>
      </Toolbar>

      <div class="mt-3">
        <!-- ------------ SEARCH ------------ -->
        <LessonMaterialsSearchBar
          :content="content"
          :tags="tags"
          :workspaces="workspaces"
          @onChangeTags="onChangeTags"
          @onChangeContent="onChangeContent"
          @onChangeWorkspaces="onChangeWorkspaces"
        />
      </div>
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
</template>

<script>
import _ from 'lodash'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headers from './students-materials-columns'
import LessonRepository from '@/services/LessonRepository'
import ServerDataTable from '@/modules/resources/components/resources/server-data-table.vue'

export default {
  name: 'StudentsMaterialsBase',
  components: {
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
      ),

    LessonMaterialsSearchBar: () =>
      import(
        /* webpackChunkName: "LessonMaterialsSearchBar" */ '../search-lessons-materials-bar.vue'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    ServerDataTable
  },
  mixins: [componentButtonsCrud],
  props: {
    title: {
      type: String,
      required: true
    },
    storeName: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    icon: { type: String, required: true }
  },
  data() {
    return {}
  },
  computed: {
    tags() {
      return this.$store.state[this.storeName].tags
    },
    workspaces() {
      return this.$store.state[this.storeName].workspaces
    },
    lesson() {
      return this.$store.state[this.storeName].lesson
    },
    content() {
      return this.$store.state[this.storeName].tableOptions.content
    },
    headers() {
      return headers
    }
  },

  methods: {
    onChangeTags(value) {
      this.$store.commit(`${this.storeName}/SET_TAGS`, value)
      this.$store.commit(`${this.storeName}/SET_TABLE_OPTIONS`, { offset: 0 })

      this.$refs.table.reload()
    },
    onChangeWorkspaces(value) {
      this.$store.commit(`${this.storeName}/SET_WORKSPACES`, value)
      this.$store.commit(`${this.storeName}/SET_TABLE_OPTIONS`, { offset: 0 })
      this.$refs.table.reload()
    },

    async loadStudentsMaterials(pagination) {
      const params = {
        ...pagination,
        tags: this.tags,
        lessons: this.lesson ? [this.lesson.id] : undefined,
        workspaces: this.workspaces.map((workspace) => workspace.id),
        type: this.type
      }

      const res = await LessonRepository.studentsMaterialList(params)

      return res
    },

    onChangeContent(content) {
      this.$store.commit(`${this.storeName}/SET_TABLE_OPTIONS`, {
        content,
        offset: 0
      })

      this.$refs.table.reload()
    },
    resetTableOptions() {
      this.$store.dispatch(`${this.storeName}/resetTableOptions`)

      this.$refs.table.reload()
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
