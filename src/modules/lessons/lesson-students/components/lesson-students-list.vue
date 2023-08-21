<template>
  <v-card-text>
    <!-- ------------ ADD STUDENT TO GROUP ------------ -->
    <StudentAutoComplete
      ref="searchStudent"
      :loading="loading"
      @created="isCreated"
    />

    <ServerDataTable
      ref="table"
      :headers="headers"
      :load="loadLessonStudents"
      store-name="groupStudentStore"
    >
      <template v-slot:top>
        <!-- ------------ ACTIONS ------------ -->
        <Toolbar title="Clase alumnos" icon="mdi-account-multiple">
          <template slot="actions">
            <ResourceButtonAdd text-button="Aggregar Alumno" @click="addStudents()" />
          </template>
        </Toolbar>
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
import { mapState } from 'vuex'
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
    StudentAutoComplete: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ '@/modules/resources/components/resources/add-student-to-lesson'
      ),
    ServerDataTable: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ '@/modules/resources/components/resources/server-data-table'
      ),
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
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
    }
  },
  watch: {
    searchWord(value) {
      this.searchWordText = value
    }
  },

  mounted() {
  },

  methods: {
    addStudents() {
      this.$refs.searchStudent.open()
    },
    isCreated() {
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
        this.$refs.table.reload()
      }
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
