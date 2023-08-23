<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="350">
      <v-card>
        <v-card-title class="text-h6"> Eliminar Grupo </v-card-title>
        <div class="d-flex flex-column py-3">
          <div
            v-for="(item, index) in groups"
            :key="index"
            class="d-flex justify-space-between mx-3 my-1"
          >
            <div>{{ item.group_name }}</div>
            <resource-button-delete
              text-button="Eliminar"
              @actionConfirmShowDialogDelete="
                deleteGroupFromLesson(item.group_id)
              "
            />
          </div>
          <div v-if="groups.length == 0" class="d-flex justify center mx-3">
            <p>No hay grupo para eliminar</p>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'DeleteGroupModal',
  components: {
    ResourceButtonDelete: () =>
      import(
        /* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'
      )
  },
  data() {
    return {
      isOpen: false,
      groups: []
    }
  },
  mounted() {
    this.getGroupsInLesson()
  },
  methods: {
    open() {
      this.isOpen = true
      this.getGroupsInLesson()
    },
    onClose() {
      this.isOpen = false
    },
    async getGroupsInLesson(pagination) {
      const lessonId = this.$route.params.id
      const params = {
        ...pagination
      }

      const res = await LessonRepository.lessonStudentList(lessonId, params)

      this.groups = res.groups

      return res
    },
    async deleteGroupFromLesson(group_id) {
      const lessonId = this.$route.params.id

      if (!group_id) {
        return
      }

      const result = await this.$swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title: 'ELIMINAR Alumno',
        html: '¿Seguro que deseas eliminar este grupo? Todos los alumnos asociados a este grupo serán eliminados de la clase y perderán el acceso a sus materiales',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (!result.isConfirmed) {
        return
      }

      const res = await LessonRepository.deleteGroupFromLesson(lessonId, {
        group_id
      })

      this.onClose()
      if (res) {
        this.$emit('deleted', this.groups)
      }
    }
  }
}
</script>
