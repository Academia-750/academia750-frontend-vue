<template>
  <div>
    <ServerDataTable
      ref="table"
      :headers="headers"
      :store-name="storeName"
      item-key="id"
      :load="loadStudentsAssessments"
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
      <template v-slot:[`item.workspace`]="{ item }">
        <span v-if="item.material && item.material.workspace_name">
          {{ item.material.workspace_name }}
        </span>
      </template>
      <template v-slot:[`item.name`]="{ item }">
        <span v-if="item.material && item.material.name">
          {{ item.material.name }}
        </span>
        <span v-else>-</span>
      </template>
      <template v-slot:[`item.tags`]="{ item }">
        <div v-if="item.material && item.material.tags">
          <v-chip
            v-for="(tag, index) in item.material.tags.split(',')"
            :key="index"
            class="ma-1"
            label
            small
          >
            {{ tag }}
          </v-chip>
        </div>
        <span v-else>-</span>
      </template>
      <template v-slot:[`item.response`]="{ item }">
        <span :class="getResponseTextClass(item)">
          <span v-html="getResponseText(item)"></span>
        </span>
      </template>
      <template v-slot:[`item.mark`]="{ item }">
        <span v-if="item.result">
          {{ item.result.mark }}
          <span v-if="item.average_mark" class="grey--text text--lighten-1">
            ({{ item.average_mark }})
          </span>
        </span>
        <span v-else>-</span>
      </template>
      <template v-slot:[`item.position`]="{ item }">
        <v-chip
          v-if="item.result && item.result.position"
          :color="getPositionColor(item)"
          text-color="white"
          small
        >
          {{ item.result.position }}
        </v-chip>
        <span v-else>-</span>
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <slot name="actions" v-bind="item"></slot>
      </template>
    </ServerDataTable>
  </div>
</template>

<script>
import _ from 'lodash'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headers from './students-assessments-columns'
import LessonRepository from '@/services/LessonRepository'
import ServerDataTable from '@/modules/resources/components/resources/server-data-table.vue'
import { getMarkColor } from '@/modules/lessons/_common/assessment.helper'

export default {
  name: 'StudentsAssessmentsList',
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
        /* webpackChunkName: "LessonMaterialsSearchBar" */ '@/modules/lessons/_common/search-lessons-materials-bar.vue'
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
    getResponseTextClass(item) {
      if (!item.result) return 'grey--text' // no result - gray
      const mark = parseFloat(item.result.mark)

      if (mark >= 5) return 'success--text' // success - passing grade

      return 'error--text' // fail - failing grade
    },
    getResponseText(item) {
      if (!item.result) return 'Sin responder' // no result

      return `<span class="success--text">${item.result.questions_right}</span> <span class="mx-1 grey--text"> / </span> <span class="error--text">${item.result.questions_wrong}</span> <span class="mx-1 grey--text"> / </span> <span class="orange--text">${item.result.questions_not_answered}</span>`
    },
    getPositionColor(item) {
      if (!item.result || !item.result.mark) {
        return 'grey'
      }

      return getMarkColor(item.result.mark, item.lowest_mark, item.highest_mark)
    },
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

    async loadStudentsAssessments(pagination) {
      const params = {
        ...pagination,
        tags: this.tags,
        lessons: this.lesson ? [this.lesson.id] : undefined,
        workspaces:
          this.workspaces.length > 0
            ? this.workspaces.map((workspace) => workspace.id)
            : undefined
      }

      const res = await LessonRepository.studentsAssessmentsList(params)

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
