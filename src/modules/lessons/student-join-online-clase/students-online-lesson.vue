<template>
  <div v-if="lesson">
    <Toolbar :title="`Clase ${lesson.name}`"> </Toolbar>

    <v-spacer></v-spacer>
    <v-card v-if="!meetingId" style="height: 75vh; padding-top: 20px">
      <section
        style="height: 75vh; padding-top: 20px"
        class="d-flex align-center justify-center pa-3"
      >
        En enlace a la clase online no es correcto. Por favor contacte con el
        administrador.
      </section>
    </v-card>
    <v-card v-else style="min-height: 50vh; padding-top: 20px">
      <!-- Count down -->
      <section
        v-if="classNotStarted"
        class="d-flex flex-column justify-center align-center"
        style="height: 50vh"
      >
        <h1 class="ma-6">
          Tu siguiente clase online será <b>{{ lesson.name }}</b>
          el día
          {{ $formatDate(startDate) }}. Faltan...
        </h1>
        <div class="counter d-flex justify-between rounded-sm font-weight-bold">
          <CounterLabel :value="countdown.days" label="Días" />
          <CounterLabel :value="countdown.hours" label="Horas" />
          <CounterLabel :value="countdown.minutes" label="Minutos" />
          <CounterLabel :value="countdown.seconds" label="Segundos" />
        </div>
      </section>

      <!-- class ended message -->
      <section
        v-else-if="classEnded"
        class="d-flex flex-column justify-center align-center"
        style="height: 50vh"
      >
        <h3 class="ma-6">La clase online ya ha terminado.</h3>
      </section>

      <!-- Zoom component -->
      <section v-else-if="classOngoing" class="d-flex flex-column align-start">
        <iframe
          ref="zoomIframe"
          allow="microphone; camera"
          style="border: 0; height: 60vh; width: 100%"
          :src="zoomUrl"
          frameborder="0"
          allowfullscreen
        />
      </section>
      <section
        v-else
        class="d-flex flex-column align-start"
        style="height: 50vh"
      ></section>
      <section class="pa-4">
        <span v-if="materials.length"> Materiales: </span>
        <div class="d-flex w-full">
          <div class="d-flex materials_list w-auto">
            <div v-for="(item, index) in materials" :key="index" class="d-flex">
              <v-card>
                <v-list-item three-line>
                  <v-list-item-content class="pt-2">
                    <v-list-item-title>{{ item.name }}</v-list-item-title>
                    <div class="d-flex material_item">
                      <v-list-item-subtitle>
                        {{ materialType[item.type] }}
                      </v-list-item-subtitle>
                      <v-list-item-subtitle>
                        <div
                          v-if="item.has_url"
                          class="d-flex justify-end align-center"
                        >
                          <div v-if="item.type === 'material'">
                            <v-icon
                              class="cursor-pointer pr-3 pr-md-1"
                              color="primary"
                              @click="download(item)"
                            >
                              mdi-cloud-download
                            </v-icon>
                          </div>
                          <div v-if="item.type === 'recording'">
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
                      </v-list-item-subtitle>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </div>
          </div>
        </div>
      </section>
    </v-card>
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
    <VimeoVideoPlayer ref="video" />
  </div>
</template>
<script>
import _ from 'lodash'
import Toast from '@/utils/toast'
import LessonRepository from '@/services/LessonRepository'
import CounterLabel from './components/counter-label.vue'
import downloadFile from '@/utils/DownloadMaterial'

const MINUTE = 1000 * 60
let interval

export default {
  name: 'StudentsOnlineLesson',
  components: {
    CounterLabel,
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
      ),
    VimeoVideoPlayer: () =>
      import(
        /* webpackChunkName: "VimeoVideoPlayer" */ '@/modules/resources/components/resources/vimeo-video-player.vue'
      )
  },
  data() {
    return {
      lesson: undefined,
      meetingId: '',
      countdown: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      startDate: '',
      endDate: '',
      classEnded: false,
      classOngoing: false,
      classNotStarted: false,
      materials: [],
      loading: false,
      materialType: {
        recording: 'Grabación',
        material: 'Material'
      }
    }
  },
  computed: {
    zoomUrl() {
      if (!this.meetingId) {
        return ''
      }

      return `https://app.zoom.us/wc/${this.meetingId}/join`
    }
  },
  watch: {},
  async mounted() {
    await this.lessonInfo()
    this.startCountdown()
    // Call updateCountdown every second
    this.setTimeInterval()
  },
  unmount() {
    this.stopInterval()
  },

  methods: {
    stopInterval() {
      interval && deleteInterval(interval)
    },
    setTimeInterval() {
      setInterval(this.updateCountdown, 1000)
    },
    startCountdown() {
      const now = new Date()
      const timeDifference = this.startDate - now

      if (timeDifference > 0) {
        this.updateCountdown(timeDifference)
      }
    },
    isCountdownValid(countdown) {
      return (
        countdown.days > 0 ||
        countdown.hours > 0 ||
        countdown.minutes > 0 ||
        countdown.seconds > 0
      )
    },
    updateCountdown() {
      const now = new Date()
      const timeDifference = this.startDate - now
      const endTimeDifference = this.endDate - now

      // We open the class 30 minutes before the starting time
      // Until 15 minutes after the ending time
      if (
        timeDifference <= 30 * MINUTE &&
        endTimeDifference + 15 * MINUTE >= 0
      ) {
        this.classNotStarted = false
        this.classOngoing = true
        this.classEnded = false

        return
      }

      // We consider the class over 15 minutes after the ending time
      if (endTimeDifference + 15 * MINUTE <= 0) {
        this.classEnded = true
        this.classOngoing = false

        return
      }

      // Last scenario is the class is not started yet: we run the countdown
      this.classNotStarted = true
      let secondsRemaining = Math.floor(timeDifference / 1000)

      this.countdown.days = Math.floor(secondsRemaining / 86400)
      secondsRemaining %= 86400
      this.countdown.hours = Math.floor(secondsRemaining / 3600)
      secondsRemaining %= 3600
      this.countdown.minutes = Math.floor(secondsRemaining / 60)
      this.countdown.seconds = secondsRemaining % 60
    },
    async lessonInfo() {
      const LessonInfo = this.$route.params.id
      const res = await LessonRepository.info(LessonInfo)

      if (!res) {
        return
      }
      const paramsForMaterial = {
        lessons: [res.id],
        type: 'material',
        limit: 50
      }

      const paramsForRecordings = {
        lessons: [res.id],
        type: 'recording',
        limit: 50
      }

      const lessonMaterials = await LessonRepository.studentsMaterialList(
        paramsForMaterial
      )
      const lessonRecordings = await LessonRepository.studentsMaterialList(
        paramsForRecordings
      )

      // Assuming lessonMaterials.results and lessonRecordings.results are arrays
      this.materials = [
        ...lessonMaterials.results,
        ...lessonRecordings.results
      ].sort((a, b) => a.name - b.name)
      if (!res.is_active) {
        Toast.error('Esta clase aún no está activa')
        this.$router.replace({
          name: 'my-lessons'
        })
      }

      if (res.is_online) {
        const regexPattern = /\/j\/(\d+)/
        // Use RegExp.exec() to find the match
        const [, meetingId] = regexPattern.exec(res.url) || []

        this.meetingId = meetingId
      }

      this.lesson = res
      this.startDate = new Date(`${this.lesson.date} ${this.lesson.start_time}`)
      this.endDate = new Date(`${this.lesson.date} ${this.lesson.end_time}`)
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
    },
    async openOtherTab(material) {
      const url = await this.getUrl(material)

      if (!url) {
        return
      }
      window.open(url, '_blank')
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
      this.$refs.video.open(url)
    }
  }
}
</script>
<style scoped>
.v-list-item__content {
  padding: 4px 0;
}
.v-list-item {
  display: block;
}
.material_item {
  padding-top: 4px;
  justify-content: center;
  align-items: center;
}
.materials_list {
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  gap: 10px;
  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
}

.materials_list > div {
  flex: 0 0 auto;
  min-width: 120px; /* Adjust this as needed for your design */
}
</style>
