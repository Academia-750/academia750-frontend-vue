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
    <v-card style="height: 75vh;">
      <section class="px-2 d-flex align-center">
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
import LessonRepository from '@/services/LessonRepository'
import { PermissionEnum } from '@/utils/enums'
import LessonToolBar from '@/modules/lessons/_common/lesson-tool-bar.vue'
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

      if (res.is_online) {
      const regexPattern = /\/j\/(\d+)/
      // Use RegExp.exec() to find the match
      const [, meetingId] = regexPattern.exec(res.url) || []

      this.meetingId = meetingId

      if (meetingId) {
        // Extracted meeting ID

        console.log('Meeting ID:', meetingId)
      } else {
        console.log('Meeting ID not found in the URL.')
      }
      }

      return this.lesson = res
    }
  }
}
</script>
<style scoped>
.v-data-table > .v-data-table__wrapper .v-data-table__mobile-table-row {
  margin-top: 10px;
  border: 2px solid #ededed;
  display: block;
  box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
  -webkit-box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
}

/* each cell border in mobile */
.v-data-table > .v-data-table__wrapper .v-data-table__mobile-row {
  border-bottom: 2px solid #ededed;
}

.theme--light.v-divider {
  border-color: rgba(0, 0, 0, 0.6);
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
