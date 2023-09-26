<template>
  <StudentsMaterialsBase
    ref="recordingsList"
    store-name="studentsRecordingsStore"
    type="recording"
  >
    <template v-slot:actions="item">
      <div
        v-if="item.has_url"
        class="d-flex justify-space-between align-center"
      >
        <div>
          <!-- Modal here on next taske -->
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
    return {}
  },

  methods: {
    async download(material) {
      const res = await LessonRepository.downloadStudentMaterial(
        material.material_id
      )

      if (!res) {
        return
      }

      // DownloadFile(material.url, material.name, type)
    }
  }
}
</script>
