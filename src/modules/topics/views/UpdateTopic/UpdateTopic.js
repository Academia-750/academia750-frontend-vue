import { mapActions } from 'vuex'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    FormFieldNameTopic: () => import(/* webpackChunkName: "FormFieldNameTopic" */ '../../components/form/FormFieldNameTopic.vue'),
    AutocompleteATopicGroup: () => import(/* webpackChunkName: "AutocompleteTopicGroup" */ '../../components/form/AutocompleteATopicGroup.vue'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    ResourceButtonAdd: () => import(/* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd')
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  data () {
    return {
      loadingButtonUpdateTopic: false,
      disabledButtonUpdateTopic: false,
      form: {
        nameTopic: ''
      }
    }
  },
  mounted () {
    this.fetchDataForUpdate()
  },
  methods: {
    ...mapActions('topicsService', ['fetchTopic', 'updateTopic']),
    async fetchDataForUpdate () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonUpdateTopic = true

        const response = await this.fetchTopic({
          id: this.$route.params.id,
          config: {
            params: {
              include: 'topic-group'
            }
          }
        })

        const { name } = response.data.data.attributes
        const { topic_group } = response.data.data.relationships

        this.$refs['nameTopicInputComponent'].name_topic = name
        this.$refs['AutocompleteATopicGroup'].topicGroupSelected = {
          text: topic_group.attributes.name,
          value: topic_group.id
        }
        this.nameTopic = name

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateTopic = false

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateTopic = false
      }
    },
    UpdateTopic () {

      this.$refs['FormUpdateTopic'].validate().then( (status) => {
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
      this.loadingButtonUpdateTopic = true
      this.disabledButtonUpdateTopic = true
      this.UpdateTopicApi()
    },
    async ResetForm() {
      //await this.$refs['FormUpdateTopic']['reset']()
      this.$nextTick(() => {
        this.$refs['FormUpdateTopic']['reset']()
      })
      this.loadingButtonUpdateTopic = false
      this.disabledButtonUpdateTopic = false

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormUpdateTopic']['setErrors'](errorResponse)
    },
    async UpdateTopicApi () {
      try {
        await this.updateTopic({
          id: this.$route.params.id,
          data: {
            'name': this.form.nameTopic,
            'topic-group-id': this.$refs['AutocompleteATopicGroup']?.topicGroupSelected?.value
          },
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El tema ha sido actualizado con éxito.',
          timer: 3000
        })

        this.$router.push({
          name: 'manage-topics'
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateTopic = false
        this.disabledButtonUpdateTopic = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateTopic = false
        this.disabledButtonUpdateTopic = false
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
      inner: 'Actualizar Tema'
    }
  }
}
