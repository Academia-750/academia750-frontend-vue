<template>
  <StudentsMaterialsBase
    ref="materialsList"
    title="Materiales de Clase"
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
            class="cursor-pointer"
            color="primary"
            @click="download(item)"
          >
            mdi-cloud-download
          </v-icon>
        </div>
        <div>
          <v-icon class="cursor-pointer" color="primary"> mdi-eye </v-icon>
        </div>
        <div></div>
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
      import(
        /* webpackChunkName: "StudentsMaterialsBase" */ '@/modules/lessons/_common/students-materials-base/students-materials-base.vue'
      )
  },
  data() {
    return {}
  },

  methods: {
    async download(material) {
      // const [_name, type] = this.fileNameAndType(material.url)
      const res = await LessonRepository.downloadStudentMaterial(
        material.material_id
      )

      console.log({ res })
      if (!res) {
        return
      }

      // DownloadFile(material.url, material.name, type)
    }
  }
}
</script>
