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
              <p class="text-h6 font-weight-black black--text mb-0">
                Hora de comienzo:
              </p>
              <p class="text-h6 font-weight-black">{{ lesson.start_time }}</p>
            </div>
            <div class="flex flex-column">
              <p class="text-h6 font-weight-black black--text mb-0">
                Hora de finalización:
              </p>
              <p class="text-h6 font-weight-black">
                {{ lesson.end_time }}
              </p>
            </div>
          </div>
          <template v-if="isActiveLesson(lesson)">
            <div class="d-flex justify-end">
              <resource-button
                text-button="Materiales"
                icon-button="mdi-folder-open"
                color="success"
                :config-route="{
                  name: 'manage-students-materials',
                  params: { id: lesson.id }
                }"
                :disabled="!$hasPermission(PermissionEnum.SEE_LESSON_MATERIALS)"
              />
              <resource-button
                text-button="Grabaciones"
                icon-button="mdi-camera"
                color="success"
                :config-route="{
                  name: 'manage-students-recordings',
                  params: { id: lesson.id }
                }"
                :disabled="
                  !$hasPermission(PermissionEnum.SEE_LESSON_RECORDINGS)
                "
              />
              <resource-button
                v-if="$hasPermission(PermissionEnum.SEE_LESSON_PARTICIPANTS)"
                text-button="Asistentes"
                icon-button="mdi-account"
                color="success"
                :config-route="{
                  name: 'add-students',
                  params: { id: lesson.id }
                }"
                :disabled="true"
              />
            </div>
          </template>
          <template v-else>
            <div class="flex">
              <p class="">
                La clase no está activa. Una vez que se active podrás acceder a
                los materiales.
              </p>
            </div>
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
      import(/* webpackChunkName: "ResourceButton" */ './ResourceButton.vue')
  },
  props: {},
  data() {
    return {
      PermissionEnum,
      isOpen: false,
      lesson: {}
    }
  },
  methods: {
    open(lesson) {
      this.lesson = lesson
      this.isOpen = true
    },
    onClose() {
      this.isOpen = false
    },
    isActiveLesson(lesson) {
      return lesson.is_active === 1
    }
  }
}
</script>
