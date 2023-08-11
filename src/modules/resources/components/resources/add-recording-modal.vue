<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="400px" @close="onClose">
      <validation-observer ref="formCreateWorkspace">
        <v-card class="d-flex flex-column">
          <v-container class="pa-3">
            <v-card-title class="d-flex justify-space-between pt-0 px-0">
              <span class="text-h6 font-weight-bold">Upload a Recording</span>
              <v-icon class="d-md-block" @click="onClose"> mdi-close </v-icon>
            </v-card-title>
            <!-- <v-select
              :items="workspaces"
              item-text="label"
              item-value="key"
              persistent-hint
              label="Selecciona un workspace"
              outlined
            ></v-select> -->
            <FieldInput
              v-model="name"
              label="Material Name"
              rules="required|min:3|max:25|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
            />
            <div>
              <v-text-field
                label="Paste Vimeo Link Here"
                outlined
              ></v-text-field>
              <!-- <v-select
                v-model="workspace"
                :items="tags"
                item-text="label"
                item-value="key"
                persistent-hint
                label="Tags"
                multiple
                outlined
              ></v-select> -->
            </div>
            
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
  name: 'AddRecordingModal',
  components: { FieldInput },
  props: {
    title: {
      type: String,
      default: ''
    },
    workspace: {
      type: String,
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
    }
  }
}
</script>
