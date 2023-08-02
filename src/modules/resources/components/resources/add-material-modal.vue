<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="450px" @close="onClose">
      <validation-observer ref="formCreateWorkspace">
        <v-card class="d-flex flex-column">
          <v-container class="pa-3">
            <v-card-title class="d-flex justify-space-between pt-0 px-0">
              <span class="text-h6 font-weight-bold">Upload File</span>
              <v-icon class="d-md-block" @click="onClose"> mdi-close </v-icon>
            </v-card-title>
            <v-select
              :items="workspaces"
              item-text="label"
              item-value="key"
              persistent-hint
              label="Selecciona un workspace"
              outlined
            ></v-select>
            <FieldInput
              v-model="name"
              label="Material Name"
              rules="required|min:3|max:25|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
            />
            <div class="file-upload">
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
                />
              </div>
            </div>
            
            <v-select
              v-model="value"
              :items="workspaces"
              label="Tags"
              multiple
              outlined
            ></v-select>
            
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
                @click="onUploadFile"
              >
                {{ workspace ? 'Editar' : 'Crear' }}
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </validation-observer>
    </v-dialog>
  </v-row>
</template>
<script>
import FieldInput from '@/modules/resources/components/form/input.vue'
import WorkspaceRepository from '@/services/WorkspaceRepository'

export default {
  name: 'AddMaterialModal',
  components: { FieldInput },
  props: {
    title: {
      type: String,
      default: ''
    },
    workspace: {
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
      workspaces: {},
      selectedWorkspace: null
    }
  },
  mounted() {
    this.loadWorkspaces()
  },
  methods: {
    open() {
      this.isOpen = true
    },
    onClose() {
      this.isOpen = false
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
    async onUploadFile() {
      console.log('onUploadFile')
    },
    async uploadFileclicked() {
      this.$refs.fileInput.click()
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
</style>