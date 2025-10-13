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
          <div v-if="lesson.max_students" class="mb-4">
            <p class="text-h6 mb-0 font-weight-black black--text">
              Espacios disponibles:
            </p>
            <p class="text-h6 font-weight-black">
              {{
                lesson.available_spaces !== null
                  ? lesson.available_spaces + ' de ' + lesson.max_students
                  : 'Ilimitado'
              }}
            </p>
          </div>
          <div class="d-flex justify-space-between">
            <SwitchInput
              v-if="$hasPermission(PermissionEnum.JOIN_LESSONS)"
              id="joinLesson"
              :value="lesson.will_join === 1"
              :label="lesson.will_join === 1 ? 'Asistiré' : 'No Asistiré'"
              :disabled="!canJoinLesson"
              @click="(value) => handleJoinLesson(lesson.id, value)"
            />
            <resource-button
              v-if="$hasPermission(PermissionEnum.SEE_LESSON_PARTICIPANTS)"
              text-button="Asistentes"
              icon-button="mdi-account"
              color="success"
              :config-route="{
                name: 'manage-lesson-attendees',
                params: { id: lesson.id }
              }"
              @click="goAttendeesList(lesson)"
            />
          </div>
          <div class="d-flex justify-end">
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
              <resource-button
                text-button="Entrar Clase"
                icon-button="mdi-eye"
                color="success"
                :disabled="!$hasPermission(PermissionEnum.SEE_ONLINE_LESSON)"
                :config-route="{
                  name: 'join-online-class',
                  params: { id: lesson.id }
                }"
              />
            </template>
            <template v-else>
              <p class="">
                La clase no está activa. Una vez que se active podrás acceder a
                los materiales.
              </p>
            </template>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDialog" max-width="400">
      <v-card>
        <v-card-title class="headline">Confirmar asistencia</v-card-title>
        <v-card-text>
          Al confirmar tu asistencia, estás reservando un espacio en esta clase.
          Por favor, asegúrate de poder asistir antes de confirmar.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" text @click="confirmDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="primary" text @click="confirmJoin"> Confirmar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { PermissionEnum } from '@/utils/enums'
import { mapMutations, mapActions } from 'vuex'
import LessonRepository from '@/services/LessonRepository'
import Toast from '@/utils/toast'

export default {
  name: 'LessonInfoModal',
  components: {
    ResourceButton: () =>
      import(/* webpackChunkName: "ResourceButton" */ './ResourceButton.vue'),
    SwitchInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/switch-input.vue'
      )
  },
  props: {},
  data() {
    return {
      PermissionEnum,
      isOpen: false,
      lesson: {},
      confirmDialog: false,
      pendingJoinValue: false
    }
  },
  computed: {
    canJoinLesson() {
      // If trying to unjoin, always allow
      if (this.lesson.will_join === 1) {
        return this.lesson.can_join !== false
      }
      
      return (
        this.lesson.can_join !== false &&
        (this.lesson.is_full !== true || this.lesson.will_join === 1)
      )
    }
  },
  methods: {
    ...mapMutations('studentsMaterialsStore', ['SET_LESSONS']),
    ...mapMutations('studentsRecordingsStore', ['SET_LESSONS']),
    ...mapActions('studentLessonsStore', ['updateJoinLesson']),
    setLessonMaterial(lesson) {
      this.$store.dispatch('studentsLessonMaterialsStore/resetTableOptions')

      this.$store.commit('studentsLessonMaterialsStore/SET_LESSON', lesson)
      this.$store.commit('studentsLessonMaterialsStore/SET_TABLE_OPTIONS', {
        offset: 0
      })

      this.$router.push({
        name: 'student-lesson-materials',
        params: { id: lesson.id }
      })
    },
    setLessonRecordings(lesson) {
      this.$store.dispatch('studentsLessonRecordingsStore/resetTableOptions')

      this.$store.commit('studentsLessonRecordingsStore/SET_LESSON', lesson)
      this.$store.commit('studentsLessonRecordingsStore/SET_TABLE_OPTIONS', {
        offset: 0
      })

      this.$router.push({
        name: 'student-lesson-recordings',
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
    },
    goAttendeesList(lesson) {
      this.$store.dispatch('lessonAttendeesStore/resetTableOptions')
      this.$router.push({
        name: 'manage-lesson-attendees',
        params: { id: lesson.id }
      })
    },
    handleJoinLesson(lessonId, value) {
      // If trying to join, show confirmation dialog
      if (value) {
        this.pendingJoinValue = value
        this.confirmDialog = true
      } else {
        // If unjoining, do it directly
        this.joinLesson(lessonId, value)
      }
    },
    async confirmJoin() {
      this.confirmDialog = false
      await this.joinLesson(this.lesson.id, this.pendingJoinValue)
    },
    async joinLesson(lessonId, value) {
      const res = await LessonRepository.joinLesson(lessonId, value)

      if (!res) {
        return
      }

      if (value) {
        Toast.success('Has confirmado tu asistencia a la clase.')
      } else {
        Toast.info('Has cancelado tu asistencia a la clase.')
      }

      this.updateJoinLesson({ lessonId, value })
      this.lesson.will_join = value ? 1 : 0
    }
  }
}
</script>
