<template>
  <StudentsMaterialsBase
    ref="recordingsList"
    title="Grabaciones de Clase"
    store-name="studentsRecordingsStore"
    type="recording"
    :loading="loading"
  >
    <template v-slot:actions="item">
      <div
        v-if="item.has_url"
        class="d-flex justify-space-between align-center"
      >
        <div>
          <!-- Modal here on next task -->
        </div>
      </div>
    </template>
  </StudentsMaterialsBase>
</template>
<script>
import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'StudentsRecordingsList',
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
    async download(material) {
      this.loading = true
      const res = await LessonRepository.downloadStudentMaterial(
        material.material_id
      )

      if (!res) {
        return
      }
      this.loading = false
      // DownloadFile(material.url, material.name, type)
    }
  }
}
</script>
