<template>
  <v-card-text>
    <LessonInfoModal ref="lessonInfoModal" />
    <div>
      <v-card flat>
        <v-card-text>
          <LessonToolBar v-show="!isMobile">
            <template v-if="lesson" slot="info">
              <div class="d-flex align-center">
                <div class="text-bold mr-2">Clase:</div>
                <span class="font-weight-bold subtitle-2">
                  {{ lesson.name }}
                </span>
              </div>

              <!-- Column for Time -->
              <div v-if="isActiveLesson(lesson)" class="d-flex px-2">
                <SwitchInput
                  id="joinLesson"
                  label="Asistir"
                  :value="hasJoinedLesson"
                  @click="joinLesson"
                />
              </div>
            </template>
            <template v-else slot="info">
              <div class="d-flex w-full justify-between">
                Selecciona o crea una clase
              </div>
            </template>
            <template v-if="lesson" slot="actions">
              <resource-button
                text-button="Información"
                icon-button="mdi-information-variant"
                color="success"
                @click="openInfoModal(lesson)"
              />
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
            </template>
          </LessonToolBar>
          <CalendarLessonsList
            :focus="date"
            :type="type"
            role="student"
            @type="SET_TYPE"
            @lesson="onLesson"
            @load="onLessonLoad"
            @focus="SET_DATE"
          />
        </v-card-text>
      </v-card>
    </div>
  </v-card-text>
</template>

<script>
import notifications from '@/mixins/notifications'
import { mapState, mapMutations, mapActions } from 'vuex'
import moment from 'moment'
import { PermissionEnum } from '@/utils/enums'
import DatatableManageStudents from '../../mixins/DatatableManageStudents'
import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'StudentsLessons',
  components: {
    CalendarLessonsList: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '../../../lessons/common/calendar-lessons-list.vue'
      ),
    LessonToolBar: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '../../../lessons/common/lesson-tool-bar.vue'
      ),

    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    SwitchInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/switch-input.vue'
      ),
    LessonInfoModal: () =>
      import(
        /* webpackChunkName: "LessonInfoModal" */ '@/modules/resources/components/resources/lesson-info-modal.vue'
      )
  },
  mixins: [DatatableManageStudents, notifications],
  data() {
    return {
      reloadDatatableUsers: false,
      hasJoinedLesson: false
    }
  },
  computed: {
    ...mapState('studentsService', ['lesson', 'date', 'type']),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  beforeCreate() {
    this?.$hasPermissionMiddleware(PermissionEnum.SEE_LESSONS)
  },
  mounted() {
    this.initialData()
    this.loadNotifications()
  },
  methods: {
    ...mapMutations('studentsService', ['SET_DATE', 'SET_TYPE']),
    ...mapActions('studentsService', ['setLesson']),
    dateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    isActiveLesson(lesson) {
      return lesson.is_active === 1
    },
    joinedLesson(value) {
      return value === 1
    },
    addLesson(date = undefined) {
      this.setLesson(false)
      this.$router.push({ name: 'create-lessons', query: { date } })
    },
    onLesson(lesson) {
      this.openInfoModal(lesson)
      this.setLesson(lesson || false)
      if (this.isMobile) {
        this.$router.push({ name: 'create-lessons' })
      }
    },
    openInfoModal(lesson) {
      this.$refs.lessonInfoModal.open(lesson)
    },
    onLessonLoad(lesson) {
      // Only on first load
      if (this.lesson) {
        return
      }
      this.hasJoinedLesson = Boolean(this.lesson.will_join)
      this.setLesson(lesson || false)
    },
    async joinLesson(value) {
      const res = LessonRepository.StudentJoinLesson(this.lesson.id, value)

      if (!res) {
        return
      }
      this.hasJoinedLesson = value
    }
  },
  head: {
    title: {
      inner: 'Mis lecciones'
    }
  }
}
</script>
<style lang="scss" scoped>
.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #cccccc;

  &.active {
    background-color: #66ff99;
  }
}
</style>
