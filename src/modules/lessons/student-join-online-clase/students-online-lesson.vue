<template>
  <div>
    <Toolbar :title="`Clase ${lesson.name}`"> </Toolbar>

    <v-spacer></v-spacer>

    <v-card style="height: 75vh; padding-top: 20px">
      <section v-if="meetingId" class="d-flex align-center">
        <iframe
          ref="zoomIframe"
          allow="microphone; camera"
          style="border: 0; height: 60vh; width: 100%"
          :src="zoomUrl"
          frameborder="0"
          allowfullscreen
        />
      </section>
      <section v-else class="d-flex align-center justify-center pa-3">
        En enlace a la clase online no es correcto. Por favor contacte con el
        administrador.
      </section>
    </v-card>
  </div>
</template>

<script>
import _ from 'lodash'
import Toast from '@/utils/toast'
import LessonRepository from '@/services/LessonRepository'
export default {
  name: 'StudentsOnlineLesson',
  components: {
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
      )
  },
  data() {
    return {
      lesson: {},
      meetingId: ''
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
  mounted() {
    this.lessonInfo()
  },

  methods: {
    async lessonInfo() {
      const LessonInfo = this.$route.params.id
      const res = await LessonRepository.info(LessonInfo)

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
    }
  }
}
</script>
