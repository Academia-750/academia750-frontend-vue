<template>
  <v-card-text>
    <LessonInfoModal
      ref="lessonInfoModal"
    />
    <div>
      <v-card flat>
        <v-card-text>
          <LessonToolBar v-show="!isMobile">
            <template v-if="lesson" slot="info">
              <div class="">
                My lessons
              </div>
              <div class="d-flex align-center">
                <div class="text-bold mr-2">
                  Lesson:
                </div>
                <span class="font-weight-bold subtitle-2">
                  {{ lesson.name }}
                </span>
              </div>
  
              <!-- Column for Time -->
              <div>
                <SwitchInput
                  id="permissions"
                  :value="true"
                  @click=""
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
                text-button="More infromation"
                icon-button="mdi-information-variant"
                color="success"
                :config-route="{
                  name: 'list-of-materials',
                  params: { id: lesson.id }
                }"
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
                text-button="recordings"
                icon-button="mdi-camera"
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
    mixins: [DatatableManageStudents,notifications],
    data() {
      return {
        reloadDatatableUsers: false
      }
    },
    computed: {
      ...mapState('studentsService', ['lesson', 'date', 'type']),
      isMobile() {
        return this.$vuetify.breakpoint.smAndDown
      }
    },
    beforeCreate() {
    this?.$hasPermissionMiddleware(PermissionEnum.GENERATE_TESTS)
    },
    mounted() {
      this.loadNotifications()
    },
    methods: {
      ...mapMutations('studentsService', ['SET_DATE', 'SET_TYPE']),
      ...mapActions('studentsService', ['setLesson']),
      dateFormat(date) {
        return moment(date).format('DD/MM/YYYY')
      },
  
      addLesson(date = undefined) {
        this.setLesson(false)
        this.$router.push({ name: 'create-lessons', query: { date } })
      },
      onLesson(lesson) {
        this.$refs.lessonInfoModal.open(lesson)
        this.setLesson(lesson || false)
        if (this.isMobile) {
          this.$router.push({ name: 'create-lessons' })
        }
      },
  
      onLessonLoad(lesson) {
        // Only on first load
        if (this.lesson) {
          return
        }
        this.setLesson(lesson || false)
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
