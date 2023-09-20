<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" width="500px">
      <v-card>
        <v-card-text>
          <div class="pt-2 mb-4">
            <p class="text-h5 mb-0 font-weight-black black--text">
              Información
            </p>
          </div>
          <div class="mb-4">
            <p class="text-h6 mb-0 font-weight-black black--text">Clase:</p>
            <p class="text-h6 font-weight-black">{{ lesson.name }}</p>
          </div>
          <div class="mb-4">
            <p class="text-h6 mb-0 font-weight-black black--text">
              Descripción:
            </p>
            <p class="text-h6 font-weight-black">{{ lesson.description }}</p>
          </div>
          <div class="mb-2 d-flex justify-space-between align-center">
            <div class="flex flex-column">
              <p class="text-h6 font-weight-black black--text ">
                Hora de comienzo:
              </p>
              <p class="text-h6 font-weight-black ml-8">{{ start_time }}</p>
            </div>
            <div class="flex flex-column">
              <p class="text-h6 font-weight-black black--text text-center">
                Hora de finalización:
              </p>
              <p class="text-h6 font-weight-black text-center">
                {{ end_time }}
              </p>
            </div>
          </div>
          <template v-if="isActiveLesson(lesson)">
            <resource-button
              text-button="Materiales"
              icon-button="mdi-folder-open"
              color="success"
              :config-route="{
                name: 'list-of-materials',
                params: { id: lesson.id }
              }"
              :disabled="true"
            />
            <resource-button
              text-button="Grabaciones"
              icon-button="mdi-camera"
              color="success"
              :config-route="{
                name: 'add-students',
                params: { id: lesson.id }
              }"
              :disabled="true"
            />
          </template>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { PermissionEnum } from '@/utils/enums'

export default {
  name: 'LessonInfoModal',
  components: {
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ './ResourceButton.vue'
      )
  },
  props: {},
  data() {
    return {
      isOpen: false,
      loading: false,
      lesson: {},
      start_time: '',
      end_time: ''
    }
  },
  methods: {
    open(lesson) {
      this.lesson = lesson
      this.start_time = lesson.start_time
      this.end_time = lesson.end_time
      this.isOpen = true
    },
    onClose() {
      this.isOpen = false
    },
    isActiveLesson(lesson) {
      return (
        lesson.is_active === 1 ||
        this?.$hasPermissionMiddleware(PermissionEnum.JOIN_LESSONS)
      )
    }
  }
}
</script>
