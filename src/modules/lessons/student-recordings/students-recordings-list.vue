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
              @click="openOtherTab(item)"
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
        <p class="pa-1">Preparando tu material...</p>
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showVideo" max-width="750px" @close="">
      <v-card class="d-flex flex-column justify-center align-center pa-2">
        <vimeo-player ref="player" :video-id="videoID" @ready="onReady" :player-height="height"></vimeo-player>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import LessonRepository from '@/services/LessonRepository'
import downloadFile from '@/utils/DownloadMaterial'

export default {
  name: 'StudentsRecordingsList',
  components: {
    StudentsMaterialsBase: () =>
      import(
        /* webpackChunkName: "StudentsMaterialsBase" */ '@/modules/lessons/_common/students-materials-base/students-materials-base.vue'
      )
  },
  data() {
    return {
      loading: false,
      showVideo: true,
      videoUrl: 'https://vimeo.com/845354256/b21addfd58?share=copy',
      player: null,
      videoID: '863336181',
			height: 500,
			options: {
				muted: true,
	      			autoplay: true
			},
			playerReady: false
    }
  },
  mounted() {
    
  },
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
    async getUrl(material) {
      this.loading = true

      const url = await LessonRepository.downloadStudentMaterial(
        material.material_id
      )

      this.loading = false

      return url
    },
    async download(material) {
      const url = await this.getUrl(material)

      if (!url) {
        return
      }
      const type = url.slice(
        (Math.max(0, url.lastIndexOf('.')) || Infinity) + 1
      )

      downloadFile(url, material.name, type)
    }
  }
}
</script>
