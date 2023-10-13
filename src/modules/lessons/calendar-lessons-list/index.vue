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

                <!-- Column for Student Count -->
                <div>
                  <span class="font-weight-bold subtitle-2">
                    No. de alumnos:
                  </span>
                  {{ lesson.student_count || 0 }}
                </div>
              </template>
              <template v-else slot="info">
                <div class="d-flex w-full justify-between">
                  Selecciona o crea una clase
                </div>
                <ResourceButtonAdd
                  class="ml-16"
                  text-button="Crear Clase"
                  @click="addLesson(date)"
                />
              </template>
              <template v-if="lesson" slot="actions">
                <resource-button
                  text-button="Editar"
                  icon-button="mdi-pencil"
                  color="primary"
                  @click="$router.push({ name: 'create-lessons' })"
                />
                <resource-button
                  text-button="Materiales"
                  icon-button="mdi-folder-open"
                  color="success"
                  :config-route="{
                    name: 'list-of-materials',
                    params: { id: lesson.id }
                  }"
                />
                <resource-button
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
              :focus="date"
              :type="type"
              :events="events"
              :loading="isLoading"
              @type="SET_TYPE"
              @date="onDate"
              @event="onLesson"
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
            :focus="date"
            :events="events"
            @load="onLoad"
            @focus="SET_DATE"
          >
            <template #actions="event">
              <div class="d-flex justify-end flex-fill">
                <v-icon class="px-2" color="info" @click="editEvent(event)">
                  mdi-pencil
                </v-icon>
              </div>
            </template>
          </MobileCalendar>
        </div>
      </template>
      <div class="d-flex justify-end my-2">
        <ResourceButtonAdd
          class="ml-16"
          text-button="Crear Clase"
          @click="addLesson"
        />
      </div>
    </div>
  </v-card-text>
</template>

<script>
import notifications from '@/mixins/notifications'
import { mapState, mapMutations, mapActions } from 'vuex'
import moment from 'moment'
import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'CalendarLesson',
  components: {
    CalendarLessonsList: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '../_common/calendar-lessons-list.vue'
      ),
    LessonToolBar: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '../_common/lesson-tool-bar.vue'
      ),

    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      ),
    MobileCalendar: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '../_common/mobile-calendar-lessons-list.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      reloadDatatableUsers: false,
      lessons: [],
      isLoading: false
    }
  },
  computed: {
    ...mapState('lessonsStore', ['lesson', 'date', 'type']),
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
    this?.$hasRoleMiddleware('admin')
  },

  methods: {
    ...mapMutations('lessonsStore', ['SET_DATE', 'SET_TYPE']),
    ...mapActions('lessonsStore', ['setLesson']),
    dateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    editEvent(event) {
      const lesson = this.lessons.find((item) => item.id === event.id)

      if (!lesson) {
        return
      }

      this.setLesson(lesson)
      this.$router.push({ name: 'create-lessons' })
    },
    addLesson(date = undefined) {
      this.setLesson(false)
      this.$router.push({ name: 'create-lessons', query: { date } })
    },
    onDate() {
      this.setLesson(false)
    },
    onLesson(event) {
      const lesson = this.lessons.find((item) => item.id === event.id)

      if (!lesson) {
        return
      }

      this.setLesson(lesson || false)
      if (this.isMobile) {
        this.$router.push({ name: 'create-lessons' })
      }
    },

    async onLoad({ start, end }) {
      this.isLoading = true // Show the loader while fetching lessons
      const params = {
        from: start,
        to: end
      }

      const { results } = await LessonRepository.calendar(params)

      this.lessons = results
      this.isLoading = false

      // We already have a current selected lesson in this month
      const alreadySelected = this.lessons.find(
        (lesson) => lesson.id === this.lesson.id
      )

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
    }
  },
  head: {
    title: {
      inner: 'Gestionar Clases'
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
