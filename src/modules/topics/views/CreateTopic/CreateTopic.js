import { mapActions } from 'vuex'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    FormFieldNameTopic: () => import(/* webpackChunkName: "FormFieldNameTopic" */ '../../components/form/FormFieldNameTopic.vue'),
    AutocompleteATopicGroup: () => import(/* webpackChunkName: "AutocompleteTopicGroup" */ '../../components/form/AutocompleteATopicGroup.vue')
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  data () {
    return {
      loadingButtonCreateTopic: false,
      disabledButtonCreateTopic: false,
      form: {
        nameTopic: ''
      }
    }
  },
  methods: {
    ...mapActions('topicsService', ['createTopic']),
    CreateTopic () {

      this.$refs['FormCreateTopic'].validate().then( (status) => {
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
      this.loadingButtonCreateTopic = true
      this.disabledButtonCreateTopic = true
      this.CreateTopicApi()
    },
    async ResetForm() {
      //await this.$refs['FormCreateTopic']['reset']()
      this.$nextTick(() => {
        this.$refs['FormCreateTopic']['reset']()
      })
      this.loadingButtonCreateTopic = false
      this.disabledButtonCreateTopic = false

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateTopic']['setErrors'](errorResponse)
    },
    async CreateTopicApi () {
      try {
        await this.createTopic({
          data: {
            'name': this.form.nameTopic,
            'topic-group-id': this.$refs['AutocompleteATopicGroup']?.topicGroupSelected?.value
          }
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El tema ha sido creado con éxito.',
          timer: 3000
        })

        this.$router.push({
          name: 'manage-topics'
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateTopic = false
        this.disabledButtonCreateTopic = false
      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateTopic = false
        this.disabledButtonCreateTopic = false
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
      inner: 'Crear Tema'
    }
  }
}
