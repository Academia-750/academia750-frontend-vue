<template>
  <v-card-text>
    <!-- ------------ ADD STUDENT TO LESSON ------------ -->
    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="lessonAttendeesStore"
      :load="loadLessonStudents"
    >
      <template v-slot:top>
        <!-- ------------ ACTIONS ------------ -->
        <Toolbar title="Alumnos" icon="mdi-account-multiple">
          <template slot="actions">
            <span class="font-weight-bold text-h6">
              Asistentes: {{ willJoin }} / {{ total }}
            </span>
          </template>
        </Toolbar>
        <resource-text-field-search
          :search-word="store.tableOptions.content"
          label-text-field="Buscar por nombre o DNI del estudiante"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
        <div class="d-flex align-center mx-3 mb-2 type-section">
          <span class="font-weight-bold text-h6 mr-1">Solo asistentes</span>
          <v-checkbox
            :value="willAssist"
            class="mt-3"
            @click="filterByWillAssist"
          ></v-checkbox>
        </div>
      </template>

      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>
      <!-- <template v-slot:abel> ABEL </template> -->
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
        </div> </template
      >'
    </ServerDataTable>
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapMutations } from 'vuex'
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
      )
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
      total: 0,
      willAssist: undefined,
      searchWordText: '',
      loading: false,
      willJoin: 0,
      groupName: ''
    }
  },
  computed: {
    headers() {
      return headers
    },
    store() {
      return this.$store.state.lessonStudentStore
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

  mounted() {},

  methods: {
    ...mapActions('lessonAttendeesStore', ['resetTableOptions']),
    ...mapMutations('lessonAttendeesStore', ['SET_TABLE_OPTIONS']),
    addStudents() {
      this.$refs.addStudents.open()
    },
    async filterByWillAssist() {
      this.willAssist = !this.willAssist
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

      this.total = res.total
      this.willJoin = res.will_join_count

      return res
    },
    searchFieldExecuted($event) {
      this.SET_TABLE_OPTIONS({ content: $event, offset: 0 })
      this.tableReload()
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
</style>
