<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="450px" @close="onClose">
      <validation-observer ref="formCreateWorkspace">
        <v-card class="d-flex flex-column">
          <v-container class="pa-3">
            <v-card-title class="d-flex justify-space-between pt-0 px-0">
              <span class="text-h6 font-weight-bold">Agregar Alumnos o Grupo</span>
              <v-icon class="d-md-block" @click="onClose"> mdi-close </v-icon>
            </v-card-title>
            <v-row >
              <v-col
                ccols="12"
                sm="12"
                md="6"
                lg="9"
                :style="{ padding: '0px 24px'}"
              >
                <StudentAutoComplete
                  ref="studentAutoComplete"
                  :autofocus="autofocus"
                  :limit="limit"
                  @change="onSelect"
                />
              </v-col>
              <v-col
                ccols="12"
                sm="12"
                md="6"
                lg="2"
                :style="{ paddingTop: '0px'}"
              >
                <v-btn
                  dark
                  color="blue darken-1"
                  class="button"
                  :loading="isAddingStudent"
                  @click="onAddToLesson"
                >
                  ok
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                ccols="12"
                sm="12"
                md="6"
                lg="9"
                :style="{ paddingTop: '0px'}"
              >
                <GroupAutoComplete
                  ref="studentAutoComplete"
                  :autofocus="autofocus"
                  :limit="limit"
                  @change="onSelectGroup"
                />
              </v-col>
              <v-col
                ccols="12"
                sm="12"
                md="6"
                lg="2"
                :style="{ paddingTop: '0px'}"
              >
                <v-btn
                  dark
                  color="blue darken-1"
                  class="button"
                  :loading="isAddingGroup"
                  @click="addGroupToLesson"
                >
                  ok
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </validation-observer>
    </v-dialog>
  </v-row>
</template>
<script>
import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'AddWorkspaceModal',
  components: {
    StudentAutoComplete: () =>
      import(
        /* webpackChunkName: "StudentAutoComplete" */ '@/modules/resources/components/form/student-auto-complete.vue'
      ),
    GroupAutoComplete: () =>
      import(
        /* webpackChunkName: "GroupAutoComplete" */ '@/modules/resources/components/form/group-auto-complete.vue'
      )
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 5
    },
    autofocus: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false,
      isAddingStudent: false,
      isAddingGroup: false
    }
  },
  methods: {
    onSelect(value) {
      this.selectedItem = value
    },
    onSelectGroup(value) {
      this.selectedItem = value
    },
    open() {
      this.isOpen = true
    },
    onClose() {
      this.isOpen = false
    },
    async onAddToLesson() {
      this.isAddingStudent = true
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
        this.isAddingStudent = false

        return
      }
      const res = await LessonRepository.addStudentToLesson(this.$route.params.id, {
        student_id: this.selectedItem.uuid
      })

      if (!res) {
        this.isAddingStudent = false

        return
      }

      this.isAddingStudent = false
      this.$emit('created', this.selectedItem)
      this.selectedItem = false
      this.$refs.studentAutoComplete.clearAutoComplete()

      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: this.workspace ? 'Categoria Actualizado!' : 'Categoria Creado!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })

    },
    async addGroupToLesson() {
      this.isAddingGroup = true
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
        this.isAddingGroup = false

        return
      }
      const res = await LessonRepository.addGroupToLesson(this.$route.params.id, {
        group_id: this.selectedItem.id
      })

      if (!res) {
        this.isAddingGroup = false

        return
      }

      this.isAddingGroup = false
      this.$emit('created', this.selectedItem)
      this.selectedItem = false
      this.$refs.studentAutoComplete.clearAutoComplete()

      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: this.workspace ? 'Categoria Actualizado!' : 'Categoria Creado!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })

    }
  }
}
</script>
