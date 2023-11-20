<template>
  <div v-if="lesson">
    <Toolbar :title="`Clase ${lesson.name}`"> </Toolbar>

    <v-spacer></v-spacer>

    <v-card style="height: 75vh; padding-top: 20px">
      <!-- Count down -->
      <section
        v-if="classNotStarted"
        class="d-flex flex-column justify-center align-center h-full"
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
        v-if="classEnded"
        class="d-flex flex-column justify-center align-center h-full"
      >
        <h3 class="ma-6">La clase online ya ha terminado.</h3>
      </section>

      <!-- Zoom component -->
      <div v-if="classOngoing">
        <section v-if="meetingId" class="d-flex flex-column align-start">
          <iframe
            ref="zoomIframe"
            allow="microphone; camera"
            style="border: 0; height: 60vh; width: 100%"
            :src="zoomUrl"
            frameborder="0"
            allowfullscreen
          />
          <div class="pa-4 d-flex ">
            <span class="bold">Materials :</span>
            <div>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title>Material Name</v-list-item-title>
                  <div class="d-flex material_item">
                    <v-list-item-subtitle>
                      Material category
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                      <v-icon
                        class="cursor-pointer pr-3 pr-md-1"
                        color="primary"
                      >
                        mdi-cloud-download
                      </v-icon>
                    </v-list-item-subtitle>
                  </div>
                </v-list-item-content>
              </v-list-item>
            </div>
            
          </div>
        </section>
        <section v-else class="d-flex align-center justify-center pa-3">
          En enlace a la clase online no es correcto. Por favor contacte con el
          administrador.
        </section>
      </div>
    </v-card>
  </div>
</template>

<script>
import _ from 'lodash'
import Toast from '@/utils/toast'
import LessonRepository from '@/services/LessonRepository'
import CounterLabel from './components/counter-label.vue'

const MINUTE = 1000 * 60
let interval

export default {
  name: 'StudentsOnlineLesson',
  components: {
    CounterLabel,
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
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
      classNotStarted: false
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

      // if (!res) {
      //   return
      // }
      // console.log('========res', res)
      // const params = {
      //   lessons: res.id
      // }
      // const materials = await LessonRepository.studentsMaterialList(
      //   params
      // )
      
      // console.log('========lesson', materials)

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
    }
  }
}
</script>
<style scoped>
.v-list-item__content{
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
</style>
