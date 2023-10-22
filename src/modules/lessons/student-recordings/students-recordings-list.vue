<template>
  <div>
    <StudentsMaterialsBase
      ref="recordingsList"
      :title="`Grabaciones de clase ${lesson ? lesson.name : ''}`"
      :store-name="storeName"
      type="recording"
      icon="mdi-camera"
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
  props: {
    storeName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    lesson() {
      return this.$store.state[this.storeName].lesson
    }
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
    }
  }
}
</script>
