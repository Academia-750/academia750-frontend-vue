<template>
  <v-card class="d-flex flex-column justify-center align-center pa-2">
    <vimeo-player ref="player" :video-id="videoID" :player-height="height" @ready="onReady"></vimeo-player>
  </v-card>
</template>
<script>
export default {
  name: 'VimeoVideoPlayer',
  props:{
    videoID: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
			playerReady: false
    }
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
		}
  }
}
</script>