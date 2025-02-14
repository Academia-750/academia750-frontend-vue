<template>
  <div>
    <Vtoolbar :title="title" icon="mdi-book-open-variant" />
    <validation-observer ref="formCreateWorkspaceMaterial">
      <section class="px-2 py-2 d-flex flex-sm-column align-center">
        <v-row dense :style="{ width: '-webkit-fill-available' }">
          <v-col cols="12" md="6">
            <v-select
              v-model="type"
              :items="types"
              item-text="label"
              item-value="key"
              persistent-hint
              label="Tipo"
              :value="type"
              outlined
              :disabled="material ? true : false"
              @change="onChangeType"
            ></v-select>

            <WorkSpacesAutoComplete
              ref="workspaceInput"
              :workspace="workspace"
              :as-admin="true"
              :dense="true"
              :multiple="false"
              rules="required"
              :disabled="editItem ? true : false"
              label="Selecciona una categoría"
              @change="(value) => (workspace = value)"
            />

            <FieldInput
              id="materialName"
              ref="nameInput"
              v-model="name"
              label="Nombre"
              :filled="true"
              :outlined="false"
              :rules="`required|min:3|max:50|regex:${validRegex}`"
            />
            <TagsAutoComplete
              ref="tagsInput"
              :dense="false"
              tag-type="material"
              :tags="tags"
              rules="required"
              @change="onChangeTags"
            />
          </v-col>
          <v-col cols="12" md="6">
            <v-radio-group
              v-if="type === 'material'"
              v-model="urlInputType"
              row
            >
              <v-radio label="Sube un fichero" value="file"></v-radio>
              <v-radio label="URL Externa" value="materialUrl"></v-radio>
            </v-radio-group>
            <FieldInput
              v-if="type === 'recording'"
              id="url"
              ref="vimeoUrlInput"
              v-model="url"
              label="Video URL (Vimeo)"
              rules="required|url"
            />
            <FieldInput
              v-if="type === 'material' && urlInputType === 'materialUrl'"
              id="materialUrl"
              ref="materialUrlInput"
              v-model="materialUrl"
              label="URL del material"
              rules="required|url"
            />

            <v-progress-linear
              v-if="uploading"
              :value="uploadProgress"
              color="primary"
              height="6"
            ></v-progress-linear>
            <div v-if="isStorageRequired">
              <div v-if="!getFileName" class="file-upload">
                <div class="file-upload__area" @click="uploadFileClicked">
                  <v-icon>mdi-plus-circle</v-icon>
                  <h4 class="my-1">Sube tu fichero aqui.</h4>
                  <h5 class="font-weight-regular d-flex align-center">
                    <h5 class="mr-1 primary--text" color="primary">
                      Sube ficheros
                    </h5>
                    desde tu ordenador.
                  </h5>
                  <h5 class="font-weight-regular d-flex align-center mt-1">
                    El tamaño máximo es
                    {{ MAX_FILE_SIZE_MB[storage] }} MB
                  </h5>
                  <input
                    id=""
                    ref="fileInput"
                    type="file"
                    name=""
                    hidden
                    @change="onFileSelected"
                  />
                </div>
                <div v-if="filesToUpload.length > 0">
                  <ul class="file-container mb-2">
                    <li
                      v-for="(file, index) in filesToUpload"
                      :key="index"
                      class="d-flex flex-row justify-space-between cursor-pointer"
                    >
                      <div>
                        {{ file.name }}
                      </div>
                      <v-icon @click="onRemoveFile(index)">mdi-close</v-icon>
                    </li>
                  </ul>
                </div>
              </div>
              <ul v-else class="file-container mb-2">
                <li
                  class="d-flex flex-row justify-space-between"
                  @click="uploadFileClicked"
                >
                  <div>{{ getFileName }}</div>
                  <v-icon>mdi-pencil</v-icon>
                  <input
                    id=""
                    ref="fileInput"
                    type="file"
                    name=""
                    hidden
                    @change="onFileSelected"
                  />
                </li>
                <h5 class="font-weight-regular">
                  El tamaño máximo es
                  {{ MAX_FILE_SIZE_MB[storage] }} MB
                </h5>
              </ul>
            </div>
            <RadioGroupInput
              v-if="isStorageRequired"
              id="storage"
              ref="storage"
              :value="storage"
              :options="StorageOptions"
              label="Almacenar en"
              rules=""
              @input="(value) => (storage = value)"
            />

            <SwitchInput
              v-if="type === 'material'"
              id="watermark"
              ref="watermark"
              :value="watermark"
              label="Aplicar Marca de Agua"
              rules=""
              @click="(value) => (watermark = value)"
            />
          </v-col>
          <v-row class="d-flex ml-1 mr-1 mt-2 justify-space-between">
            <div>
              <ResourceButton
                :loading="loading"
                :text-button="editItem ? 'Editar' : 'Crear'"
                color="primary"
                icon-button="mdi-pencil"
                :disabled="loading"
                @click="onCreateWorkspaceMaterial"
              />
            </div>
            <div v-if="editItem" class="d-flex">
              <ResourceButton
                :loading="isDeleting"
                text-button="Eliminar"
                color="red"
                icon-button="mdi-delete"
                :disabled="isDeleting"
                @click="deleteWorkspaceMaterialConfirm(editItem)"
              />
            </div>
          </v-row>
        </v-row>
      </section>
    </validation-observer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { inputValidRegex } from '@/utils/inputValidRegex'
import Toast from '@/utils/toast'
import WorkspaceMaterialRepository from '@/services/WorkspaceMaterialRepository'
import WorkspaceRepository from '@/services/WorkspaceRepository'
import { PermissionEnum } from '@/utils/enums'
import LessonRepository from '@/services/LessonRepository'
import UploadRepository from '@/services/UploadRepository'
import axios from 'axios'

const StorageOptions = [
  {
    label: 'Digital Ocean',
    value: 'digitalocean'
  },
  {
    label: 'Cloudinary',
    value: 'cloudinary'
  }
]

const FILE_NAME_REGEX = /\/([^/]+)(\.\w+)?$/

const MEGA_BYTE = 1024 * 1024

const MAX_FILE_SIZE_MB = {
  cloudinary: 10, // 10 MB
  digitalocean: 100 // 100 MB
}

export default {
  components: {
    Vtoolbar: () =>
      import(
        /* webpackChunkName: "Vtoolbar" */ '@/modules/resources/components/resources/toolbar'
      ),
    FieldInput: () =>
      import(
        /* webpackChunkName: "FieldInput" */ '@/modules/resources/components/form/input.vue'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    TagsAutoComplete: () =>
      import(
        /* webpackChunkName: "TagsAutoComplete" */ '@/modules/resources/components/form/tags-auto-complete'
      ),
    SwitchInput: () =>
      import(
        /* webpackChunkName: "TagsAutoComplete" */ '@/modules/resources/components/form/switch-input'
      ),
    WorkSpacesAutoComplete: () =>
      import(
        /* webpackChunkName: "WorkSpacesAutoComplete" */ '@/modules/resources/components/form/work-spaces-auto-complete'
      ),
    RadioGroupInput: () =>
      import(
        /* webpackChunkName: "RadioGroupInput" */ '@/modules/resources/components/form/radio-group-input'
      )
  },
  data() {
    return {
      validRegex: inputValidRegex,
      filesToUpload: [],
      loading: false,
      uploading: false,
      uploadProgress: 0,
      selectedTags: [],
      fileName: '',
      urlInputType: 'file',
      materialUrl: '',
      storage: 'digitalocean',
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
      material: false,
      name: '',
      type: 'material',
      tags: [],
      url: '',
      workspace: null,
      isDeleting: false,
      watermark: false,
      StorageOptions,
      // When adding from a lesson menu
      lesson: null,
      MAX_FILE_SIZE_MB
    }
  },
  computed: {
    ...mapState('workspaceMaterialStore', ['editItem']),
    title() {
      if (this.editItem) {
        return `Editar "${this.editItem.name}"`
      }
      if (this.lesson) {
        return `Añadir Material a "${this.lesson.name}"`
      }

      return 'Nuevo Material'
    },
    isMaterial() {
      return this.type === 'material'
    },
    isStorageRequired() {
      return this.type === 'material' && this.urlInputType === 'file'
    },
    getFileName() {
      if (!this.isMaterial) {
        return ''
      }

      if (this.filesToUpload.length) {
        return this.filesToUpload[0].name
      }

      if (this.url === undefined) {
        return ''
      }
      // Extract the name using a regular expression
      const matches = this.url.match(FILE_NAME_REGEX)
      const fileName = matches && matches[1]

      return fileName
    },
    typeLabel() {
      return this.type === 'material' ? 'Material' : 'Grabación'
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  watch: {
    type() {
      if (this.isMaterial) {
        this.watermark = true // By default is true for materials

        return
      }
      this.watermark = false
    }
  },
  async mounted() {
    this.type = this.$route.params.type || 'material'
    this.watermark = this.isMaterial
    this.workspace = this.$route.params.workspace

    // Only when is Edit
    this.loadItem()

    // If adding a material in a lesson, after create it we directly associate it to the lesson
    this.loadLesson(this.$route.params.lesson_id)
  },
  beforeCreate() {
    this?.$hasRolesOrPermissions(
      ['admin'],
      [PermissionEnum.UPDATE_LESSON_MATERIALS]
    )
  },
  methods: {
    ...mapMutations('workspaceMaterialStore', ['SET_EDIT_ITEM']),
    async loadItem() {
      const { id } = this.$route.params

      // No ID, then is create item
      if (!id) {
        return
      }

      // The item is not in the reducer, load it from the server
      if (!this.editItem) {
        const item = await WorkspaceMaterialRepository.info(
          this.$route.params.id
        )

        if (!item) {
          return
        }
        this.SET_EDIT_ITEM(item)
      }
      if (!this.editItem.workspace) {
        this.editItem.workspace = await WorkspaceRepository.workspaceInfo(
          this.editItem.workspace_id
        )
      }
      const isInternalFile = !!this.editItem.storage

      this.material = this.editItem
      this.name = this.editItem.name
      this.tags = this.editItem.tags ? this.editItem.tags.split(',') : []
      this.type = this.editItem.type
      this.url =
        isInternalFile || this.editItem.type !== 'material'
          ? this.editItem.url
          : undefined
      this.storage = this.editItem.storage || 'digitalocean'
      this.materialUrl = isInternalFile ? '' : this.editItem.url
      this.watermark = this.editItem.watermark === 1
      this.workspace = this.editItem.workspace
      this.urlInputType = isInternalFile ? 'file' : 'materialUrl'
    },

    onChangeType(type) {
      this.type = type
    },
    onChangeTags(tags) {
      this.tags = tags
    },
    async loadLesson(lessonId) {
      if (!lessonId) {
        return
      }
      // This is just to load the title on the header
      this.lesson = await LessonRepository.info(lessonId)
    },

    reset() {
      this.$refs['nameInput'] && this.$refs['nameInput'].resetErrors()
      this.$refs['vimeoUrlInput'] && this.$refs['vimeoUrlInput'].resetErrors()
      this.$refs['workspaceInput'] && this.$refs['workspaceInput'].resetErrors()
      this.$refs['tagsInput'] && this.$refs['tagsInput'].resetErrors()
      this.$refs['materialUrlInput'] &&
        this.$refs['materialUrlInput'].resetErrors()

      this.name = ''
      this.url = ''
      this.tags = []
      this.material = false
      this.filesToUpload = []
      this.materialUrl = ''
    },

    async uploadFileClicked() {
      this.$refs.fileInput.click()
    },

    async onFileSelected(event) {
      const { files } = event.target

      if (!files.length) {
        return
      }
      const filesArray = Array.from(files)

      if (!this.checkFiles(filesArray)) {
        return
      }

      this.filesToUpload = filesArray
    },

    async checkFiles(files) {
      if (!files.length) {
        return true
      }
      if (
        files.some(
          (file) => file.size > this.MAX_FILE_SIZE_MB[this.storage] * MEGA_BYTE
        )
      ) {
        Toast.warning(
          `El tamaño del fichero no puede superar los ${
            this.MAX_FILE_SIZE_MB[this.storage]
          } MB`
        )

        return false
      }

      return true
    },
    async onRemoveFile(index) {
      this.filesToUpload.splice(index, 1)
    },

    async getMaterialUrl() {
      const FOLDER = `workspace_${this.workspace.id}`

      // Recording
      if (this.type === 'recording') {
        return { url: this.url }
      }
      /** External hosted URL */
      if (this.urlInputType === 'materialUrl') {
        return { url: this.materialUrl }
      }

      if (!this.isStorageRequired) {
        return { url: '' }
      }

      /**
       * New file upload
       */
      if (this.filesToUpload.length) {
        if (!this.checkFiles(this.filesToUpload)) {
          this.filesToUpload = []

          return { error: true }
        }

        const url = await UploadRepository.uploadFile({
          storage: this.storage,
          file: this.filesToUpload[0],
          folder: FOLDER
        })

        if (!url) {
          return { error: true }
        }
        this.filesToUpload = []

        return { url }
      }
      /** change of storage */
      if (this.editItem && this.storage !== this.editItem.storage) {
        // If didn't had a url , we do nothing
        if (!this.editItem.url) {
          return { url: '' }
        }

        const response = await axios.get(this.editItem.url, {
          responseType: 'blob'
        })

        const blob = new Blob([response.data], {})

        blob.name = this.editItem.name

        const newUrl = await UploadRepository.uploadFile({
          storage: this.storage,
          file: blob,
          folder: FOLDER
        })

        if (!newUrl) {
          return { error: true }
        }

        return { url: newUrl }
      }

      return { url: this.url }
    },
    async onCreateWorkspaceMaterial() {
      const status = await this.$refs['formCreateWorkspaceMaterial'].validate()

      if (!status) {
        return
      }
      this.loading = true

      let { material } = this

      try {
        if (!this.material) {
          material = await WorkspaceMaterialRepository.create(
            this.workspace.id,
            {
              name: this.name,
              type: this.type
            }
          )
        }

        const urlResult = await this.getMaterialUrl()

        if (urlResult.error) {
          this.loading = false

          return
        }
        this.url = urlResult.url

        material = await WorkspaceMaterialRepository.update(material.id, {
          name: this.name,
          tags: this.tags,
          storage: this.isStorageRequired ? this.storage : 'remove',
          watermark: this.watermark,
          url: this.url || undefined
        })
        if (!material) {
          this.loading = false

          return
        }

        if (this.lesson && !this.editItem) {
          await LessonRepository.addMaterialsToLesson(this.lesson.id, {
            material_id: material.id
          })
        }

        this.loading = false

        await this.$swal.fire({
          icon: 'success',
          toast: true,
          title: this.material
            ? `${this.typeLabel} Actualizado!`
            : this.lesson
            ? `${this.typeLabel} añadido a la lección`
            : `${this.typeLabel} Creado!`,
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })

        // If we are adding material, we reset to create new materials.
        // If we are editing the item, we update as some checks and logic compares with the previous value
        !this.editItem ? this.reset() : this.SET_EDIT_ITEM(material)
      } catch (err) {
        console.error(err)

        await this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Error',
          html: err
        })
        this.loading = false
      }
    },
    async deleteWorkspaceMaterialConfirm(material) {
      this.isDeleting = true
      if (!material) {
        this.isDeleting = false

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
        this.isDeleting = false

        return
      }

      const res = await WorkspaceMaterialRepository.delete(material.id)

      if (!res) {
        this.isDeleting = false

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
      this.isDeleting = false
      this.SET_EDIT_ITEM(false)
      this.reset()
      this.$router.push({
        name: 'manage-materials'
      })
    }
  },
  head: {
    title: {
      inner: 'Crear Materiales'
    }
  }
}
</script>
<style scoped>
.file-upload {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.file-upload .file-upload__area {
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  margin-bottom: 20px;
}
.file-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
}
.file-container li {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
.v-input--selection-controls {
  margin-top: 0;
}
</style>
