<template>
  <div>
    <StudentsMaterialsBase
      ref="materialsList"
      :title="`Materiales de la clase ${lesson ? lesson.name : ''}`"
      :store-name="storeName"
      type="material"
      icon="mdi-file-pdf"
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
import { downloadFile, openInTab } from '@/utils/DownloadMaterial'

export default {
  name: 'StudentsMaterialsList',
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
    }
  }
}
</script>
