<template>
  <v-card-text>
    <!-- ------------ ADD STUDENT TO LESSON ------------ -->
    <AddStudentsModal
      ref="addStudents"
      :loading="loading"
      @created="tableReload"
    />
    <DeleteGroupModal
      ref="deleteGroupModal"
      @deleted="tableReload"
    />

    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="lessonStudentStore"
      :load="loadLessonStudents"
    >
      <template v-slot:top>
        <!-- ------------ ACTIONS ------------ -->
        <Toolbar title="Clase alumnos" icon="mdi-account-multiple">
          <template slot="actions">
            <resource-button-delete
              text-button="eliminar un grupo"
              @actionConfirmShowDialogDelete="deleteGroupFromLesson()"
            />
            <ResourceButtonAdd text-button="Aggregar Alumno" @click="addStudents()" />
            <resource-button
              icon-button="mdi-autorenew"
              @click="resetTableOptions"
            />
          </template>
        </Toolbar>
        <resource-text-field-search
          :search-word="store.tableOptions.content"
          label-text-field="Buscar por nombre o código"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
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
            text-button="Baja"
            @actionConfirmShowDialogDelete="deleteStudentFromLesson(item)"
          />
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

  mounted() {
  },

  methods: {
    ...mapActions('lessonStudentStore', ['resetTableOptions']),
    ...mapMutations('lessonStudentStore', ['SET_TABLE_OPTIONS']),
    addStudents() {
      this.$refs.addStudents.open()
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
        ...pagination
      }

      const res = await LessonRepository.lessonStudentList(lessonId, params)

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
        title: 'ELIMINAR Alumno',
        html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas eliminar este grupo? Todos los alumnos seran dados de baja y perderas el histórico del grupo',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (!result.isConfirmed) {
        return
      }
      const res = await LessonRepository.deleteStudentFromLesson(lessonId, { student_id })

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
