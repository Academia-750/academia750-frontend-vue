<template>
  <StudentsMaterialsList
    v-if="lesson"
    store-name="studentsLessonMaterialsStore"
  />
</template>

<script>
import notifications from '@/mixins/notifications'
import { PermissionEnum } from '@/utils/enums'
import LessonRepository from '@/services/LessonRepository'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'StudentsMaterials',
  components: {
    StudentsMaterialsList: () =>
      import(
        /* webpackChunkName: "StudentsMaterialsList" */ './students-materials-list.vue'
      )
  },
  mixins: [notifications],
  computed: {
    ...mapState('studentsLessonMaterialsStore', ['lesson']),
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
    ...mapMutations('studentsLessonMaterialsStore', ['SET_LESSON']),

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
      inner: 'Materiales de clase'
    }
  }
}
</script>
