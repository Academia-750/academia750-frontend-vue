import { mapActions } from 'vuex'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    FormFieldNameSubtopic: () => import(/* webpackChunkName: "FormFieldNameSubtopic" */ '../../components/form/FormFieldNameSubtopic.vue')

  },
  data () {
    return {
      loadingButtonCreateSubtopic: false,
      disabledButtonCreateSubtopic: false,
      form: {
        nameSubtopic: ''
      }
    }
  },
  methods: {
    ...mapActions('subtopicsService', ['createSubtopic']),
    CreateSubtopic () {
      this.$refs['FormCreateSubtopic'].validate().then( (status) => {
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
      this.loadingButtonCreateSubtopic = true
      this.disabledButtonCreateSubtopic = true
      this.CreateSubtopicApi()
    },
    async ResetForm() {
      //await this.$refs['FormCreateSubtopic']['reset']()
      this.$nextTick(() => {
        this.$refs['FormCreateSubtopic']['reset']()
      })
      this.loadingButtonCreateSubtopic = false
      this.disabledButtonCreateSubtopic = false

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateSubtopic']['setErrors'](errorResponse)
    },
    async CreateSubtopicApi () {
      try {
        await this.createSubtopic({
          data: {
            'name': this.form.nameSubtopic
          }
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El subtema ha sido creado con éxito.',
          timer: 3000
        })

        this.$router.push({
          name: 'manage-subtopics'
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateSubtopic = false
        this.disabledButtonCreateSubtopic = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateSubtopic = false
        this.disabledButtonCreateSubtopic = false
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
      inner: 'Crear Subtema'
    }
  }
}
