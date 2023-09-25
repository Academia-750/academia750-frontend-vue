<template>
  <StudentsMaterialsList
    store-name="studentsMaterialsStore"
  >
    <template v-slot:actions="item">
      <div class="d-flex justify-space-between align-center">
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
          >
            mdi-eye
          </v-icon>
        </div>
        <div>
        </div>
      </div>
    </template>
  </StudentsMaterialsList>
</template>
<script>
  import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'StudentsMaterialsList',
  components: {
    StudentsMaterialsList: () =>
      import(/* webpackChunkName: "StudentsMaterialsList" */ './students-materials-base.vue')
  },
  data() {
    return {
      reloadDatatableUsers: false
    }
  },
  methods : {
    async download(material) {
      // const [_name, type] = this.fileNameAndType(material.url)
      const res = await LessonRepository.downloadStudentMaterial(material.material_id)

      if (!res) {
        return
      }

      // DownloadFile(material.url, material.name, type)
    },
    async loadStudentsMaterials(params) {
      const res = await LessonRepository.studentsMaterialList({ ...params, type: 'material' })

      return res
    }
  }
}
</script>
