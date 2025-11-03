<template>
  <v-card-text>
    <div>
      <template v-if="!isMobile">
        <v-card flat>
          <v-card-text>
            <LessonToolBar>
              <template v-if="lesson" slot="info">
                <div class="d-flex align-center">
                  <div
                    :class="'mr-1 circle ' + (lesson.is_active ? 'active' : '')"
                  />
                  <span class="font-weight-bold subtitle-2">
                    {{ lesson.name }}
                  </span>
                </div>

                <!-- Column for Date -->
                <div>
                  <span class="font-weight-bold subtitle-2">Fecha: </span>
                  {{ dateFormat(lesson.date) }}
                </div>

                <!-- Column for Time -->
                <div>
                  <span class="font-weight-bold subtitle-2">Hora: </span>
                  {{ `${lesson.start_time} - ${lesson.end_time}` }}
                </div>

                <!-- Column for Max Students (specific to spaces) -->
                <div v-if="lesson.max_students">
                  <span class="font-weight-bold subtitle-2"> Asistencia: </span>
                  {{ lesson.max_students - lesson.will_join_count }} plazas
                  libres de {{ lesson.max_students }} espacios
                </div>
              </template>
              <template v-else slot="info">
                <div class="d-flex w-full justify-between">
                  Selecciona un espacio
                </div>
              </template>
              <template v-if="lesson" slot="actions">
                <resource-button
                  v-if="$hasRoles('admin')"
                  text-button="Editar"
                  icon-button="mdi-pencil"
                  color="primary"
                  @click="
                    $router.push({
                      name: 'create-lessons',
                      query: { store: 'spacesStore' }
                    })
                  "
                />
                <resource-button
                  v-if="
                    $hasRolesOrPermissions(
                      ['admin'],
                      [PermissionEnum.UPDATE_LESSON_STUDENTS]
                    )
                  "
                  text-button="Alumnos"
                  icon-button="mdi-account-group"
                  color="success"
                  :config-route="{
                    name: 'add-students',
                    params: { id: lesson.id }
                  }"
                />
              </template>
            </LessonToolBar>
            <CalendarLessonsList
              :focus="date || new Date().toISOString().substr(0, 10)"
              :type="type || 'month'"
              :events="events"
              :loading="isLoading"
              :start-time="'08:00'"
              :end-time="'23:00'"
              @type="SET_TYPE"
              @date="onDate"
              @event="viewEvent"
              @load="onLoad"
              @focus="SET_DATE"
            >
            </CalendarLessonsList>
          </v-card-text>
        </v-card>
      </template>
      <template v-else>
        <div class="d-flex justify-center mt-2 mb-2">
          <MobileCalendar
            :loading="isLoading"
            :focus="date || new Date().toISOString().substr(0, 10)"
            :events="events"
            @load="onLoad"
            @focus="SET_DATE"
          >
            <template #actions="event">
              <div class="d-flex justify-end flex-fill">
                <v-icon
                  v-if="$hasRoles('admin')"
                  class="px-2"
                  color="primary"
                  @click="editEvent(event)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon class="px-2" color="info" @click="viewEvent(event)">
                  mdi-eye
                </v-icon>
              </div>
            </template>
          </MobileCalendar>
        </div>
      </template>
    </div>
  </v-card-text>
</template>

<script>
import notifications from '@/mixins/notifications'
import { mapState, mapMutations, mapActions } from 'vuex'
import moment from 'moment'
import LessonRepository from '@/services/LessonRepository'
import { PermissionEnum } from '@/utils/enums'

export default {
  name: 'SpacesManagement',
  components: {
    CalendarLessonsList: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '@/modules/lessons/_common/calendar-lessons-list.vue'
      ),
    LessonToolBar: () =>
      import(
        /* webpackChunkName: "LessonToolBar" */ '@/modules/lessons/_common/lesson-tool-bar.vue'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    MobileCalendar: () =>
      import(
        /* webpackChunkName: "MobileCalendar" */ '@/modules/lessons/_common/mobile-calendar-lessons-list.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      PermissionEnum,
      reloadDatatableUsers: false,
      lessons: [],
      isLoading: false
    }
  },
  computed: {
    ...mapState('spacesStore', ['lesson', 'date', 'type']),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    },
    events() {
      return this.lessons.map((item) => {
        return {
          id: item.id,
          name: item.name,
          start: item.date + ' ' + item.start_time,
          end: item.date + ' ' + item.end_time,
          color: item.color || '#cccccc',
          timed: false
        }
      })
    }
  },
  beforeCreate() {
    this?.$hasRoleOrPermissionsMiddleware(
      'admin',
      PermissionEnum.SEE_LESSONS_AS_MANAGER
    )
  },

  methods: {
    ...mapMutations('spacesStore', ['SET_DATE', 'SET_TYPE']),
    ...mapActions('spacesStore', ['setLesson']),
    dateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    viewEvent(event) {
      const lesson = this.lessons.find((item) => item.id === event.id)

      if (!lesson) {
        return
      }

      this.setLesson(lesson)
    },
    editEvent(event) {
      const lesson = this.lessons.find((item) => item.id === event.id)

      if (!lesson) {
        return
      }

      this.setLesson(lesson)
      this.$router.push({
        name: 'create-lessons',
        query: { store: 'spacesStore' }
      })
    },
    onDate() {
      this.setLesson(false)
    },
    onLoad({ start, end }) {
      this.isLoading = true // Show the loader while fetching lessons
      const params = {
        from: start,
        to: end,
        type: 'space' // Only fetch space type lessons
      }

      LessonRepository.calendar(params).then(({ results }) => {
        this.lessons = results
        this.isLoading = false

        // We already have a current selected lesson in this month
        const alreadySelected =
          this.lesson &&
          this.lessons.find((lesson) => lesson.id === this.lesson.id)

        if (alreadySelected) {
          return
        }
        // Auto select the first next lesson or the last lesson if all is in the past
        const nextLesson =
          this.lessons.filter(
            (lesson) => lesson.date > moment().format('YYYY-MM-DD')
          )[0] || [...this.lessons].pop()

        if (nextLesson) {
          this.setLesson(nextLesson)
          this.SET_DATE(nextLesson.date)
          this.loading = false
        }
      })
    }
  },
  head: {
    title: {
      inner: 'Gestión de Espacios'
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
