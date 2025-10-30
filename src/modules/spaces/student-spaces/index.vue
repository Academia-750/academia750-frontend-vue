<template>
  <v-card-text>
    <div>
      <LessonInfoModal ref="lessonInfoModal" :hide-materials="true" />
      <v-card v-if="!isMobile" flat>
        <v-card-text>
          <LessonToolBar>
            <template v-if="lesson" slot="info">
              <div class="d-flex align-center">
                <div class="text-bold mr-2">Espacio:</div>
                <span class="font-weight-bold subtitle-2">
                  {{ lesson.name }}
                </span>
              </div>
            </template>
            <template v-else slot="info">
              <div class="d-flex w-full justify-between">
                Selecciona un espacio
              </div>
            </template>
            <template v-if="lesson" slot="actions">
              <div class="d-flex align-center">
                <LessonJoinControl
                  :lesson="lesson"
                  :join="(id, value) => joinSpace(id, value)"
                  switch-id="joinSpace"
                  switch-class="mt-3"
                  :show-capacity="false"
                />

                <ResourceButton
                  color="success"
                  icon-button="mdi-information"
                  text-button="Información"
                  @click="openInfoModal(lesson)"
                />
              </div>
            </template>
          </LessonToolBar>
          <CalendarLessonsList
            ref="calendar"
            :loading="isLoading"
            :focus="date"
            :type="type"
            :events="events"
            :start-time="'08:00'"
            :end-time="'23:00'"
            @type="SET_TYPE"
            @date="onDate"
            @event="onSpace"
            @load="onLoad"
            @focus="SET_DATE"
          />
        </v-card-text>
      </v-card>
      <div v-else class="d-flex justify-center pt-2 pb-2 d-md-none">
        <MobileCalendar
          :loading="isLoading"
          :focus="date"
          :events="events"
          @load="onLoad"
          @focus="SET_DATE"
        >
          <template #actions="spaceEvent">
            <div class="d-flex align-center justify-end flex-fill">
              <v-icon
                class="px-2"
                color="success"
                @click.stop="onSpace(spaceEvent)"
              >
                mdi-information
              </v-icon>

              <!-- There are two different switch for desktop and mobile in this same page -->
              <LessonJoinControl
                :lesson="spaceEvent"
                :join="(id, value) => joinSpace(id, value)"
                switch-id="joinSpaceMobile"
              />
            </div>
          </template>
        </MobileCalendar>
      </div>
    </div>
  </v-card-text>
</template>

<script>
import notifications from '@/mixins/notifications'
import { mapState, mapMutations, mapActions } from 'vuex'
import moment from 'moment'
import { PermissionEnum } from '@/utils/enums'
import LessonRepository from '@/services/LessonRepository'
import Toast from '@/utils/toast'

export default {
  name: 'StudentSpaces',
  components: {
    CalendarLessonsList: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '@/modules/lessons/_common/calendar-lessons-list.vue'
      ),
    MobileCalendar: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '@/modules/lessons/_common/mobile-calendar-lessons-list.vue'
      ),
    LessonToolBar: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '@/modules/lessons/_common/lesson-tool-bar.vue'
      ),
    LessonJoinControl: () =>
      import(
        /* webpackChunkName: "LessonJoinControl" */ '@/modules/resources/components/resources/lesson-join-control.vue'
      ),
    LessonInfoModal: () =>
      import(
        /* webpackChunkName: "LessonInfoModal" */ '@/modules/resources/components/resources/lesson-info-modal.vue'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      reloadDatatableUsers: false,
      PermissionEnum,
      event: {},
      isLoading: false
    }
  },
  computed: {
    ...mapState('studentSpacesStore', ['lesson', 'lessons', 'date', 'type']),
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
          timed: false,
          will_join: item.will_join,
          max_students: item.max_students,
          student_count: item.student_count,
          will_join_count: item.will_join_count,
          date: item.date
        }
      })
    }
  },
  beforeCreate() {
    this?.$hasPermissionMiddleware(PermissionEnum.SEE_LESSONS)
  },

  methods: {
    ...mapMutations('studentSpacesStore', [
      'SET_DATE',
      'SET_TYPE',
      'SET_LESSONS'
    ]),
    ...mapActions('studentSpacesStore', ['setLesson', 'updateJoinLesson']),

    onDate() {
      this.setLesson(false)
    },
    onSpace(event) {
      const lesson = this.lessons.find((item) => item.id === event.id)

      if (!lesson) {
        return
      }
      this.openInfoModal(lesson)
      this.setLesson(lesson || false)
    },
    openInfoModal(lesson) {
      this.$refs.lessonInfoModal.open(lesson)
    },

    async onLoad({ start, end }) {
      this.isLoading = true // Show the loader while fetching spaces
      const params = {
        from: start,
        to: end,
        type: 'space' // Filter only space type lessons
      }

      try {
        const { results } = await LessonRepository.studentCalendar(params)

        const lessons = results

        this.SET_LESSONS(lessons)

        // We already have a current selected lesson in this month
        const alreadySelected = this.lessons.find(
          (lesson) => lesson.id === this.lesson.id
        )

        if (alreadySelected) {
          return
        }
        // Auto select the first next space or the last space if all are in the past
        const nextLesson =
          this.lessons.find(
            (lesson) => lesson.date > moment().format('YYYY-MM-DD')
          ) || this.lessons[this.lessons.length - 1]

        if (nextLesson) {
          this.setLesson(nextLesson)
          this.SET_DATE(nextLesson.date)
        }
      } catch (error) {
        // Handle any error that occurred during the request
        console.error('Error fetching spaces:', error)
      } finally {
        // Ensure that isLoading is set to false regardless of success or failure
        this.isLoading = false
      }
    },
    async joinSpace(lessonId, value) {
      const res = await LessonRepository.joinLesson(lessonId, value)

      if (!res) {
        return
      }
      const message = value
        ? 'Has confirmado tu asistencia al espacio.'
        : 'Has cancelado tu reserva del espacio.'

      Toast.success(message)
      // Refresh selected object
      this.updateJoinLesson({ lessonId, value })
    }
  },
  head: {
    title: {
      inner: 'Mis espacios'
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
