<template>
  <v-card-text>
    <AddWorkspaceModal
      ref="addWorkSpace"
      :workspace="workspace"
      :name="name"
      @create="createWorkspace"
    />
    <AddMaterialModal ref="addMaterial" @create="onAddMaterial" />

    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="workspaceStore"
      :load="loadWorkspaces"
    >
      <template v-slot:top>
        <!-- ------------ TOP ------------ -->

        <ResourceHeaderCrudTitle
          text-header="Gestión de espacio de trabajo"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />

        <!-- ------------ ACTIONS ------------ -->
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-title-toolbar-datatable title-text="Categorias" />

          <v-spacer />
          <ResourceButtonMaterials
            text-button="Gestionar Temas"
            icon-button="mdi-tag"
            :config-route="{ name: 'manage-tags' }"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="goToTags()"
          />
          <ResourceButtonMaterials
            text-button="Ver todos"
            :config-route="{ name: 'manage-materials' }"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="goToMaterials()"
          />
          <ResourceButtonAdd
            text-button="Crear Categoría"
            @click="openAddCategory"
          />
          <ResourceButtonAdd
            text-button="Crear Material"
            @click="openAddMaterial"
          />
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
      </template>

      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>

      <!-- ------------ SLOTS ------------ -->
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-center">
          <ResourceButtonMaterials
            text-button="Materiales"
            :config-route="{ name: 'manage-materials' }"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="setWorkspace(item)"
          />
          <resource-button-edit
            :config-route="{}"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="updateWorkspace(item)"
          />
          <resource-button-delete
            text-button="Eliminar"
            @actionConfirmShowDialogDelete="deleteWorkspaceConfirm(item)"
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
import headers from './workspace-list-columns'
import moment from 'moment'
import WorkspaceRepository from '@/services/WorkspaceRepository'
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
    AddWorkspaceModal: () =>
      import(
        /* webpackChunkName: "AddWorkspaceModal" */ '@/modules/resources/components/resources/add-workspace-modal'
      ),
    AddMaterialModal: () =>
      import(
        /* webpackChunkName: "AddMaterialModal" */ '@/modules/resources/components/resources/add-material-modal'
      ),
    ResourceButtonMaterials: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonMaterials'
      ),

    ServerDataTable
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
      name: '',
      workspace: null
    }
  },
  computed: {
    ...mapState('workspaceStore', ['editItem']),
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
  },

  methods: {
    ...mapActions('workspaceStore', ['deleteGroup', 'resetTableOptions']),
    ...mapMutations('workspaceStore', ['SET_TABLE_OPTIONS']),
    ...mapMutations('workspaceMaterialStore', ['SET_WORKSPACE']),

    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormcreateWorkspace']['setErrors'](errorResponse)
    },
    async loadWorkspaces(pagination) {
      const params = {
        ...pagination
      }

      const res = await WorkspaceRepository.list(params)

      return res
    },
    openAddCategory() {
      this.$refs.addWorkSpace.open()
    },
    openAddMaterial() {
      this.$refs.addMaterial.open()
    },
    updateWorkspace(workspace) {
      this.$refs.addWorkSpace.open(workspace)
    },
    setWorkspace(workspace) {
      this.$store.dispatch('workspaceMaterialStore/resetTableOptions')
      this.SET_WORKSPACE(workspace.id)

      this.$router.push({ name: 'manage-materials' })
    },
    goToMaterials() {
      this.$store.dispatch('workspaceMaterialStore/resetTableOptions')
      this.$router.push({ name: 'manage-materials' })
    },
    goToTags() {
      this.$router.push({ name: 'manage-tags' })
    },
    async deleteWorkspaceConfirm(workspace) {
      if (!workspace) {
        return
      }
      const result = await this.$swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title: 'Eliminar Workspace',
        html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas eliminar este Workspace? Todos los materiales seran borrados del servidor y los alumnos no podrán acceder a ellos',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (!result.isConfirmed) {
        return
      }

      const res = await WorkspaceRepository.delete(workspace.id)

      if (!res) {
        return
      }
      this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'La categoría ha sido eliminada con éxito.',
        timer: 3000
      })

      this.$refs.table.reload()
    },

    async createWorkspace() {
      this.resetTableOptions()
      this.$refs.table.reload()
    },
    async onAddMaterial(material) {
      this.SET_WORKSPACE(material.workspace_id)
      this.$router.push({ name: 'manage-materials' })
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
