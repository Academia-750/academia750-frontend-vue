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
            <ValidationProvider
              ref="workspaceInput"
              v-slot="{ errors }"
              mode="aggressive"
              rules="required"
              name="Categoría"
            >
              <v-select
                v-model="workspace"
                :items="workspaces"
                item-text="label"
                item-value="key"
                label="Selecciona una categoría"
                outlined
                clearable
                :error-messages="errors"
                :disabled="editItem ? true : false"
              ></v-select>
            </ValidationProvider>
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
            <div
              v-if="
                !getFileName && type === 'material' && urlInputType === 'file'
              "
              class="file-upload"
            >
              <div class="file-upload__area" @click="uploadFileClicked">
                <v-icon>mdi-plus-circle</v-icon>
                <h4 class="my-1">Sube tu fichero aqui.</h4>
                <h5 class="font-weight-regular d-flex align-center">
                  <h5 class="mr-1 primary--text" color="primary">
                    Sube ficheros
                  </h5>
                  desde tu ordenador.
                </h5>
                <h5 class="font-weight-regular d-flex align-center">
                  El tamaño máximo es 10 MB
                </h5>
                <input
                  id=""
                  ref="fileInput"
                  type="file"
                  name=""
                  hidden
                  @change="handleFileUpload"
                />
              </div>
              <div v-if="uploadedFiles.length > 0">
                <ul class="file-container mb-2">
                  <li
                    v-for="(file, index) in uploadedFiles"
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
            <ul
              v-if="
                !uploadedFiles.length &&
                isMaterial &&
                getFileName &&
                urlInputType === 'file'
              "
              class="file-container mb-2"
            >
              <li
                class="d-flex flex-row justify-space-between"
                @click="uploadFileClicked"
              >
                <div>
                  {{ getFileName }}
                </div>
                <v-icon>mdi-pencil</v-icon>
                <input
                  id=""
                  ref="fileInput"
                  type="file"
                  name=""
                  hidden
                  @change="handleFileUpload"
                />
              </li>
              <h5 class="font-weight-regular">El tamaño máximo es 10 MB</h5>
            </ul>
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
import WorkspaceRepository from '@/services/WorkspaceRepository'
import WorkspaceMaterialRepository from '@/services/WorkspaceMaterialRepository'
import Cloudinary from '@/services/CloudinaryService'

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
      )
  },
  data() {
    return {
      validRegex: inputValidRegex,
      selectedWorkspace: null,
      uploadedFiles: [],
      loading: false,
      uploading: false,
      uploadProgress: 0,
      selectedTags: [],
      workspaces: [],
      fileName: '',
      urlInputType: 'file',
      materialUrl: '',
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
      workspace: '',
      isDeleting: false,
      watermark: false
    }
  },
  computed: {
    ...mapState('workspaceMaterialStore', ['editItem']),
    title() {
      return !this.editItem
        ? 'Nueva Material'
        : `Editar "${this.editItem.name}"`
    },
    isMaterial() {
      return this.type === 'material'
    },
    getFileName() {
      if (!this.material) {
        return ''
      }
      if (this.url === undefined) {
        return ''
      }
      // Extract the name using a regular expression
      const matches = this.url.match(/\/([^/]+)\.\w+$/)
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
    await this.loadWorkspaces()

    this.workspace = this.$route.params.workspace || ''
    this.type = this.$route.params.type || 'material'
    this.watermark = this.isMaterial

    // Only when is Edit
    this.loadItem()
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
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

      this.material = this.editItem
      this.name = this.editItem.name
      this.tags = this.editItem.tags ? this.editItem.tags.split(',') : []
      this.type = this.editItem.type
      this.url = this.editItem.url || undefined
      this.watermark = this.editItem.watermark === 1
      this.workspace = this.editItem.workspace_id.toString()
    },

    onChangeType(type) {
      this.type = type
    },
    onChangeTags(tags) {
      this.tags = tags
    },

    reset() {
      this.$refs['nameInput'] && this.$refs['nameInput'].resetErrors()
      this.$refs['vimeoUrlInput'] && this.$refs['vimeoUrlInput'].resetErrors()
      this.$refs['workspaceInput'] && this.$refs['workspaceInput'].reset()
      this.$refs['tagsInput'] && this.$refs['tagsInput'].resetErrors()

      this.name = ''
      this.url = ''
      this.tags = []
      this.material = false
      this.uploadedFiles = []
      this.materialUrl = ''
      this.urlInputType = 'file'
    },
    async loadWorkspaces() {
      const res = await WorkspaceRepository.list()

      this.workspaces = res.results.map((item) => ({
        key: item.id.toString(),
        label: item.name
      }))
    },

    async uploadFileClicked() {
      this.$refs.fileInput.click()
    },

    async handleFileUpload(event) {
      // Handle the file upload event and store the uploaded files in the array
      const { files } = event.target

      // We get a files array, but the there is only 1 file
      if (!files.length) {
        return
      }

      const MEGA_BYTE = 1024 * 1024

      // 10 MB is also the max of cloudinary free plan
      if (Array.from(files).some((file) => file.size > 10 * MEGA_BYTE)) {
        Toast.warning('El tamaño del fichero no puede superar los 10 MB')

        return
      }

      this.uploading = true
      const totalFiles = files.length
      let filesUploaded = 0
      const interval = setInterval(() => {
        filesUploaded++
        this.uploadProgress = (filesUploaded / totalFiles) * 100
        if (filesUploaded === totalFiles) {
          clearInterval(interval)
          this.uploading = false // Set uploading flag to false after file upload is completed
          this.uploadProgress = 0 // Reset progress
          this.uploadedFiles = Array.from(files)
        }
      }, 200)
    },
    async onRemoveFile(index) {
      this.uploadedFiles.splice(index, 1)
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
          material = await WorkspaceMaterialRepository.create(this.workspace, {
            name: this.name,
            type: this.type
          })
        }
        if (
          this.uploadedFiles.length &&
          this.type !== 'recording' &&
          this.urlInputType === 'file'
        ) {
          const res = await Cloudinary.upload(
            this.uploadedFiles[0],
            `workspace_${this.workspace}`
          )

          if (!res) {
            this.loading = false

            return
          }
          this.uploadedFiles = []
          this.url = res.secure_url
        }

        if (this.type !== 'recording' && this.urlInputType === 'materialUrl') {
          this.url = this.materialUrl
        }

        material = await WorkspaceMaterialRepository.update(material.id, {
          name: this.name,
          tags: this.tags,
          watermark: this.watermark,
          url: this.url || undefined
        })
        if (!material) {
          this.loading = false

          return
        }
        this.loading = false

        await this.$swal.fire({
          icon: 'success',
          toast: true,
          title: this.material
            ? `${this.typeLabel} Actualizado!`
            : `${this.typeLabel} Creado!`,
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })

        if (!this.editItem) {
          this.reset()
        }
      } catch (err) {
        console.error(err)
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
