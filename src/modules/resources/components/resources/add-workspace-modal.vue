<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="400px" @close="onClose">
      <validation-observer ref="formCreateWorkspace">
        <v-card class="d-flex flex-column">
          <v-container class="pa-3">
            <v-card-title class="d-flex justify-space-between pt-0 px-0">
              <span class="text-h6 font-weight-bold">Crear Workspace</span>
              <v-icon class="d-md-block" @click="onClose"> mdi-close </v-icon>
            </v-card-title>
            <FieldInput
              ref="nameInput"
              v-model="name"
              label="Workspace Name"
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
                @click="onCreateWorkspace"
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
  name: 'AddWorkspaceModal',
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
      loading: false
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    onClose() {
      this.isOpen = false
      this.$refs.nameInput.resetErrors()
      this.$emit('input', '')
    },
    async onCreateWorkspace() {
      this.loading = true
      const status = await this.$refs['formCreateWorkspace'].validate()

      if (!status) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, complete correctamente los campos del formulario.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })
        this.onClose()
        this.name = ''
        this.loading = false

        return
      }
      const workspace = this.workspace
        ? await WorkspaceRepository.update(this.workspace.id, {
            name: this.name
          })
        : await WorkspaceRepository.create({
            name: this.name
          })

      if (!workspace) {
        this.loading = false

        return
      }

      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: this.workspace ? 'Workspace Actualizado!' : 'Workspace Creado!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })
      this.onClose()
      this.name = ''
      this.$emit('create', workspace)
      this.isOpen = false
      this.loading = false
    }
  }
}
</script>
