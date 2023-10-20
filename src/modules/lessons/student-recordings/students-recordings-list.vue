<template>
  <div>
    <StudentsMaterialsBase
      ref="recordingsList"
      :title="`Grabaciones de clase ${lesson ? lesson.name : ''}`"
      store-name="studentsRecordingsStore"
      type="recording"
      :loading="loading"
    >
      <template v-slot:actions="item">
        <div
          v-if="item.has_url"
          class="d-flex justify-space-between align-center"
        >
          <div>
            <v-icon
              class="cursor-pointer"
              color="primary"
              @click="openVideo(item)"
            >
              mdi-camera
            </v-icon>
          </div>
          <div></div>
        </div>
      </template>
    </StudentsMaterialsBase>
    <v-dialog v-model="loading" width="auto">
      <v-card class="d-flex flex-column justify-center align-center pa-8">
        <p class="pa-1">Preparando tu video...</p>
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-card>
    </v-dialog>
    <VimeoVideoPlayer ref="video" />
  </div>
</template>
<script>
import LessonRepository from '@/services/LessonRepository'
import { mapState } from 'vuex'

export default {
  name: 'StudentsRecordingsList',
  components: {
    StudentsMaterialsBase: () =>
      import(
        /* webpackChunkName: "StudentsMaterialsBase" */ '@/modules/lessons/_common/students-materials-base/students-materials-base.vue'
      ),
    VimeoVideoPlayer: () =>
      import(
        /* webpackChunkName: "VimeoVideoPlayer" */ '@/modules/resources/components/resources/vimeo-video-player.vue'
      )
  },
  data() {
    return {
      loading: false,
      lesson: false
    }
  },
  computed: {
  },
  mounted() {
    this.getLessonInfo()
  },
  methods: {
    async getUrl(material) {
      this.loading = true

      const url = await LessonRepository.downloadStudentMaterial(
        material.material_id
      )

      this.loading = false

      return url
    },
    async openVideo(material) {
      const url = await this.getUrl(material)

      if (!url) {
        return
      }
      this.$refs.video.open(url)
    },
    async getLessonInfo() {
      const lessonId = this.$route.params.id || undefined

      if (lessonId === undefined) {
        return
      }
      this.lesson = await LessonRepository.info(lessonId)
    }
  }
}
</script>
