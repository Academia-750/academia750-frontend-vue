<template>
  <div>
    <div>
      <LessonToolBar>
        <template slot="info">
          <div class="d-flex align-center">
            <div class="text-bold mr-2">Clase:</div>
            <span class="font-weight-bold subtitle-2">
              {{ lesson.name }}
            </span>
          </div>
        </template>
      </LessonToolBar>
    </div>

    <v-spacer></v-spacer>
    <v-card style="height: 75vh; padding-top: 20px;">
      <section class="d-flex align-center">
        <iframe
          ref="zoomIframe"
          allow="microphone; camera"
          style="border: 0; height: 60vh; width: 100%;"
          :src="'https://app.zoom.us/wc/' + meetingId + '/join'"
          frameborder="0"
        />
      </section>
    </v-card>
  </div>
</template>

<script>
import _ from 'lodash'
import Toast from '@/utils/toast'
import LessonRepository from '@/services/LessonRepository'
import { PermissionEnum } from '@/utils/enums'
import LessonToolBar from '@/modules/lessons/_common/lesson-tool-bar.vue'
import router from '@/modules/profile/router'
export default {
  name: 'StudentsOnlineLesson',
  components: {
    LessonToolBar
  },
  data() {
    return {
      lesson : {},
      meetingId: ''
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
        Toast.error(
          'Por favor, Lession pas actival.'
        )
        this.$router.push({
        name: 'my-lessons'
      })
      }

      if (res.is_online) {
      const regexPattern = /\/j\/(\d+)/
      // Use RegExp.exec() to find the match
      const [, meetingId] = regexPattern.exec(res.url) || []

      this.meetingId = meetingId
      }

      return this.lesson = res
    }
  }
}
</script>
