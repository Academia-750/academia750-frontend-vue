<template>
  <ServerDataTable
    ref="table"
    :headers="headers"
    :store-name="storeName"
    item-key="material_id"
    :load="loadStudentsMaterials"
  >
    <template v-slot:top>
      <!-- ------------ ACTIONS ------------ -->
      <Toolbar :title="`${type === 'materials' ? `Materiales de la clase ${lesson ? lesson.name : ''}` : `Grabaciones de clase ${lesson ? lesson.name : ''}`}`" icon="mdi-tag" :back="!!lesson">

        <template #actions>
          <resource-button
            icon-button="mdi-autorenew"
            @click="resetTableOptions"
          />
        </template>
      </Toolbar>

      <div class="mt-3">
        <!-- ------------ SEARCH ------------ -->
        <LessonMaterialsSearchBar
          :content="content"
          :tags="tags"
          :workspaces="workspaces"
          @onChangeTags="onChangeTags"
          @onChangeContent="onChangeContent"
          @onChangeWorkspaces="onChangeWorkspaces"
        />
      </div>
    </template>

    <!-- ------------ NO DATA ------------ -->
    <template v-slot:no-data>
      <resource-banner-no-data-datatable />
    </template>

    <!-- ------------ SLOTS ------------ -->
    <template v-slot:[`item.tags`]="{ item }">
      <div v-if="item.tags">
        <v-chip
          v-for="(tag, index) in item.tags.split(',')"
          :key="index"
          class="ma-1"
          label
          small
        >
          {{ tag }}
        </v-chip>
      </div>
    </template>
    <template v-slot:[`item.actions-resource`]="{ item }">
      <div
        class="d-flex justify-space-between align-center"
      >
        <div v-if="type === 'material'">
          <v-icon
            class="cursor-pointer pr-3 pr-md-1"
            color="primary"
            @click="download(item)"
          >
            mdi-cloud-download
          </v-icon>
        </div>
        <div v-if="type === 'recording'">
          <v-icon
            class="cursor-pointer"
            color="primary"
            @click="openVideo(item)"
          >
            mdi-camera
          </v-icon>
        </div>
        <div v-if="type === 'material'">
          <v-icon
            class="cursor-pointer pa-1"
            color="primary"
            @click="openOtherTab(item)"
          >
            mdi-eye
          </v-icon>
        </div>
        <div>
        </div>
        <v-dialog v-model="loading" width="auto">
          <v-card class="d-flex flex-column justify-center align-center pa-8">
            <p v-if="type === 'recording'" class="pa-1">Preparando tu video...</p>
            <p v-if="type === 'material'" class="pa-1">Preparando tu material...</p>
            <v-progress-circular
              :size="70"
              :width="7"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </v-card>
        </v-dialog>
        <VimeoVideoPlayer ref="video" />
      </div>
    </template>
  </ServerDataTable>
</template>

<script>
import _ from 'lodash'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headers from './students-materials-columns'
import LessonRepository from '@/services/LessonRepository'
import ServerDataTable from '@/modules/resources/components/resources/server-data-table.vue'
import downloadFile from '@/utils/DownloadMaterial'

export default {
  name: 'StudentsMaterialsBase',
  components: {
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
      ),

    LessonMaterialsSearchBar: () =>
      import(
        /* webpackChunkName: "LessonMaterialsSearchBar" */ '../_common/search-lessons-materials-bar.vue'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    VimeoVideoPlayer: () =>
      import(
        /* webpackChunkName: "VimeoVideoPlayer" */ '@/modules/resources/components/resources/vimeo-video-player.vue'
      ),
    ServerDataTable
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
      storeName: '',
      type: '',
      loading: false,
      title: '',
      lesson: false
    }
  },
  computed: {
    tags() {
      return this.$store.state[this.storeName].tags
    },
    workspaces() {
      return this.$store.state[this.storeName].workspaces
    },
    content() {
      return this.$store.state[this.storeName].tableOptions.content
    },
    headers() {
      return headers
    }
  },

  mounted() {
    this.getStoreName()
    this.loadStudentsMaterials()
    this.$refs.table.reload()
    if (!this.$route.params.id || this.$route.params.id === '') {
      this.$router.push(this.pathRouteGoBack)

        return
    }
  },
  methods: {
    getStoreName() {
      const currentPath = this.$route.path
      const pathSegments = currentPath.split('/')
      const lastSegment = pathSegments[pathSegments.length - 1]
      const lessonId = this.$route.params.id || undefined

      if (lessonId !== undefined) {
        this.getLessonInfo(lessonId)
      }

      if (lastSegment === 'materials') {
        this.storeName = 'studentsMaterialsStore'
        this.type = 'material'
      }
      if (lastSegment === 'recordings') {
        this.storeName = 'studentsRecordingsStore'
        this.type = 'recording'
      }
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
    async getLessonInfo(lessonId) {
      this.lesson = await LessonRepository.info(lessonId)
    },
    async openOtherTab(material) {
      const url = await this.getUrl(material)

      if (!url) {
        return
      }
      window.open(url, '_blank')
    },
    async getUrl(material) {
      this.loading = true

      const url = await LessonRepository.downloadStudentMaterial(
        material.material_id
      )

      this.loading = false

      return url
    },
    async openVideo(material) {
      const url = await this.getUrl(material)

      if (!url) {
        return
      }
      this.$refs.video.open(url)
    },
    onChangeTags(value) {
      this.$store.commit(`${this.storeName}/SET_TAGS`, value)
      this.$store.commit(`${this.storeName}/SET_TABLE_OPTIONS`, { offset: 0 })
      this.$refs.table.reload()
    },

    onChangeWorkspaces(value) {
      this.$store.commit(`${this.storeName}/SET_WORKSPACES`, value)
      this.$store.commit(`${this.storeName}/SET_TABLE_OPTIONS`, { offset: 0 })

      this.$refs.table.reload()
    },

    async loadStudentsMaterials(pagination) {
      if (this.type === '') {
        return
      }
      const params = {
        ...pagination,
        tags: this.tags,
        lessons: [this.$route.params.id],
        workspaces: this.workspaces,
        type: this.type
      }

      const res = await LessonRepository.studentsMaterialList(params)

      return res
    },

    onChangeContent(content) {
      this.$store.commit(`${this.storeName}/SET_TABLE_OPTIONS`, {
        content,
        offset: 0
      })

      this.$refs.table.reload()
    },
    resetTableOptions() {
      this.$store.dispatch(`${this.storeName}/resetTableOptions`)
      this.$refs.table.reload()
    }
  }
}
</script>
<style scoped>
.v-data-table > .v-data-table__wrapper .v-data-table__mobile-table-row {
  margin-top: 10px;
  border: 2px solid #ededed;
  display: block;
  box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
  -webkit-box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
}

/* each cell border in mobile */
.v-data-table > .v-data-table__wrapper .v-data-table__mobile-row {
  border-bottom: 2px solid #ededed;
}

.theme--light.v-divider {
  border-color: rgba(0, 0, 0, 0.6);
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
