import { mapActions } from 'vuex'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    FormFieldNameSubtopic: () => import(/* webpackChunkName: "FormFieldNameSubtopic" */ '@/modules/subtopics/components/form/FormFieldNameSubtopic.vue'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    ResourceButtonAdd: () => import(/* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd')
  },
  data () {
    return {
      loadingButtonUpdateSubtopic: false,
      disabledButtonUpdateSubtopic: false,
      form: {
        nameSubtopic: ''
      }
    }
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  mounted () {
    ////console.log(this.$route.params.id)
    this.fetchSubtopicForUpdate()
  },
  methods: {
    ...mapActions('subtopicsService', ['fetchSubtopic','updateSubtopic']),
    async fetchSubtopicForUpdate () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonUpdateSubtopic = true

        const response = await this.fetchSubtopic({
          id: this.$route.params.id
        })

        const { name } = response.data.data.attributes

        this.$refs['nameSubtopicInputComponent'].name_subtopic = name
        this.name_subtopic = name

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateSubtopic = false
      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateSubtopic = false
      }
    },
    UpdateSubtopic () {
      this.$refs['FormUpdateSubtopic'].validate().then( (status) => {
        if (!status) {
          this.$swal.fire({
            icon: 'error',
            toast: true,
            title: 'Por favor, complete correctamente los campos del formulario.',
            showConfirmButton: true,
            confirmButtonText: 'Entendido',
            timer: 7500
          })

          return
        }
      } )
      this.$loadingApp.enableLoadingProgressLinear()
      this.loadingButtonUpdateSubtopic = true
      this.disabledButtonUpdateSubtopic = true
      this.UpdateSubtopicApi()
    },
    async ResetForm() {
      //await this.$refs['FormUpdateSubtopic']['reset']()
      this.$nextTick(() => {
        this.$refs['FormUpdateSubtopic']['reset']()
      })
      this.loadingButtonUpdateSubtopic = false
      this.disabledButtonUpdateSubtopic = false

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormUpdateSubtopic']['setErrors'](errorResponse)
    },
    async UpdateSubtopicApi () {
      try {
        await this.updateSubtopic({
          id: this.$route.params.id,
          data: {
            'name': this.form.nameSubtopic
          },
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El subtema ha sido actualizado con éxito.',
          timer: 3000
        })

        this.$router.push({
          name: 'manage-subtopics'
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateSubtopic = false
        this.disabledButtonCreateopposition = false
      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateSubtopic = false
        this.disabledButtonUpdateSubtopic = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.ResetForm()
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    }
  },
  head: {
    title: {
      inner: 'Editar Subtema'
    }
  }
}
