<template>
  <v-dialog v-model="showVideo" max-width="700px">
    <v-card
      class="d-flex flex-column justify-center align-center pa-1"
      :min-height="isMobile ? '220px' : '450px'"
    >
      <div v-if="videoID && !error">
        <vimeo-player
          ref="player"
          :video-id="videoID"
          :player-height="height"
          :responsive="true"
          class="vimeo"
          @ready="onReady"
          @error="onError"
        ></vimeo-player>
      </div>
      <div v-else>
        <div v-if="videoID && !playerReady">Cargando el video...</div>
        <div v-else>
          {{
            error ||
            'No se pudo cargar este video, contacte con el administrador'
          }}
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'VimeoVideoPlayer',
  components: {},
  props: {
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      url: '',
      showVideo: false,
      playerReady: false,
      error: ''
    }
  },
  computed: {
    videoID() {
      const match = this.url.match(/\/(\d+)$/)

      return match?.[1]
    },
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    open(url) {
      this.url = url
      this.playerReady = false
      this.showVideo = true
    },
    onReady() {
      this.playerReady = true
    },
    onError(error) {
      this.error = error
      this.playerReady = true
    }
  }
}
</script>
<style lang="scss">
.vimeo {
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;

  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
