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

          <div class="d-flex justify-space-between mb-1">
            <div>
              <LessonJoinControl
                :lesson="lesson"
                :join="joinLesson"
                :can-join="true"
                switch-id="joinLesson"
                not-join-label="No Asistiré"
              />
              <template v-if="joiningNotOpenYet">
                <p class="mr-4">
                  Podrás confirmar tu asistencia a partir del
                  {{ formattedAllowJoiningFromDate }}
                </p>
              </template>
            </div>

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
                v-if="!hideMaterials"
                text-button="Materiales"
                icon-button="mdi-folder-open"
                color="success"
                :disabled="!$hasPermission(PermissionEnum.SEE_LESSON_MATERIALS)"
                @click="setLessonMaterial(lesson)"
              />
              <resource-button
                v-if="!hideMaterials"
                text-button="Grabaciones"
                icon-button="mdi-camera"
                color="success"
                :disabled="
                  !$hasPermission(PermissionEnum.SEE_LESSON_RECORDINGS)
                "
                @click="setLessonRecordings(lesson)"
              />
              <resource-button
                v-if="lesson.is_online"
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
  </v-row>
</template>
<script>
import { PermissionEnum } from '@/utils/enums'
import { mapMutations, mapActions } from 'vuex'
import LessonRepository from '@/services/LessonRepository'
import Toast from '@/utils/toast'
import moment from 'moment'

export default {
  name: 'LessonInfoModal',
  components: {
    ResourceButton: () =>
      import(/* webpackChunkName: "ResourceButton" */ './ResourceButton.vue'),
    LessonJoinControl: () =>
      import(
        /* webpackChunkName: "LessonJoinControl" */ './lesson-join-control.vue'
      )
  },
  props: {
    hideMaterials: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      PermissionEnum,
      isOpen: false,
      lesson: {}
    }
  },
  computed: {
    joiningNotOpenYet() {
      const d = this.lesson?.allow_joining_from_date

      return d && moment(d).isAfter(moment(), 'day')
    },
    formattedAllowJoiningFromDate() {
      const d = this.lesson?.allow_joining_from_date

      return d ? moment(d).format('YYYY-MM-DD') : ''
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
    async joinLesson(lessonId, value) {
      const res = await LessonRepository.joinLesson(lessonId, value)

      if (!res) {
        return
      }
      const messageSpace = value
        ? 'Has confirmado tu reserva de espacio.'
        : 'Has cancelado tu reserva del espacio.'

      const message = value
        ? 'Has confirmado tu asistencia a la clase.'
        : 'Has cancelado tu asistencia a la clase.'

      Toast.success(this.lesson.type === 'space' ? messageSpace : message)

      this.updateJoinLesson({ lessonId, value })
      this.lesson.will_join = value ? 1 : 0
      this.lesson.will_join_count = value
        ? this.lesson.will_join_count + 1
        : this.lesson.will_join_count - 1
    }
  }
}
</script>
