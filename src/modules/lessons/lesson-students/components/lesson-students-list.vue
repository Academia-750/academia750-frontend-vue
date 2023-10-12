<template>
  <v-card-text>
    <!-- ------------ ADD STUDENT TO LESSON ------------ -->
    <AddStudentsModal
      ref="addStudents"
      :loading="loading"
      @created="tableReload"
    />
    <DeleteGroupModal ref="deleteGroupModal" @deleted="tableReload" />

    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="lessonStudentStore"
      :load="loadLessonStudents"
    >
      <template v-slot:top>
        <!-- ------------ ACTIONS ------------ -->
        <Toolbar title="Alumnos" icon="mdi-account-multiple">
          <template slot="actions">
            <span class="font-weight-bold text-h6 mr-1">
              Asistentes: {{ willJoin }} / {{ total }}
            </span>
            <ResourceButtonAdd text-button="Agregar" @click="addStudents()" />
            <resource-button
              text-button="Gestionar un Grupos"
              color="secondary"
              icon-button="mdi-account-multiple"
              @click="deleteGroupFromLesson()"
            />
            <resource-button
              icon-button="mdi-autorenew"
              @click="resetTableOptions"
            />
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
              :value="willAssist"
              class="mt-3"
              @click="filterByWillAssist"
            ></v-checkbox>
          </div>
        </div>
      </template>

      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>
      <!-- <template v-slot:abel> ABEL </template> -->
      <!-- ------------ SLOTS ------------ -->
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-delete
            text-button="Eliminar"
            @actionConfirmShowDialogDelete="deleteStudentFromLesson(item)"
          />
        </div>
      </template>
      <template
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
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapMutations } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import LessonRepository from '@/services/LessonRepository'
import headers from './students-table-columns'

export default {
  name: 'DatatableStudents',
  components: {
    ResourceButtonDelete: () =>
      import(
        /* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      ),
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    AddStudentsModal: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ './add-student-to-lesson'
      ),
    DeleteGroupModal: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ './delete-group-from-lesson'
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
      groupName: '',
      willJoin: 0,
      total: 0,
      willAssist: undefined
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
    ...mapActions('lessonStudentStore', ['resetTableOptions']),
    ...mapMutations('lessonStudentStore', ['SET_TABLE_OPTIONS']),
    addStudents() {
      this.$refs.addStudents.open()
    },
    async filterByWillAssist() {
      this.willAssist = !this.willAssist
      this.loadLessonStudents()
      this.tableReload()
    },
    deleteGroupFromLesson() {
      this.$refs.deleteGroupModal.open()
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

      const res = await LessonRepository.lessonStudentList(lessonId, params)

      this.total = res.total
      this.willJoin = res.will_join_count

      return res
    },
    async deleteStudentFromLesson(student) {
      const lessonId = this.$route.params.id
      const student_id = student.uuid

      if (!student) {
        return
      }
      const result = await this.$swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title: 'Eliminar Alumno',
        html: '¿Seguro que deseas eliminar este alumno? El alumno no tendra acceso a la clase y sus materiales',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (!result.isConfirmed) {
        return
      }
      const res = await LessonRepository.deleteStudentFromLesson(lessonId, {
        student_id
      })

      if (res) {
        this.tableReload()
      }
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
