<template>
  <div>
    <StudentsMaterialsBase
      ref="assessmentsList"
      :title="`Seguimiento Teórico de la clase ${lesson ? lesson.name : ''}`"
      :store-name="storeName"
      type="assessment"
      icon="mdi-clipboard-text"
    >
      <template v-slot:actions="item">
        <div class="d-flex justify-space-between align-center">
          <div v-if="item.has_url">
            <v-icon
              class="cursor-pointer pr-3 pr-md-1"
              color="primary"
              @click="download(item)"
            >
              mdi-cloud-download
            </v-icon>
          </div>
          <div v-if="item.has_url">
            <v-icon
              class="cursor-pointer pa-1"
              color="primary"
              @click="openOtherTab(item)"
            >
              mdi-eye
            </v-icon>
          </div>
          <div v-if="item.assessment_id">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  class="cursor-pointer pa-1"
                  :color="getAssessmentIconColor(item)"
                  v-on="on"
                  @click="openAssessmentDetail(item)"
                >
                  mdi-clipboard-text
                </v-icon>
              </template>
              <span>{{ getAssessmentTooltip(item) }}</span>
            </v-tooltip>
          </div>
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
  </div>
</template>
<script>
import LessonRepository from '@/services/LessonRepository'
import { downloadFile, openInTab } from '@/utils/DownloadMaterial'
import moment from 'moment'

export default {
  name: 'StudentsAssessmentsList',
  components: {
    StudentsMaterialsBase: () =>
      import(
        /* webpackChunkName: "StudentsMaterialsBase" */ '@/modules/lessons/_common/students-materials-base/students-materials-base.vue'
      )
  },
  props: {
    storeName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    lesson() {
      return this.$store.state[this.storeName].lesson
    }
  },

  methods: {
    getAssessmentIconColor(item) {
      // If not an assessment, return default color
      if (item.type !== 'assessment' || !item.assessment_id) {
        return 'primary'
      }

      // Check if expired (deadline has passed) - expired takes priority
      if (item.assessment_deadline) {
        const deadline = moment(item.assessment_deadline)

        if (deadline.isValid() && moment().isAfter(deadline)) {
          return 'grey' // Gray if expired
        }
      }

      // Check if replied (and not expired)
      if (item.assessment_replied === 1) {
        return 'primary' // Blue (primary) if replied
      }

      // Not replied and not expired
      return 'orange' // Orange if not replied
    },
    getAssessmentTooltip(item) {
      // If not an assessment, return default message
      if (item.type !== 'assessment' || !item.assessment_id) {
        return 'Ver seguimiento teórico'
      }

      // Check if expired (deadline has passed)
      if (item.assessment_deadline) {
        const deadline = moment(item.assessment_deadline)

        if (deadline.isValid() && moment().isAfter(deadline)) {
          return 'Seguimiento teórico expirado'
        }
      }

      // Check if replied
      if (item.assessment_replied === 1) {
        return 'Seguimiento teórico respondido'
      }

      // Not replied and not expired
      return 'Responder seguimiento teórico'
    },
    async getUrl(material) {
      const url = await LessonRepository.getStudentMaterialURL(
        material.material_id
      )

      return url
    },
    async download(material) {
      this.loading = true

      const url = await this.getUrl(material)

      if (!url) {
        this.loading = false

        return
      }

      await downloadFile(url, material.name)
      this.loading = false
    },
    async openOtherTab(material) {
      this.loading = true

      const url = await this.getUrl(material)

      if (!url) {
        this.loading = false

        return
      }

      await openInTab(url)
      this.loading = false
    },
    openAssessmentDetail(material) {
      if (!material.assessment_id) {
        return
      }
      this.$router.push({
        name: 'student-assessment-detail',
        params: { assessmentId: material.assessment_id }
      })
    }
  }
}
</script>
