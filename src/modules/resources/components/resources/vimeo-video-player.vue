<template>
  <v-dialog v-model="showVideo" max-width="700px">
    <v-card
      class="d-flex flex-column justify-center align-center pa-1"
      :min-height="isMobile ? '220px' : '450px'"
    >
      <div v-show="url && !playerLoaded">Cargando el video...</div>
      <div v-if="url && !error">
        <vimeo-player
          ref="player"
          :video-url="url"
          :player-height="height"
          :responsive="true"
          class="vimeo"
          @loaded="onLoaded"
          @error="onError"
        ></vimeo-player>
      </div>
      <div v-else>
        {{ error }}
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
      playerLoaded: false,
      error: ''
    }
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown
    }
  },
  watch: {
    showVideo(show) {
      // Clean the modal when is closed
      if (!show) {
        this.reset()
      }
    }
  },
  methods: {
    open(url) {
      this.reset()
      this.url = url
      this.showVideo = true
    },
    reset() {
      this.url = ''
      this.playerLoaded = false
      this.showVideo = false
      this.error = ''
    },
    onLoaded() {
      this.playerLoaded = true
    },
    onError(error) {
      const defaultError =
        'No se pudo cargar este video, contacte con el administrador'

      this.error = error.message
        ? `Error del video: ${error.message}`
        : defaultError

      this.playerLoaded = true
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
