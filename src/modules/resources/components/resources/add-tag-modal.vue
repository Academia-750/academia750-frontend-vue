<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="400px" @close="onClose">
      <validation-observer ref="formCreateTag">
        <v-card class="d-flex flex-column">
          <v-container class="pa-3">
            <v-card-title class="d-flex justify-space-between pt-0 px-0">
              <span class="text-h6 font-weight-bold">Crear Etiqueta</span>
              <v-icon class="d-md-block" @click="onClose"> mdi-close </v-icon>
            </v-card-title>
            <FieldInput
              id="tag"
              ref="nameInput"
              v-model="name"
              label="Etiqueta"
              :rules="`required|min:3|max:25|regex:${validRegex}`"
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
                @click="onCreateTag"
              >
                Crear
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card>
      </validation-observer>
    </v-dialog>
  </v-row>
</template>
<script>
import TagRepository from '@/services/TagRepository'
import { inputValidRegex } from '@/utils/inputValidRegex'

export default {
  name: 'AddTagModal',
  components: {
    FieldInput: () =>
      import(
        /* webpackChunkName: "FieldInput" */ '@/modules/resources/components/form/input.vue'
      )
  },
  props: {},
  data() {
    return {
      isOpen: false,
      loading: false,
      name: '',
      tag: '',
      validRegex: inputValidRegex
    }
  },
  methods: {
    open(tag) {
      this.isOpen = true
      this.reset()
      if (tag) {
        this.tag = tag
        this.name = tag.name
      }
    },
    async reset() {
      this.$refs['nameInput'] && this.$refs['nameInput'].resetErrors()
      this.name = ''
    },
    onClose() {
      this.isOpen = false
    },
    async onCreateTag() {
      this.loading = true
      const status = await this.$refs['formCreateTag'].validate()

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
      const tag = await TagRepository.create({
        name: this.name
      })

      if (!tag) {
        this.loading = false

        return
      }

      this.loading = false
      this.$emit('create', tag)
      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'Etiqueta creada!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })

      this.onClose()
    }
  }
}
</script>
