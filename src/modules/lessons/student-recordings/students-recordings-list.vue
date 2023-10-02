<template>
  <div>
    <StudentsMaterialsBase
      ref="recordingsList"
      title="Grabaciones de Clase"
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
              mdi-eye
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
    <v-dialog v-model="showVideo" max-width="700px" @close="">
      <VimeoVideoPlayer :video-i-d="videoID"/>
    </v-dialog>
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
        /* webpackChunkName: "VimeoVideoPlayer" */ '@/modules/resources/components/resources/video-card.vue'
    )
  },
  data() {
    return {
      loading: false,
      showVideo: false,
      player: null,
      videoID: '',
			height: 400,
			playerReady: false
    }
  },
  mounted() {},
  methods: {
    onReady () {
			this.playerReady = true
		},
		play () {
			this.$refs.player.play()
		},
		pause () {
			this.$refs.player.pause()
		},
    getVimeoVideoId(url) {
      const match = url.match(/\/(\d+)$/)

      if (match) {
        return match[1]
      }

      return null
    },
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

      this.videoID = this.getVimeoVideoId(url)
      this.showVideo = true
    }
  }
}
</script>
