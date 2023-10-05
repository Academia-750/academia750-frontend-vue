<template>
  <div>
    <StudentsMaterialsBase
      ref="materialsList"
      :title="`Materiales de la clase ${lesson ? lesson.name : ''}`"
      store-name="studentsMaterialsStore"
      type="material"
    >
      <template v-slot:actions="item">
        <div
          v-if="item.has_url"
          class="d-flex justify-space-between align-center"
        >
          <div>
            <v-icon
              class="cursor-pointer pr-3 pr-md-1"
              color="primary"
              @click="download(item)"
            >
              mdi-cloud-download
            </v-icon>
          </div>
          <div>
            <v-icon
              class="cursor-pointer pa-1"
              color="primary"
              @click="openOtherTab(item)"
            >
              mdi-eye
            </v-icon>
          </div>
          <div></div>
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
import downloadFile from '@/utils/DownloadMaterial'
import { mapState } from 'vuex'

export default {
  name: 'StudentsMaterialsList',
  components: {
    StudentsMaterialsBase: () =>
      import(
        /* webpackChunkName: "StudentsMaterialsBase" */ '@/modules/lessons/_common/students-materials-base/students-materials-base.vue'
      )
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('studentLessonsStore', ['lesson'])
  },
  methods: {
    async getUrl(material) {
      this.loading = true

      const url = await LessonRepository.downloadStudentMaterial(
        material.material_id
      )

      this.loading = false

      return url
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
    }
  }
}
</script>
