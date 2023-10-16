<template>
  <v-card-text>
    <AddMaterialModal
      ref="addWorkspaceMaterial"
      :default-workspace="workspace"
      :workspaces="workspaces"
      @create="create"
    />
    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="materialsForLessonStore"
      :load="loadMaterials"
    >
      <template v-slot:top>
        <Toolbar
          :title="`Materiales de la clase ${lesson.name}`"
          icon="mdi-folder-open"
        >
          <template slot="actions">
            <ResourceButtonAdd
              text-button="Buscar Material"
              icon-button="mdi-folder-open"
              @click="
                $router.push({
                  name: 'add-materials',
                  params: { id: $route.params.id }
                })
              "
            />
            <ResourceButtonAdd
              text-button="Nuevo Material"
              @click="onAddMaterial()"
            />
            <resource-button icon-button="mdi-autorenew" @click="reset()" />
          </template>
        </Toolbar>
        <SearchBar
          :search-word="content"
          :type="type"
          :tags="tags"
          :hide-workspace="true"
          store-name="materialsForLessonStore"
          @onChangeType="onChangeType"
          @onChangeTags="onChangeTags"
          @searchFieldExecuted="searchFieldExecuted"
          @searchFieldWithDebounce="searchFieldWithDebounce"
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
          <resource-button-delete
            text-button="Eliminar"
            @actionConfirmShowDialogDelete="deleteMaterialsFromLesson(item)"
          />
        </div>
      </template>
      <template v-slot:[`item.type`]="{ item }">
        {{ MATERIAL_TYPES_LABELS[item.type] || 'aa' }}
      </template>
    </ServerDataTable>
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mapMutations, mapActions, mapState } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headers from './materials-lesson-list-columns'
import moment from 'moment'
import LessonRepository from '@/services/LessonRepository'
import ServerDataTable from '@/modules/resources/components/resources/server-data-table.vue'
import axios from 'axios'
import { MATERIAL_TYPES_LABELS } from '@/helpers/constants'
export default {
  name: 'LessonMaterialsList',
  components: {
    ResourceButtonDelete: () =>
      import(
        /* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'
      ),
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    SearchBar: () =>
      import(
        /* webpackChunkName: "SearchBar" */ '@/modules/resources/components/resources/search-materials-bar.vue'
      ),
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      ),
    AddMaterialModal: () =>
      import(
        /* webpackChunkName: "AddMaterialModal" */ '@/modules/resources/components/resources/add-material-modal'
      ),

    ServerDataTable
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
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
      editItem: false,
      editItemId: null
    }
  },
  computed: {
    ...mapState('materialsForLessonStore', ['workspace', 'type', 'tags']),
    ...mapState('lessonsStore', ['lesson']),
    headers() {
      return headers
    },
    content() {
      return this.$store.state.materialsForLessonStore.tableOptions.content
    }
  },
  created() {
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 600)
  },
  mounted() {
    this.$refs.table.reload()
    if (!this.lesson) {
      this.$router.push({
        name: 'manage-lessons'
      })
    }
  },

  methods: {
    ...mapActions('materialsForLessonStore', [
      'deleteGroup',
      'resetTableOptions'
    ]),
    ...mapMutations('materialsForLessonStore', [
      'SET_WORKSPACE',
      'SET_TYPE',
      'SET_TAGS',
      'SET_TABLE_OPTIONS'
    ]),

    async create(material) {
      if (!material) {
        return
      }
      const material_id = material.id

      const res = await LessonRepository.addMaterialsToLesson(
        this.$route.params.id,
        { material_id }
      )

      if (!res) {
        return
      }
      this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'Acción completada.',
        timer: 3000
      })

      this.$refs.table.reload()
      this.$refs.table.reload()
    },
    onChangeType(value) {
      this.SET_TYPE(value)
      this.SET_TABLE_OPTIONS({ offset: 0 })
      this.$refs.table.reload()
    },
    onChangeTags(value) {
      this.SET_TAGS(value)
      this.$refs.table.reload()
    },
    onAddMaterial() {
      this.$refs.addWorkspaceMaterial.open()
    },
    async loadMaterials(pagination) {
      const params = {
        ...pagination,
        tags: this.tags,
        type: this.type
      }

      const res = await LessonRepository.listOfMaterials(
        this.$route.params.id,
        params
      )

      return res
    },
    async deleteMaterialsFromLesson(material) {
      const { material_id } = material

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

      const res = await LessonRepository.deleteMaterialsFromLesson(
        this.$route.params.id,
        { material_id }
      )

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
    download(material) {
      const [_name, type] = this.fileNameAndType(material.url)

      axios
        .get(material.url, { responseType: 'blob' })
        .then((response) => {
          const blob = new Blob([response.data], {})
          const link = document.createElement('a')

          link.href = URL.createObjectURL(blob)
          link.download = `${material.name}.${type}`
          link.click()
          URL.revokeObjectURL(link.href)
        })
        .catch(console.error)
    },
    reset() {
      this.resetTableOptions()
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
