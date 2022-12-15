import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { mapActions } from 'vuex'

export default {
  components: {
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    vueDropzone: vue2Dropzone,
    ResourceButtonEdit: () => import(/* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'),
    ResourceButtonDelete: () => import(/* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'),
    ResourceButtonAdd: () => import(/* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'),
    ResourceTextFieldSearch: () => import(/* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'),
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceBannerNoDataDatatable: () => import(/* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    ResourceDialogConfirmDelete: () => import(/* webpackChunkName: "ResourceDialogConfirmDelete" */ '@/modules/resources/components/resources/ResourceDialogConfirmDelete')
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  data() {
    return {
      canSendFiles: false,
      loadingButton: false,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        acceptedFiles: '.csv',
        thumbnailWidth: 100,
        maxFileSize: 10, //mib
        parallelUploads: 2,
        maxFiles: 6,
        clickable: true,
        autoQueue: true,
        addRemoveLinks: true
      }
    }
  },
  mounted() {
    this.$refs['dropzoneFilesImportSubtopics'].$el.innerHTML = `
      <div class="dz-default dz-message"><span>Adjuntar archivos o click para seleccionar</span></div>
    `
  },
  methods: {
    ...mapActions('subtopicsService', ['importSubtopicsCSV']),
    vdropAddedFile(file) {
      //console.log(file)
    },
    vdropQueueCompleted() {
      //console.log('Queue completed')
    },
    vdropSuccessProcessSendFiles(files, response) {
      /* console.trace({
        files,
        response
      }) */
    },
    getAcceptedFiles() {
      return this.$refs['dropzoneFilesImportSubtopics'].getAcceptedFiles()
    },
    sendFilesApi() {
      const files = this.getAcceptedFiles()

      if (Array.isArray(files) && files.length === 0) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, adjuntar al menos 1 archivo',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      /* console.trace(files)
      console.log(typeof files) */
      this.sendFilesSubtopicAction(files)
    },
    async sendFilesSubtopicAction(files) {
      try {
        const formDataFilesSubtopics = new FormData()

        files.forEach((file) => {
          formDataFilesSubtopics.append('filesSubtopics[]', file)
        })

        //formDataFilesSubtopics.append('filesTopics[]', files)

        this.loadingButton = true

        await this.importSubtopicsCSV({
          data: formDataFilesSubtopics,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El proceso de importación de subtemas ha iniciado. Te notificaremos en cuanto termine o puedes revisar "Mis importaciones"',
          timer: 10000
        })

        this.$refs['dropzoneFilesImportSubtopics'].removeAllFiles()

        /* this.$router.push({
          name: 'manage-topics'
        }) */

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButton = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButton = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          console.log(error.response)
        }
      }
    }
  },
  head: {
    title: {
      inner: 'Importar Subtemas'
    }
  }
}
