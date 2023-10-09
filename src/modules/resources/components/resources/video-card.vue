<template>
  <v-dialog v-model="showVideo" max-width="700px">
    <v-card
      class="d-flex flex-column justify-center align-center pa-1"
      min-height="450px"
    >
      <div v-if="videoID">
        <vimeo-player
          ref="player"
          :video-id="videoID"
          :player-height="height"
          :controls="false"
          :autoplay="true"
          :loop="true"
          :responsive="true"
          class="vimeo"
          @click="onClick"
          @ready="onReady"
        ></vimeo-player>
        <div class="d-flex justify-center">
          <ResourceButtonAdd
            icon-button="mdi-fullscreen"
            text-button="Pantalla Completa"
            @click="onFullScreen"
          />
        </div>
      </div>
      <div v-else>
        No se pudo cargar este video, contacte con el administrador
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'VimeoVideoPlayer',
  components: {
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      )
  },
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
      playerReady: false
    }
  },
  computed: {
    videoID() {
      const match = this.url.match(/\/(\d+)$/)

      return match?.[1]
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
    onFullScreen() {
      const { element } = this.$refs.player.player

      const requestMethod =
        element.requestFullScreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullScreen

      if (!requestMethod) {
        console.warn('requestMethod: element is undefined')

        return
      }
      requestMethod.call(element)
    }
  }
}
</script>
<style lang="scss" scoped>
.vimeo {
  .embed-container {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
  }

  .embed-container iframe,
  .embed-container object,
  .embed-container embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
