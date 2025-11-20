<template>
  <StudentsAssessmentsList
    store-name="studentsAssessmentsListStore"
    title="Evaluaciones"
    icon="mdi-clipboard-check"
  >
    <template v-slot:actions="item">
      <div class="d-flex justify-space-between align-center">
        <div v-if="item.material && item.material.id">
          <v-icon
            class="cursor-pointer pr-3 pr-md-1"
            color="primary"
            @click="download(item)"
          >
            mdi-cloud-download
          </v-icon>
        </div>
        <div v-if="item.material && item.material.id">
          <v-icon
            class="cursor-pointer pa-1"
            color="primary"
            @click="openOtherTab(item)"
          >
            mdi-eye
          </v-icon>
        </div>
        <div v-if="item.id">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                class="cursor-pointer pa-1"
                color="primary"
                v-on="on"
                @click="openAssessmentDetail(item)"
              >
                mdi-clipboard-check
              </v-icon>
            </template>
            <span>Ver detalle de evaluación</span>
          </v-tooltip>
        </div>
      </div>
    </template>
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
  </StudentsAssessmentsList>
</template>

<script>
import notifications from '@/mixins/notifications'
import { PermissionEnum } from '@/utils/enums'
import LessonRepository from '@/services/LessonRepository'
import { downloadFile, openInTab } from '@/utils/DownloadMaterial'

export default {
  name: 'StudentAssessmentsListPage',
  components: {
    StudentsAssessmentsList: () =>
      import(
        /* webpackChunkName: "StudentsAssessmentsList" */ './students-assessments-list.vue'
      )
  },
  mixins: [notifications],
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    this.loadNotifications()
  },

  beforeCreate() {
    this.$hasPermissionMiddleware(PermissionEnum.SEE_LESSONS)
    this.$hasPermissionMiddleware(PermissionEnum.SEE_LESSON_MATERIALS)
  },
  methods: {
    async getUrl(assessment) {
      if (!assessment.material || !assessment.material.id) {
        return null
      }
      const url = await LessonRepository.getStudentMaterialURL(
        assessment.material.id
      )

      return url
    },
    async download(assessment) {
      this.loading = true

      const url = await this.getUrl(assessment)

      if (!url) {
        this.loading = false

        return
      }

      const fileName = assessment.material
        ? assessment.material.name
        : assessment.title

      await downloadFile(url, fileName)
      this.loading = false
    },
    async openOtherTab(assessment) {
      this.loading = true

      const url = await this.getUrl(assessment)

      if (!url) {
        this.loading = false

        return
      }

      await openInTab(url)
      this.loading = false
    },
    openAssessmentDetail(assessment) {
      if (!assessment.id) {
        return
      }
      this.$router.push({
        name: 'student-assessment-detail',
        params: { assessmentId: assessment.id }
      })
    }
  },
  head: {
    title: {
      inner: 'Seguimiento Teórico'
    }
  }
}
</script>
