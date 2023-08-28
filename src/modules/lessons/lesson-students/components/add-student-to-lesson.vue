<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="450px" @close="onClose">
      <v-card class="d-flex flex-column">
        <v-container class="pa-3">
          <v-card-title class="d-flex justify-space-between pt-0 px-0">
            <span class="text-h6 font-weight-bold">
              Agregar Alumnos o Grupo
            </span>
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
                OK
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
                OK
              </v-btn>
            </div>
          </div>
        </v-container>
      </v-card>
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
      autofocus: true,
      selectedStudent: false,
      selectedGroup: false
    }
  },
  methods: {
    onSelect(value) {
      this.selectedStudent = value
    },
    onSelectGroup(value) {
      this.selectedGroup = value
    },
    open() {
      this.isOpen = true
      this.$refs.studentAutoComplete &&
        this.$refs.studentAutoComplete.clearAutoComplete()
      this.$refs.groupAutoComplete &&
        this.$refs.groupAutoComplete.clearAutoComplete()
    },
    onClose() {
      this.isOpen = false
    },
    async onAddStudentToLesson() {
      this.isAddingStudent = true

      if (!this.selectedStudent) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          text: 'Seleccione primero un estudiante.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })
        this.isAddingStudent = false

        return
      }
      const res = await LessonRepository.addStudentToLesson(
        this.$route.params.id,
        {
          student_id: this.selectedStudent.uuid
        }
      )

      if (!res) {
        this.isAddingStudent = false

        return
      }

      this.isAddingStudent = false
      this.$emit('created', this.selectedStudent)
      this.selectedStudent = false
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

      if (!this.selectedGroup) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          text: 'Seleccione primero un grupo.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })
        this.isAddingGroup = false

        return
      }
      const res = await LessonRepository.addGroupToLesson(
        this.$route.params.id,
        {
          group_id: this.selectedGroup.id
        }
      )

      if (!res) {
        this.isAddingGroup = false

        return
      }

      this.isAddingGroup = false
      this.$emit('created', this.selectedGroup)
      this.selectedGroup = false
      this.$refs.groupAutoComplete.clearAutoComplete()
      this.name = ''

      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'Grupo añadido',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })
    }
  }
}
</script>
