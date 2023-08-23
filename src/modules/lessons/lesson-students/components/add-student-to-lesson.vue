<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="450px" @close="onClose">
      <validation-observer ref="formAddStudentsToLesson">
        <v-card class="d-flex flex-column">
          <v-container class="pa-3">
            <v-card-title class="d-flex justify-space-between pt-0 px-0">
              <span class="text-h6 font-weight-bold">Agregar Alumnos o Grupo</span>
              <v-icon class="d-md-block" @click="onClose"> mdi-close </v-icon>
            </v-card-title>
            <div>
              <div class="d-flex justify-space-between my-1">
                <StudentAutoComplete
                  ref="studentAutoComplete"
                  :autofocus="autofocus"
                  :limit="limit"
                  @change="onSelect"
                />
                <v-btn
                  dark
                  color="blue darken-1"
                  class="button ml-2"
                  :loading="isAddingStudent"
                  @click="onAddStudentToLesson"
                >
                  ok
                </v-btn>
              </div>
              <div class="d-flex justify-space-between my-1">
                <GroupAutoComplete
                  ref="groupAutoComplete"
                  :autofocus="autofocus"
                  :limit="limit"
                  @change="onSelectGroup"
                />
                <v-btn
                  dark
                  color="blue darken-1"
                  class="button ml-2"
                  :loading="isAddingGroup"
                  @click="addGroupToLesson"
                >
                  ok
                </v-btn>
              </div>
            </div>
          </v-container>
        </v-card>
      </validation-observer>
    </v-dialog>
  </v-row>
</template>
<script>
import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'AddStudentModal',
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
  data() {
    return {
      isOpen: false,
      isAddingStudent: false,
      isAddingGroup: false,
      limit: 5,
      autofocus: true
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
    async onAddStudentToLesson() {
      this.isAddingStudent = true
      const status = await this.$refs['formAddStudentsToLesson'].validate()

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
      this.name = ''

      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'Estudiante agregado',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })

    },
    async addGroupToLesson() {
      this.isAddingGroup = true
      const status = await this.$refs['formAddStudentsToLesson'].validate()

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
      this.$refs.groupAutoComplete.clearAutoComplete()
      this.name = ''

      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'grupo añadido',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })

    }
  }
}
</script>
