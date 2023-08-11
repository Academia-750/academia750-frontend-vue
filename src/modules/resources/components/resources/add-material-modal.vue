<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="450px" @close="onClose">
      <validation-observer ref="formCreateWorkspaceMaterial">
        <v-card class="d-flex flex-column">
          <v-container class="pa-3">
            <v-card-title class="d-flex justify-space-between pt-0 px-0">
              <span class="text-h6 font-weight-bold">Upload File</span>
              <v-icon class="d-md-block" @click="onClose"> mdi-close </v-icon>
            </v-card-title>
            <v-select
              v-if="editItem"
              v-model="editItem.workspace_id"
              :items="workspaces"
              item-text="label"
              item-value="key"
              label="Selecciona un workspace"
              outlined
              :disabled="editItem? true : false"
              @change="onSelect"
            ></v-select>
            <v-select
              v-else
              v-model="workspace"
              :items="workspaces"
              item-text="label"
              item-value="key"
              label="Selecciona un workspace"
              outlined
              :disabled="editItem? true : false"
              @change="onSelect"
            ></v-select>
            <v-select
              v-if="editItem"
              v-model="editItem.type"
              :items="types"
              item-text="label"
              item-value="key"
              persistent-hint
              label="Tipos"
              :value="type"
              outlined
              class="mr-2"
              clearable
              @change="onChangeType"
            ></v-select>
            <v-select
              v-else
              v-model="type"
              :items="types"
              item-text="label"
              item-value="key"
              persistent-hint
              label="Tipos"
              :value="type"
              outlined
              class="mr-2"
              clearable
              @change="onChangeType"
            ></v-select>
            <FieldInput
              v-model="name"
              label="Material Name"
              rules="required|min:3|max:25|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
            />
            <div v-if="!editItem" class="file-upload">
              <div class="file-upload__area" @click="uploadFileclicked">
                <v-icon>mdi-plus-circle</v-icon>
                <h4 class="my-1">Drop your files here.</h4>
                <h5 class="font-weight-regular d-flex align-center"><h5 class="mr-1 primary--text" color="primary">Browse file </h5> from your computer.</h5>
                <input
                  id=""
                  ref="fileInput"
                  type="file"
                  name=""
                  hidden
                  multiple
                  @change="handleFileUpload"
                />
              </div>
            </div>
            <div v-if="uploadedFiles.length > 0">
              <ul class="file-container mb-2">
                <li v-for="(file, index) in uploadedFiles" :key="index" class="d-flex flex-row justify-space-between">
                  <div>{{ file.name }}</div>
                  <v-icon @click="clearFileUpload">mdi-close</v-icon>
                </li>
              </ul>
            </div>
            <v-chip
              v-if="!uploadedFiles.length > 0 && editItem.url && getFileName(editItem.url)"
              class="ma-2"
              color="cyan"
              label
              close
              large
              text-color="white"
              max-width="100%"
              close-icon="mdi-pencil"
              @click="uploadFileclicked"
            >
              {{ fileName }}
              <input
                id=""
                ref="fileInput"
                type="file"
                name=""
                hidden
                multiple
                @change="handleFileUpload"
              />
            </v-chip>
            <v-progress-linear
              v-if="uploading"
              :value="uploadProgress"
              color="primary"
              height="6"
            ></v-progress-linear>
            <ResourceTagAutoComplete
              :dense="false"
              @change="onChangeTags"
              @remove="onRemoveTags"
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
                @click="onCreateWorkspaceMaterial"
              >
                {{ editItem ? 'Editar' : 'Crear' }}
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
import { mapMutations, mapActions, mapState } from 'vuex'
import Cloudinary from '@/services/CloudinaryService'

export default {
  name: 'AddMaterialModal',
  components: {
    FieldInput: () =>
      import(
        /* webpackChunkName: "FieldInput" */ '@/modules/resources/components/form/input.vue'
      ),
    ResourceTagAutoComplete: () => import(/* webpackChunkName: "ResourceTagAutoComplete" */ '@/modules/resources/components/form/tags-auto-complete')
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    material: {
      type: Object,
      default: null
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isOpen: false,
      loading: false,
      workspaces: [],
      selectedWorkspace: null,
      uploadedFiles: [],
      uploading: false,
      uploadProgress: 0,
      selectedItem: false,
      selectedTags: [],
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
      ]
    }
  },
  computed: {
    ...mapState('workspaceMaterialStore', ['editItem', 'workspace', 'tags', 'type', 'uploadFile'])
  },
  mounted() {
    this.loadWorkspaces()
    this.getFileName()
  },
  methods: {
    ...mapActions('workspaceMaterialStore', ['deleteGroup', 'resetTableOptions']),
    ...mapMutations('workspaceMaterialStore', ['SET_EDIT_ITEM', 'SET_WORKSPACE', 'SET_TYPE', 'SET_TAGS', 'SET_UPLOAD_FILE']),
    open() {
      this.isOpen = true
    },
    onRemoveTags (item) {
      this.$refs.table.reload()
    },
    onClose() {
      this.isOpen = false
      this.SET_EDIT_ITEM(false)
    },
    onChangeType(value) {
      this.SET_TYPE(value)
      this.$refs.table.reload()
    },
    onChangeTags(value) {
      this.selectedTags = value
    },
    async materialInfo() {
      
      const res = await WorkspaceRepository.info(id)

      this.selectedItem = res.results.map((item) => ({
        key: item.id,
        label: item.name
      }))

      return res
    },
    async getFileName(url) {
      if (!this.editItem) {
        return
      }
      // Extract the name using a regular expression
      const matches = url.match(/\/([^/]+)\.\w+$/)
      const fileName = matches && matches[1]

      this.fileName = fileName
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
    onSelect(value) {
      this.selectedItem = value
    },
    async uploadFileclicked() {
      this.$refs.fileInput.click()
    },
    async clearFileUpload() {
      this.uploading = false// Set uploading flag to false
      this.uploadProgress = 0 // Reset progress
      this.uploadedFiles = []// Clear the uploaded files array
    },
    async handleFileUpload(event) {
      // Handle the file upload event and store the uploaded files in the array
      const { files } = event.target
      
      this.SET_UPLOAD_FILE(files[0])
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
    async onCreateWorkspaceMaterial() {
    this.loading = true
    const status = await this.$refs['formCreateWorkspaceMaterial'].validate()

    if (!status) {
      this.$swal.fire({
        icon: 'error',
        toast: true,
        title: 'Por favor, complete correctamente los campos del formulario.',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })
      this.loading = false

      return
    }
    let materialId = this.editItem.id
    let res = undefined

    if (this.uploadFile) {
    console.log('-----this.workspace', this.workspace)

    res = await Cloudinary.upload(this.uploadFile, this.workspace)
    }
    if ( !this.editItem ) {
     const material = await WorkspaceMaterialRepository.create(this.workspace || this.selectedItem,{
          name: this.name,
          type: this.type,
          url: res.url
        })

      materialId = material.id
    }
    const material = await WorkspaceMaterialRepository.update(materialId, {
      name: this.name,
      tags: this.tags,
      url: res.url
    })
    
    await this.$swal.fire({
      icon: 'success',
      toast: true,
      title: this.editItem ? 'Workspace Actualizado!' : 'Workspace Creado!',
      showConfirmButton: true,
      confirmButtonText: 'Entendido',
      timer: 7500
    })
    this.onClose()
    this.name = ''
    this.SET_UPLOAD_FILE({})
    this.$emit('create', material)
    this.isOpen = false
    this.loading = false
    this.uploading = false// Set uploading flag to false
    this.uploadProgress = 0 // Reset progress
    this.uploadedFiles = []
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
.file-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
}
.file-container li{
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
}
</style>