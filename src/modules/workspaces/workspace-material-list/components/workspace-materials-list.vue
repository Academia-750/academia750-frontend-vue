<template>
  <div>
    <AddMaterialModal
      ref="addWorkspaceMaterial"
      :default-workspace="workspace"
      :workspaces="workspaces"
      @create="create"
    />
    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="workspaceMaterialStore"
      :load="loadMaterials"
    >
      <template v-slot:top>
        <!-- ------------ TOP ------------ -->
        <Toolbar title="Materiales">
          <template slot="actions">
            <resource-button icon-button="mdi-autorenew" @click="reset()" />
          </template>
        </Toolbar>
        <!-- ------------ TYPE SECTION ------------ -->
        <div class="mt-4">
          <SearchBar
            :search-word="content"
            :workspace="workspace"
            :type="type"
            :tags="tags"
            store-name="workspaceMaterialStore"
            :display-workspace="true"
            @onChangeType="onChangeType"
            @onChangeWorkspace="onChangeWorkspace"
            @onChangeTags="onChangeTags"
            @searchFieldExecuted="searchFieldExecuted"
            @searchFieldWithDebounce="searchFieldWithDebounce"
          />
        </div>

        <ResourceButtonAdd
          text-button="Nuevo Material"
          class="mb-2 mx-3"
          @click="onAddMaterial"
        />
      </template>

      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>

      <!-- ------------ SLOTS ------------ -->
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
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-between align-center">
          <div>
            <div v-if="item.type === 'material'" class="d-flex mr-1">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    :class="item.url ? 'cursor-pointer mr-2' : 'mr-2'"
                    color="default"
                    :disabled="item.url ? false : true"
                    v-on="on"
                    @click="download(item)"
                  >
                    mdi-cloud-download
                  </v-icon>
                </template>
                <span>Original</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    :class="item.url ? 'cursor-pointer' : ''"
                    color="primary"
                    :disabled="item.url ? false : true"
                    v-on="on"
                    @click="downloadWithWaterMark(item)"
                  >
                    mdi-cloud-download
                  </v-icon>
                </template>
                <span>Con marca de agua</span>
              </v-tooltip>
            </div>
            <v-icon
              v-else
              :class="item.url ? 'cursor-pointer' : ''"
              color="primary"
              :disabled="!item.url"
              @click="openVideo(item.url)"
            >
              mdi-camera
            </v-icon>
          </div>
          <resource-button-edit
            :config-route="{ name: 'edit-material', params: { id: item.id } }"
          />
          <resource-button-delete
            text-button="Eliminar"
            @actionConfirmShowDialogDelete="
              deleteWorkspaceMaterialConfirm(item)
            "
          />
        </div>
      </template>
      <template v-slot:[`item.type`]="{ item }">
        {{ MATERIAL_TYPES_LABELS[item.type] || '' }}
      </template>
    </ServerDataTable>
    <VimeoVideoPlayer ref="video" />
    <v-dialog v-model="loading" width="auto">
      <v-card class="d-flex flex-column justify-center align-center pa-8">
        <p class="pa-1">Preparando tu material...</p>
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapMutations, mapActions, mapState } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headers from './workspace-materials-list-columns'
import WorkspaceRepository from '@/services/WorkspaceRepository'
import WorkspaceMaterialRepository from '@/services/WorkspaceMaterialRepository'
import ServerDataTable from '@/modules/resources/components/resources/server-data-table.vue'
import { MATERIAL_TYPES_LABELS } from '@/helpers/constants'
import DownloadFile from '@/utils/DownloadMaterial'
import LessonRepository from '@/services/LessonRepository'

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
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    AddMaterialModal: () =>
      import(
        /* webpackChunkName: "AddMaterialModal" */ '@/modules/resources/components/resources/add-material-modal'
      ),
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
      ),
    SearchBar: () =>
      import(
        /* webpackChunkName: "SearchBar" */ '@/modules/resources/components/resources/search-materials-bar.vue'
      ),
    VimeoVideoPlayer: () =>
      import(
        /* webpackChunkName: "VimeoVideoPlayer" */ '@/modules/resources/components/resources/vimeo-video-player.vue'
      ),
    ServerDataTable
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
      show: true,
      MATERIAL_TYPES_LABELS,
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
      workspaces: [],
      loading: false,
      editItem: false,
      editItemId: null
    }
  },
  computed: {
    ...mapState('workspaceMaterialStore', ['workspace', 'type', 'tags']),

    headers() {
      return headers
    },
    content() {
      return this.$store.state.workspaceMaterialStore.tableOptions.content
    }
  },
  created() {
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 600)
  },
  mounted() {
    this.$refs.table.reload()
    this.loadWorkspaces()
  },

  methods: {
    ...mapActions('workspaceMaterialStore', [
      'deleteGroup',
      'resetTableOptions'
    ]),
    ...mapMutations('workspaceMaterialStore', [
      'SET_WORKSPACE',
      'SET_TYPE',
      'SET_TAGS',
      'SET_TABLE_OPTIONS'
    ]),

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
      this.SET_TABLE_OPTIONS({ offset: 0 })
      this.$refs.table.reload()
    },
    onChangeTags(value) {
      this.SET_TAGS(value)
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

      return res
    },
    async loadWorkspaces(pagination) {
      const params = {
        ...pagination
      }

      const res = await WorkspaceRepository.list(params)

      this.workspaces = res.results.map((item) => ({
        key: item.id.toString(),
        label: item.name
      }))
    },
    async create() {
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
        title:
          material.type === 'material'
            ? 'El material ha sido eliminado con éxito.'
            : 'La grabación ha sido eliminada con éxito',
        timer: 3000
      })

      this.$refs.table.reload()
    },
    onAddMaterial() {
      this.$router.push({
        name: 'create-materials'
      })
    },

    updateWorkspaceMaterial(material) {
      this.$refs.addWorkspaceMaterial.open(material)
    },
    searchFieldExecuted($event) {
      this.SET_TABLE_OPTIONS({ content: $event, offset: 0 })
      this.$refs.table.reload()
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    fileNameAndType(url) {
      // Extract the name using a regular expression
      const matches = url.match(/\/([^/]+)\.\w+$/)
      const fileName = matches && matches[1]

      return fileName.split('.')
    },

    async download(material) {
      const [_name, type] = this.fileNameAndType(material.url)

      DownloadFile(material.url, material.name, type)
    },
    async downloadWithWaterMark(material) {
      this.loading = true
      const url = await LessonRepository.downloadStudentMaterial(material.id)

      this.loading = false
      if (!url) {
        return
      }
      const type = url.slice(
        (Math.max(0, url.lastIndexOf('.')) || Infinity) + 1
      )

      DownloadFile(url, material.name, type)
    },
    reset() {
      this.resetTableOptions()
      this.$refs.table.reload()
    },
    openVideo(url) {
      this.$refs.video.open(url)
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

.type-section {
  width: 80%;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
