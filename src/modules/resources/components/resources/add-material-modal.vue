<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="450px" @close="onClose">
      <validation-observer ref="formCreateWorkspaceMaterial">
        <v-card class="d-flex flex-column">
          <v-container class="pa-3">
            <v-card-title class="d-flex justify-space-between pt-0 px-0">
              <span class="text-h6 font-weight-bold">Subir Fichero</span>
              <v-icon class="d-md-block" @click="onClose"> mdi-close </v-icon>
            </v-card-title>
            <v-select
              v-model="type"
              :items="types"
              item-text="label"
              item-value="key"
              persistent-hint
              label="Tipo"
              :value="type"
              outlined
              clearable
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
                :disabled="material ? true : false"
              ></v-select>
            </ValidationProvider>
            <FieldInput
              ref="nameInput"
              v-model="name"
              label="Nombre del Material"
              :rules="`required|min:3|max:50|regex:${validRegex}`"
            />
            <FieldInput
              v-if="type === 'recording'"
              ref="vimeoUrlInput"
              v-model="url"
              label="Video URL (Vimeo)"
              rules="required"
            />
            <v-progress-linear
              v-if="uploading"
              :value="uploadProgress"
              color="primary"
              height="6"
            ></v-progress-linear>
            <div v-if="!getFileName && type === 'material'" class="file-upload">
              <div class="file-upload__area" @click="uploadFileClicked">
                <v-icon>mdi-plus-circle</v-icon>
                <h4 class="my-1">Sube tu fichero aqui.</h4>
                <h5 class="font-weight-regular d-flex align-center">
                  <h5 class="mr-1 primary--text" color="primary">
                    Sube ficheros
                  </h5>
                  desde tu ordenador.
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
                  <v-icon @click="onRemovefile(index)">mdi-close</v-icon>
                </li>
              </ul>
            </div>
            <ul
              v-if="!uploadedFiles.length && isMaterial && getFileName"
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
            </ul>
            <TagsAutoComplete
              ref="tagsInput"
              :dense="false"
              tag-type="material"
              :tags="tags"
              rules="required"
              @change="onChangeTags"
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
                Cancelar
              </v-btn>
              <v-btn
                dark
                color="blue darken-1"
                class="button flex-grow-1"
                large
                :loading="loading"
                @click="onCreateWorkspaceMaterial"
              >
                {{ material ? 'Editar' : 'Crear' }}
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </validation-observer>
    </v-dialog>
  </v-row>
</template>

<script>
import WorkspaceRepository from '@/services/WorkspaceRepository'
import WorkspaceMaterialRepository from '@/services/WorkspaceMaterialRepository'
import Cloudinary from '@/services/CloudinaryService'

export default {
  name: 'AddMaterialModal',
  components: {
    FieldInput: () =>
      import(
        /* webpackChunkName: "FieldInput" */ '@/modules/resources/components/form/input.vue'
      ),
    TagsAutoComplete: () =>
      import(
        /* webpackChunkName: "TagsAutoComplete" */ '@/modules/resources/components/form/tags-auto-complete'
      )
  },
  props: {
    defaultWorkspace: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isOpen: false,
      selectedWorkspace: null,
      uploadedFiles: [],
      loading: false,
      uploading: false,
      uploadProgress: 0,
      selectedTags: [],
      workspaces: [],
      fileName: '',
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
      workspace: ''
    }
  },
  computed: {
    isMaterial() {
      return this.type === 'material'
    },
    getFileName() {
      if (!this.material) {
        return ''
      }
      // Extract the name using a regular expression
      const matches = this.url.match(/\/([^/]+)\.\w+$/)
      const fileName = matches && matches[1]

      return fileName
    }
  },
  mounted() {
    this.loadWorkspaces()
  },
  methods: {
    open(material) {
      this.isOpen = true
      this.reset()

      if (material) {
        this.material = material
        this.name = material.name
        this.type = material.type
        this.workspace = material.workspace_id.toString()
        this.url = material.url
        this.tags = material.tags ? material.tags.split(',') : []
      }
    },

    reset() {
      this.$refs['nameInput'] && this.$refs['nameInput'].resetErrors()
      this.$refs['vimeoUrlInput'] && this.$refs['vimeoUrlInput'].resetErrors()
      this.$refs['workspaceInput'] && this.$refs['workspaceInput'].reset()
      this.$refs['tagsInput'] && this.$refs['tagsInput'].resetErrors()

      this.name = ''
      this.workspace = this.defaultWorkspace || ''
      this.url = ''
      this.tags = []
      this.material = false
      this.uploadedFiles = []
    },
    onClose() {
      this.isOpen = false
    },
    onChangeType(type) {
      this.type = type
    },
    onChangeTags(tags) {
      this.tags = tags
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

      if (!files.length) {
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
    async onRemovefile(index) {
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
        if (this.uploadedFiles.length && this.type !== 'recording') {
          const res = await Cloudinary.upload(
            this.uploadedFiles[0],
            `workspace_${this.workspace}`
          )

          if (!res) {
            this.loading = false

            return
          }
          this.url = res.secure_url
        }

        material = await WorkspaceMaterialRepository.update(material.id, {
          name: this.name,
          tags: this.tags,
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
          title: this.material ? 'Material Actualizado!' : 'Material Creado!',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })
        this.$emit('create', material)
        this.onClose()
      } catch (err) {
        console.error(err)
        this.loading = false
      }
    }
  }
}
</script>
<style scoped>
.file-upload {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.file-upload .file-upload__area {
  width: 600px;
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
</style>
