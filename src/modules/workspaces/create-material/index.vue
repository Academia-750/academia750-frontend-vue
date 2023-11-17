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
              id="materialName"
              ref="materialInput"
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
            <FieldInput
              v-if="type === 'recording'"
              id="url"
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
              <h5 class="font-weight-regular">El tamaño máximo es 10 MB</h5>
            </ul>
          </v-col>
          <v-row class="d-flex ml-1 mr-1 mt-2 justify-space-between">
            <div>
              <ResourceButton
                :loading="true"
                :text-button="editItem ? 'Editar' : 'Crear'"
                color="primary"
                icon-button="mdi-pencil"
                @click="onCreateWorkspaceMaterial"
              />
            </div>
            <div v-if="editItem" class="d-flex">
              <resource-button
                text-button="Eliminar"
                icon-button="mdi-delete"
                color="red"
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
import { mapState, mapActions } from 'vuex'
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
    ...mapState('workspaceMaterialStore', ['editItem']),
    title() {
      return !this.editItem ? 'Nueva Material' : `Editar "${this.editItem.name}"`
    },
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
    },
    typeLabel() {
      return this.type === 'material' ? 'Material' : 'Grabación'
    }
  },
  mounted() {
    if (this.editItem) {
      this.material = this.editItem
      this.name = this.editItem.name
      this.tags = this.editItem.tags ? this.editItem.tags.split(',') : []
      this.type = this.editItem.type
      this.url = this.editItem.url || undefined
      this.workspace = this.editItem.workspace_id.toString()

      return
    }
    this.loadWorkspaces()
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  methods: {
    ...mapActions('workspaceMaterialStore', ['SET_EDIT_ITEM']),
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
      this.workspace = this.defaultWorkspace || ''
      this.url = ''
      this.tags = []
      this.material = false
      this.uploadedFiles = []
    },

    async deleteMaterial() {
      console.log('create')
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
          title: this.material
            ? `${this.typeLabel} Actualizado!`
            : `${this.typeLabel} Creado!`,
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })
        this.reset()
        this.$router.replace({
          name: 'create-materials'
        })
      } catch (err) {
        console.error(err)
        this.loading = false
      }
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