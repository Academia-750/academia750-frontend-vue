<template>
  <v-card-text>
    <div>
      <v-card flat>
        <v-card-text>
          <LessonToolBar v-show="!isMobile">
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
                {{ lesson.student_count }}
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
                :disabled="true"
              />
              <resource-button
                text-button="Alumnos"
                icon-button="mdi-account-group"
                color="success"
                :config-route="{ name: 'add-students', params: { id: lesson.id } }"
              />
            </template>
          </LessonToolBar>

          <CalendarLessonsList
            :focus="date"
            :type="type"
            @type="SET_TYPE"
            @lesson="onLesson"
            @load="onLessonLoad"
            @focus="SET_DATE"
          />
          <div class="d-flex justify-end my-2">
            <ResourceButtonAdd
              class="ml-16"
              text-button="Crear Clase"
              @click="addLesson"
            />
          </div>
        </v-card-text>
      </v-card>
    </div>
  </v-card-text>
</template>

<script>
import notifications from '@/mixins/notifications'
import { mapState, mapMutations } from 'vuex'
import moment from 'moment'

export default {
  name: 'CalendarLesson',
  components: {
    CalendarLessonsList: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '../common/calendar-lessons-list.vue'
      ),
    LessonToolBar: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '../common/lesson-tool-bar.vue'
      ),

    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      )
  },
  mixins: [notifications],
  data() {
    return {
      reloadDatatableUsers: false
    }
  },
  computed: {
    ...mapState('lessonsStore', ['lesson', 'date', 'type']),
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  mounted() {
    this.loadNotifications()
  },
  methods: {
    ...mapMutations('lessonsStore', ['SET_LESSON', 'SET_DATE', 'SET_TYPE']),
    dateFormat(date) {
      return moment(date).format('DD/MM/YYYY')
    },

    addLesson(date = undefined) {
      this.SET_LESSON(false)
      this.$router.push({ name: 'create-lessons', query: { date } })
    },
    onLesson(lesson) {
      this.SET_LESSON(lesson || false)
      if (this.isMobile) {
        this.$router.push({ name: 'create-lessons' })
      }
    },

    onLessonLoad(lesson) {
      // Only on first load
      if (this.lesson) {
        return
      }
      this.SET_LESSON(lesson || false)
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
