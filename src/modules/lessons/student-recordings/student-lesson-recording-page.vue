<template>
  <StudentsRecordingsList
    v-if="lesson"
    store-name="studentsLessonRecordingsStore"
  />
</template>

<script>
import notifications from '@/mixins/notifications'
import { PermissionEnum } from '@/utils/enums'
import { mapState, mapMutations } from 'vuex'
import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'StudentsRecordings',
  components: {
    StudentsRecordingsList: () =>
      import(
        /* webpackChunkName: "StudentsRecordingsList" */ './students-recordings-list.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      reloadDatatableUsers: false
    }
  },
  computed: {
    ...mapState('studentsLessonRecordingsStore', ['lesson']),
    lessonId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.loadNotifications()

    this.loadLesson()
  },
  beforeCreate() {
    this.$hasPermissionMiddleware(PermissionEnum.SEE_LESSONS)
    this.$hasPermissionMiddleware(PermissionEnum.SEE_LESSON_MATERIALS)
  },
  methods: {
    ...mapMutations('studentsLessonRecordingsStore', ['SET_LESSON']),

    async loadLesson() {
      // Already loaded on the reducer
      if (this.lesson && this.lesson.id === this.lessonId) {
        return
      }

      const lesson = await LessonRepository.getStudentLesson(this.lessonId)

      if (!lesson) {
        return
      }

      this.SET_LESSON(lesson)
    }
  },
  head: {
    title: {
      inner: 'Grabaciones de clase'
    }
  }
}
</script>
