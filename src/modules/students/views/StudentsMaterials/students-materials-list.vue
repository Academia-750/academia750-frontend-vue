<template>
  <StudentsMaterialsBase
    ref="materialsList"
    store-name="studentsMaterialsStore"
    type="material"
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
  </StudentsMaterialsBase>
</template>
<script>
  import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'StudentsMaterialsList',
  components: {
    StudentsMaterialsBase: () =>
      import(/* webpackChunkName: "StudentsMaterialsBase" */ '../../components/MaterialsRecordingsTable/students-materials-base.vue')
  },
  data() {
    return {
      reloadDatatableUsers: false
    }
  },
  beforeCreate() {
      this?.$hasPermissionMiddleware(PermissionEnum.SEE_LESSONS) && this?.$hasPermissionMiddleware(PermissionEnum.SEE_LESSON_MATERIALS)
    },
  methods : {
    async download(material) {
      // const [_name, type] = this.fileNameAndType(material.url)
      const res = await LessonRepository.downloadStudentMaterial(material.material_id)

      console.log({ res })
      if (!res) {
        return
      }

      // DownloadFile(material.url, material.name, type)
    }
  }
}
</script>
