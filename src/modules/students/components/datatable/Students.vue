<template>
  <v-card-text>
    <SearchRoleModal
      ref="searchStudent"
      :loading="isAddingRole"
      @change="onSelect"
      @ok="assignRole"
    />
    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="lessonStudentStore"
      :load="loadStudents"
    >
      <template v-slot:top>
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->
        <resource-header-crud-title
          :text-header="getTitleByStateAccount"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar
          flat
          class="indigo lighten-5 my-2"
          outlined
        >
          <!-- <resource-button-go-back-router/> -->
          <resource-title-toolbar-datatable :title-text="getTitleByStateAccount" />
        </v-toolbar>
        <resource-text-field-search
          ref="ResourceTextFieldSearch"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable/>
      </template>
      <template v-slot:[`item.dni`]="{ item }">
        <div class="d-flex justify-space-around">
          {{ item.attributes.dni }}
        </div>
      </template>
      <template v-slot:[`item.first-name`]="{ item }">
        {{ item.attributes.first_name }}
      </template>
      <template v-slot:[`item.last-name`]="{ item }">
        {{ item.attributes.last_name }}
      </template>
      <template v-slot:[`item.phone`]="{ item }">
        {{ item.attributes.phone }}
      </template>
      <template v-slot:[`item.email`]="{ item }">
        {{ item.attributes.email }}
      </template>
      <template v-slot:[`item.groups`]="{ item }">
        <div v-if="item.relationships.groups">
          <v-chip
            v-for="(group, index) in item.relationships.groups"
            :key="index"
            class="ma-1"
            label
            small
          >
            {{ group.name }}
          </v-chip>
        </div>
      </template>
      <template v-slot:[`item.profile`]="{ item }">
        <div v-if="item.relationships" @click="openRoleModal(item)">
          <v-chip
            color="primary"
            label
          >
            John Leider
            <v-icon right>
              mdi-pencil
            </v-icon>
          </v-chip>
        </div>
      </template>
      <template v-slot:[`item.created-at`]="{ item }">
        {{ item.attributes.created_at }}
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-edit
            :config-route="{}"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="setDataForUpdateUser(item)"
          />
          <resource-button-delete
            text-button="Dar de baja"
            @actionConfirmShowDialogDelete="deleteStudentConfirm(item)"
          />
        </div>
      </template>
    </ServerDataTable>
    <resource-dialog-confirm-delete
      ref="dialogConfirmDeleteAction"
      title="¿Estás seguro de eliminar el alumno?"
      @actionDelete="deleteStudentAction"
    >
      <template #identifier-record>
        <div v-if="currentItemsSelectedForDelete" class="d-flex justify-center align-center">
          <span class="mr-1 font-italic subtitle-1">Alumno:</span> <span class="font-weight-bold subtitle-1">{{ currentItemsSelectedForDelete['first-name'] }} {{ currentItemsSelectedForDelete['last-name'] }}</span>
        </div>
      </template>
    </resource-dialog-confirm-delete>
  </v-card-text>
</template>

<script>
  import headers from './data/students-table-columns'
  import { mapMutations, mapActions, mapState } from 'vuex'
  import StudentRespository from '@/services/StudentRepository'
  import ProfileRepository from '@/services/ProfileRepository'

    export default {
      name: 'DatatableStudents',
      components: {
        ServerDataTable: () =>
          import(
            /* webpackChunkName: "ServerDataTable" */ '@/modules/resources/components/resources/server-data-table'
        ),
        SearchRoleModal: () =>
          import(
            /* webpackChunkName: "SearchRoleModal" */ '@/modules/resources/components/resources/search-role-modal'
        ),
        ResourceButtonEdit: () => import(/* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'),
        ResourceButtonDelete: () => import(/* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'),
        ResourceTextFieldSearch: () => import(/* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'),
        ResourceBannerNoDataDatatable: () => import(/* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'),
        ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
        ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
        ResourceDialogConfirmDelete: () => import(/* webpackChunkName: "ResourceDialogConfirmDelete" */ '@/modules/resources/components/resources/ResourceDialogConfirmDelete')
      },
      props: {
        stateAccount: {
          type: String,
          default: 'enable'
        }
      },
      data () {
        return {
          //namesRelationshipsIncludeRequest: 'topics'
          currentItemsSelectedForDelete: null,
          isAddingRole: false,
          role_id: '',
          user_id: ''
        }
      },
      computed: {
        ...mapState('studentsService', ['itemsDatatable', 'stateLoadingItems', 'informationMeta', 'usersSelected', 'matchesResetOptionsDatatable']),
        getTitleByStateAccount () {
          return `Gestión de Alumnos ${this.stateAccount === 'enable' ? 'activos' : 'inactivos'}`
        },
        getSelectedItems: {
          get () {
            return this.usersSelected
          },
          set (value)  {
            this.SET_USERS_SELECTED_DATATABLE(value)
          }
        },
        headers() {
      return headers
      },
      store() {
        return this.$store.state.workspaceStore
      }
      },
      methods: {
        ...mapActions('studentsService', ['getStudents', 'deleteStudent']),
        ...mapMutations('studentsService', ['SET_CURRENT_USER_FOR_UPDATE', 'SET_USERS_SELECTED_DATATABLE', 'SET_OPTIONS_DATATABLE_USERS', 'SET_MATCHES_RESET_OPTIONS_DATATABLE']),
        loadDatatatable() {
          this.getStudents({
            params: this.getParamsUrlApi()
          })
        },
        openRoleModal(item) {
          this.$refs.searchStudent.open()
          this.user_id = item.id
        },
        tableReload() {
          this.$refs.table.reload()
        },
        onSelect(value) {
          this.role_id = value.id
        },
        async assignRole() {
          this.isAddingRole = true

          await ProfileRepository.assignRole(this.user_id,this.role_id)
          this.isAddingUser = false
          this.$refs.table.reload()
        },
        async loadStudents(pagination) {
          const params = {
            ...pagination,
            stateAccount: this.stateAccount === 'enable' ? 'activos' : 'inactivos'
          }

          const results = await StudentRespository.getAll(params)

          const res = {
            results,
            total: results.length
          }

          return res
        },
        setDataForUpdateUser (item) {
          this.SET_CURRENT_USER_FOR_UPDATE({
            id: item.id,
            dni: item.dni,
            first_name: item['first-name'],
            last_name: item['last-name'],
            phone: item.phone,
            email: item.email
          })

          this.$emit('emitScrollToCreateOrEditStudentForm')
        },
        fetchInitialData () {
          this.getStudents({
            params: this.getParamsUrlApi()
          })
        },
        getParamsUrlApi () {
          const urlParams = this.buildQueryParamsRequest()

          urlParams['filter[role]'] = 'student'
          urlParams['filter[state-account]'] = this.stateAccount

          return urlParams
        },
        searchFieldExecuted ($event) {
          this.searchWord = $event
          this.getStudents({
            params: this.getParamsUrlApi()
          })
        },
        searchFieldWithDebounce(value) {
          this.searchFieldExecuted(value)
        },
        deleteStudentConfirm (item) {
          this.currentItemsSelectedForDelete = item
          //this.$refs['dialogConfirmDeleteAction'].showDialog = true
          this.$swal.fire({
            toast: true,
            width: '400px',
            icon: 'question',
            title: 'DAR DE BAJA',
            html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas eliminar este alumno y los datos relacionados a este?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.deleteStudentAction()

            }
          })
        },
        async deleteStudentAction () {
          if (this.currentItemsSelectedForDelete === null || this.currentItemsSelectedForDelete === undefined) {
            return
          }

          try {
            await this.deleteStudent({
              id: this.currentItemsSelectedForDelete.id,
              config: {}
            })

            this.$swal.fire({
              icon: 'success',
              toast: true,
              title: 'El alumno ha sido eliminado con éxito.',
              timer: 3000
            })
            this.tableReload()

            this.$refs['ResourceTextFieldSearch'].searchWordText = ''
            this.searchWord = ''

            this.loadStudentsFromCurrentTab()
          } catch (error) {
            //console.log(error)
          }
        }
      }
    }
    
</script>
<style src="./StudentsComponent.css" scoped></style>
