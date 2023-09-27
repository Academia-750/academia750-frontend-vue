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
          <div class="d-flex justify-between">
            <template v-if="isActiveLesson(lesson)">
              <resource-button
                text-button="Materiales"
                icon-button="mdi-folder-open"
                color="success"
                :disabled="!$hasPermission(PermissionEnum.SEE_LESSON_MATERIALS)"
                @click="setLessonMaterial(lesson)"
              />
              <resource-button
                text-button="Grabaciones"
                icon-button="mdi-camera"
                color="success"
                :disabled="
                  !$hasPermission(PermissionEnum.SEE_LESSON_RECORDINGS)
                "
                @click="setLessonRecordings(lesson)"
              />
            </template>
            <template v-else>
              <p class="">
                La clase no está activa. Una vez que se active podrás acceder a
                los materiales.
              </p>
            </template>
            <resource-button
              v-if="$hasPermission(PermissionEnum.SEE_LESSON_PARTICIPANTS)"
              text-button="Asistentes"
              icon-button="mdi-account"
              color="success"
              :config-route="{
                name: 'manage-lesson-attendees',
                params: { id: lesson.id }
              }"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { PermissionEnum } from '@/utils/enums'
import { mapMutations } from 'vuex'

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
    ...mapMutations('studentsMaterialsStore', ['SET_LESSONS']),
    ...mapMutations('studentsRecordingsStore', ['SET_LESSONS']),
    setLessonMaterial(lesson) {
      this.$store.commit('studentsMaterialsStore/SET_LESSONS', [lesson.id])
      this.$store.commit('studentsMaterialsStore/SET_TABLE_OPTIONS', {
        offset: 0
      })

      this.$router.push({
        name: 'manage-students-materials',
        params: { id: lesson.id }
      })
    },
    setLessonRecordings(lesson) {
      this.$store.commit('studentsRecordingsStore/SET_LESSONS', [lesson.id])
      this.$store.commit('studentsRecordingsStore/SET_TABLE_OPTIONS', {
        offset: 0
      })

      this.$router.push({
        name: 'manage-students-recordings',
        params: { id: lesson.id }
      })
    },
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
