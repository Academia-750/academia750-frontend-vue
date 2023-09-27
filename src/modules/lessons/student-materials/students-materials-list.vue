<template>
  <StudentsMaterialsBase
    ref="materialsList"
    title="Materiales de Clase"
    store-name="studentsMaterialsStore"
    type="material"
    :loading="loading"
  >
    <template v-slot:actions="item">
      <div
        v-if="item.has_url"
        class="d-flex justify-space-between align-center"
      >
        <div>
          <v-icon
            class="cursor-pointer"
            color="primary"
            @click="download(item)"
          >
            mdi-cloud-download
          </v-icon>
        </div>
        <div>
          <v-icon
            class="cursor-pointer"
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
</template>
<script>
import LessonRepository from '@/services/LessonRepository'
import downloadFile from '@/utils/DownloadMaterial'

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

  methods: {
    async getUrl(material) {
      const url = await LessonRepository.downloadStudentMaterial(
        material.material_id
      )

      return url
    },
    async download(material) {
      this.loading = true
      const url = await this.getUrl(material)

      if (!url) {
        return
      }
      const type = url.slice(
        (Math.max(0, url.lastIndexOf('.')) || Infinity) + 1
      )

      downloadFile(url, material.name, type)
      this.loading = false
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
