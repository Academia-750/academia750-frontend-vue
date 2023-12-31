<template>
  <!-- ------------ ADD STUDENT TO LESSON ------------ -->
  <ServerDataTable
    ref="table"
    :headers="headers"
    store-name="lessonAttendeesStore"
    item-key="user_id"
    :load="loadLessonStudents"
  >
    <template v-slot:top>
      <!-- ------------ ACTIONS ------------ -->
      <Toolbar :title="lesson.name" icon="mdi-account-multiple">
        <template slot="actions">
          <span
            v-show="willJoin !== undefined"
            class="font-weight-bold text-md-h6 text-subtitle-2 mr-1"
          >
            Asistentes: {{ willJoin }} / {{ total }}
          </span>
          <resource-button icon-button="mdi-autorenew" @click="reset()" />
        </template>
      </Toolbar>
      <div style="position: relative">
        <resource-text-field-search
          :search-word="store.tableOptions.content"
          label-text-field="Buscar por nombre o DNI del estudiante"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
        <div
          class="d-flex align-center mx-3 top-4"
          style="position: absolute; z-index: 1; top: 3rem"
        >
          <span class="text-subtitle-1 mr-1">Solo asistentes</span>
          <v-checkbox
            :input-value="willAssist"
            class="mt-3"
            @change="filterByWillAssist"
          ></v-checkbox>
        </div>
      </div>
    </template>

    <!-- ------------ NO DATA ------------ -->
    <template v-slot:no-data>
      <resource-banner-no-data-datatable />
    </template>
    <!-- ------------ SLOTS ------------ -->'<template
      v-slot:[`item.will_join`]="{ item }"
    >
      <div>
        <v-chip
          class="ma-1"
          label
          small
          :color="item.will_join ? 'primary' : ''"
        >
          {{ item.will_join ? 'SI' : 'NO' }}
        </v-chip>
      </div>
    </template>
  </ServerDataTable>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapMutations, mapState } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import LessonRepository from '@/services/LessonRepository'
import headers from './lessons-attendees-table-columns'

export default {
  name: 'DatatableLessonsAttendees',
  components: {
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    ServerDataTable: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ '@/modules/resources/components/resources/server-data-table'
      ),
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
      ),
    ResourceTextFieldSearch: () =>
      import(
        /* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      )
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
      searchWordText: '',
      loading: false,
      lesson: {}
    }
  },
  computed: {
    ...mapState('lessonAttendeesStore', ['willJoin', 'total', 'willAssist']),
    headers() {
      return headers
    },
    store() {
      return this.$store.state.lessonAttendeesStore
    }
  },
  watch: {
    searchWord(value) {
      this.searchWordText = value
    }
  },

  created() {
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 600)
  },

  mounted() {
    this.getLessonInfo()
  },

  methods: {
    ...mapActions('lessonAttendeesStore', ['resetTableOptions']),
    ...mapMutations('lessonAttendeesStore', [
      'SET_TABLE_OPTIONS',
      'SET_WILL_JOIN',
      'SET_TOTAL',
      'SET_WILL_ASSIST'
    ]),
    async getLessonInfo() {
      const lessonId = this.$route.params.id

      this.lesson = await LessonRepository.info(lessonId)
    },
    async filterByWillAssist(value) {
      this.SET_WILL_ASSIST(value)
      this.loadLessonStudents()
      this.tableReload()
    },
    tableReload() {
      this.$refs.table.reload()
    },
    async loadLessonStudents(pagination) {
      const lessonId = this.$route.params.id
      const params = {
        ...pagination,
        willJoin: this.willAssist === true ? 1 : undefined
      }

      const res = await LessonRepository.lessonAttendees(lessonId, params)

      this.SET_TOTAL(res.total)
      this.SET_WILL_JOIN(res.will_join_count)

      return res
    },
    reset() {
      this.resetTableOptions()
      // this.$refs.table.reload()
    },
    searchFieldExecuted($event) {
      this.SET_TABLE_OPTIONS({ content: $event, offset: 0 })
      this.tableReload()
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    resetTableOptions() {
      this.$store.dispatch('lessonAttendeesStore/resetTableOptions')
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
</style>
