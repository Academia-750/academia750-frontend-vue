<template>
  <v-card-text>
    <AddMaterialModal
      ref="addWorkspaceMaterial"
      :workspace="workspace"
      :type="type"
      :name="name"
      :tags="tags"
      :editItem="editItem"
      :editItemId="editItemId"
      @create="create"
    />
    <AddRecordingModal
      ref="addRecording"
      :workspace="workspace"
      :name="name"
      @create="create"
    />
    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="workspaceStore"
      :load="loadMaterials"
    >
      <template v-slot:top>
        <!-- ------------ TOP ------------ -->

        <ResourceHeaderCrudTitle
          text-header="Gestión de espacio de trabajo"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />

        <!-- ------------ ACTIONS ------------ -->
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-button-go-back-router />
          <resource-title-toolbar-datatable title-text="Materials" />

          <v-spacer />

          <resource-button
            icon-button="mdi-autorenew"
            @click="resetTableOptions"
          />
        </v-toolbar>

        <!-- ------------ SEARCH ------------ -->
        <resource-text-field-search
          :search-word="store.tableOptions.content"
          label-text-field="Buscar por nombre"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
        <!-- ------------ TYPE SECTION ------------ -->
        <div class="d-flex align-center mx-3 type-section">
          <v-select
            :items="types"
            item-text="label"
            item-value="key"
            persistent-hint
            label="Tipos"
            :value="type"
            dense
            outlined
            class="mr-2"
            clearable
            @change="onChangeType"
          ></v-select>
          <v-select
            v-model="workspace"
            :items="workspaces"
            item-text="label"
            item-value="key"
            persistent-hint
            label="Workspace"
            dense
            outlined
            class="mr-2"
            clearable
            @change="onChangeWorkspace"
          ></v-select>
          <ResourceTagAutoComplete
            :dense="true"
            @change="onChangeTags"
            @remove="onRemoveTags"
          />
        </div>
        <ResourceButtonAdd text-button="Add Material" class="mb-2 mx-3" @click="onAddMaterial" />

      </template>

      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>
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

      <!-- ------------ SLOTS ------------ -->
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-between align-center">
          <div>
            <v-icon color="primary" :disabled="item.url ? false:true">mdi-cloud-download</v-icon>
          </div>
          <div>
          </div>
          <resource-button-edit
            :config-route="{}"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="updateWorkspaceMaterial(item)"
          />
          <resource-button-delete
            text-button="Eliminar"
            @actionConfirmShowDialogDelete="deleteWorkspaceMaterialConfirm(item)"
          />
        </div>
      </template>
    </ServerDataTable>
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mapMutations, mapActions, mapState } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headers from './workspace-materials-list-columns'
import moment from 'moment'
import WorkspaceRepository from '@/services/WorkspaceRepository'
import WorkspaceMaterialRepository from '@/services/WorkspaceMaterialRepository'
import ServerDataTable from '@/modules/resources/components/resources/server-data-table.vue'

export default {
  name: 'WorkspaceList',
  components: {
    ResourceButtonEdit: () =>
      import(
        /* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'
      ),
    ResourceButtonDelete: () =>
      import(
        /* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      ),
    ResourceTextFieldSearch: () =>
      import(
        /* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'
      ),
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
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    AddMaterialModal: () =>
      import(
        /* webpackChunkName: "AddMaterialModal" */ '@/modules/resources/components/resources/add-material-modal'
      ),
    AddRecordingModal: () =>
      import(
        /* webpackChunkName: "AddRecordingModal" */ '@/modules/resources/components/resources/add-recording-modal'
      ),
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTagAutoComplete: () => import(/* webpackChunkName: "ResourceTagAutoComplete" */ '@/modules/resources/components/form/tags-auto-complete'),
    
    ServerDataTable
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
      name: '',
      types: [
        {
          key: 'material',
          label: 'Materiales'
        },
        {
          key: 'recording',
          label: 'Grabaciones'
        }
      ],
      workspaces: {},
      tagsList: [],
      tags: [],
      type: '',
      workspace: '',
      editItem: false,
      editItemId: null
    }
  },
  computed: {
    headers() {
      return headers
    },
    store() {
      return this.$store.state.workspaceStore
    }
  },
  created() {
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 600)
  },
  mounted() {
    this.$refs.table.reload()
    this.loadWorkspaces()
    this.loadMaterials()
  },

  methods: {
    ...mapActions('workspaceMaterialStore', ['deleteGroup', 'resetTableOptions']),
    ...mapMutations('workspaceMaterialStore', ['SET_EDIT_ITEM', 'SET_WORKSPACE', 'SET_TYPE', 'SET_TAGS', 'SET_TABLE_OPTIONS']),
    parseDate(date) {
      return moment(date).format('YYYY-MM-DD hh:mm')
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormcreateWorkspace']['setErrors'](errorResponse)
    },
    onChangeType(value) {
      this.SET_TYPE(value)
      this.$refs.table.reload()
      this.SET_TABLE_OPTIONS({ offset: 0 })
    },
    onChangeWorkspace(value) {
      this.SET_WORKSPACE(value)
      this.$refs.table.reload()
      this.SET_TABLE_OPTIONS({ offset: 0 })
    },
    onChangeTags() {
      this.$refs.table.reload()
    },
    onRemoveTags (item) {
      this.$refs.table.reload()
    },
    async loadMaterials(pagination) {
      const params = {
        ...pagination,
        type: this.type,
        workspace: this.workspace,
        tags: this.tags
      }
      
      const res = await WorkspaceMaterialRepository.list(params)

      this.materials = res.results.map((item) => ({
        key: item.id,
        label: item.name
      }))

      return res
    },
    async loadWorkspaces(pagination) {
      const params = {
        ...pagination
      }
      
      const res = await WorkspaceRepository.list(params)

      this.workspaces = res.results.map((item) => ({
        key: item.id,
        label: item.name
      }))

      return res
    },
    async create() {
      this.SET_EDIT_ITEM(false)
      this.$refs.table.reload()
    },
    async deleteWorkspaceMaterialConfirm(material) {
      if (!material) {
        return
      }
      const result = await this.$swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title: 'ELIMINAR Material',
        html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas eliminar este Material? Todos los materiales seran borrados del servidor y los alumnos no podrán acceder a ellos',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (!result.isConfirmed) {
        return
      }

      const res = await WorkspaceMaterialRepository.delete(material.id)

      if (!res) {
        return
      }
      this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'El Workspace ha sido eliminado con éxito.',
        timer: 3000
      })

      this.$refs.table.reload()
    },
    onAddMaterial() {
      this.SET_EDIT_ITEM(false)
      this.name = ''
      this.$refs.addWorkspaceMaterial.onResetErrors()
      this.$refs.addWorkspaceMaterial.open()
    },
    onAddRecording(item) {
      this.name = ''
      this.$refs.addRecording.open()
    },
    updateWorkspaceMaterial(material) {
      console.log(material)
      this.name = material.name
      this.type = material.type
      this.tags = material.tags.split(',')
      this.workspace = material.workspace_id
      this.editItemId = material.id
      this.editItem = true
      this.SET_EDIT_ITEM(material)
      this.$refs.addWorkspaceMaterial.onResetErrors()
      this.$refs.addWorkspaceMaterial.open()
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

.type-section{
  width: 80%;
}
</style>
