<template>
  <v-card-text>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="isOpen"
          max-width="400px"
          @close="onClose"
        >
          <validation-observer ref="FormcreateWorkspace">
            <v-card class="d-flex flex-column" >
              <v-container class="pa-3">
                <v-card-title class="d-flex justify-space-between pt-0 px-0">
                  <span class="text-h6 font-weight-bold">Create Workspace</span>
                  <v-icon class=" d-md-block" @click="onClose">
                    mdi-close
                  </v-icon>
                </v-card-title>
                <NameFieldInput
                  v-model="name"
                  rules="required|min:3|max:25|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
                />
                <v-card-actions class="d-flex justify-space-between pa-0">
                  <v-btn
                    color="blue-darken-1"
                    class="button flex-grow-1"
                    variant="text"
                    large
                    outlined
                    @click="onClose"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    dark
                    color="blue darken-1"
                    class="button flex-grow-1"
                    large
                    :loading="loading"
                    @click="createWorkspace"
                  >
                    {{ editItem ? 'Edit' : 'Create' }}
                  </v-btn>
                </v-card-actions>
              </v-container>
            </v-card>
          </validation-observer>
        </v-dialog>
      </v-row>
    </template>
    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="workspaceStore"
      :load="loadGroups"
    >
      <template v-slot:top>
        <!-- ------------ TOP ------------ -->

        <ResourceHeaderCrudTitle
          text-header="Gestión de espacio de trabajo"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />

        <!-- ------------ ACTIONS ------------ -->
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-title-toolbar-datatable title-text="Workspace" />

          <v-spacer />

          <ResourceButtonAdd text-button="Create Workspace" @click="onCreate" />
          <resource-button
            icon-button="mdi-autorenew"
            @click="resetTableOptions"
          />
        </v-toolbar>

        <!-- ------------ SEARCH ------------ -->
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

      <!-- ------------ SLOTS ------------ -->
      <template v-slot:[`item.name`]="{ item }">
        <div class="d-flex align-center">
          <span
            :style="{ backgroundColor: item.color }"
            class="circle mr-1"
          ></span>
          {{ item.name }}
        </div>
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-between">
          <ResourceButtonAdd text-button="Add Materials" @click="onCreate" />

          <resource-button-edit
            :config-route="{}"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="updateItem(item)"
          />
          <resource-button-delete
            text-button="Eliminar"
            @actionConfirmShowDialogDelete="deleteGroupConfirm(item)"
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
      NameFieldInput: () =>
      import(
        /* webpackChunkName: "NameFieldInput" */ './NameFieldInput.vue'
      ),
    ServerDataTable
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
      isOpen: false,
      name: ''
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
    ...mapMutations('workspaceStore', ['SET_EDIT_ITEM', 'SET_TABLE_OPTIONS']),
    parseDate(date) {
      return moment(date).format('YYYY-MM-DD hh:mm')
    },
    onClose() {
      this.isOpen = false
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormcreateWorkspace']['setErrors'](errorResponse)
    },
    async loadGroups(pagination) {
      const params = {
        ...pagination
      }

      const res = await WorkspaceRepository.list(params)

      return res
    },
    onCreate() {
      this.name = ''
      this.isOpen = true
    },
    updateItem(item) {
      this.SET_EDIT_ITEM(item)
      this.name = item.name
      this.isOpen = true
    },
    async deleteGroupConfirm(item) {
      if (!item) {
        return
      }
      const result = await this.$swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title: 'ELIMINAR Workspace',
        html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas eliminar este Workspace? Todos los alumnos seran dados de baja y perderas el histórico del Workspace',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (!result.isConfirmed) {
        return
      }

      const res = await WorkspaceRepository.delete(item.id)

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

    async createWorkspace() {
      const status = await this.$refs['FormcreateWorkspace'].validate()

      if (!status) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, complete correctamente los campos del formulario.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })

        return
      }
      this.loading = true

      const workspace = this.editItem
        ? await WorkspaceRepository.update(this.editItem.id, {
            name: this.name
          })
        : await WorkspaceRepository.create({
            name: this.name
          })

      this.loading = false
      if (!workspace) {
        return
      }

      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: this.editItem ? 'Workspace Actualizado!' : 'Workspace Creado!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })
      this.isOpen = false
      this.name = ''
      this.$refs.table.reload()
      this.SET_EDIT_ITEM(false)
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
