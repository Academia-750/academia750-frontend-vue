<template>
  <v-card-text>
    <div>
      <v-card flat>
        <v-card-text>
          <LessonToolBar>
            <template slot="info">
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
                {{ lesson.date }}
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
            <template slot="actions">
              <resource-button-edit
                :config-route="{ name: 'create-lessons' }"
              />
              <resource-button-edit
                text-button="Materiales"
                :config-route="{}"
                :only-dispatch-click-event="true"
              />
              <resource-button-edit
                text-button="Alumnos"
                :config-route="{}"
                icon-button=""
                :only-dispatch-click-event="true"
              />
            </template>
          </LessonToolBar>
          <CalendarLessonsList />
        </v-card-text>
      </v-card>
    </div>
  </v-card-text>
</template>

<script>
import notifications from '@/mixins/notifications'
import { mapState } from 'vuex'
export default {
  name: 'CalendarLesson',
  components: {
    CalendarLessonsList: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ './components/calendar-lessons-list.vue'
      ),
    LessonToolBar: () =>
      import(
        /* webpackChunkName: "CalendarLessonsList" */ '../common/lesson-tool-bar.vue'
      ),

    ResourceButtonEdit: () =>
      import(
        /* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'
      )
  },
  mixins: [notifications],
  data() {
    return {
      reloadDatatableUsers: false
    }
  },
  computed: {
    ...mapState('lessonsStore', ['lesson'])
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  mounted() {
    this.loadNotifications()
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
