import { mapActions } from 'vuex'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    FormFieldNameOpposition: () => import(/* webpackChunkName: "FormFieldNameOpposition" */ '@/modules/oppositions/components/form/FormFieldNameOpposition.vue'),
    FormFieldPeriodOpposition: () => import(/* webpackChunkName: "FormFieldPeriodOpposition" */ '@/modules/oppositions/components/form/FormFieldPeriodOpposition.vue'),
    ResourceDividerTitleDatatable: () => import(/* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'),
    ResourceButtonAdd: () => import(/* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd')
  },
  data () {
    return {
      loadingButtonUpdateOpposition: false,
      disabledButtonUpdateOpposition: false,
      form: {
        nameOpposition: '',
        periodOpposition: ''
      }
    }
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  mounted () {
    //console.log(this.$route.params.id)
    this.fetchOppositionForUpdate()
  },
  methods: {
    ...mapActions('oppositionsService', ['fetchOpposition','updateOpposition']),
    async fetchOppositionForUpdate () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.disabledButtonUpdateOpposition = true

        const response = await this.fetchOpposition({
          id: this.$route.params.id
        })

        const { name, period } = response.data.data.attributes

        this.$refs['nameOppositionInputComponent'].name_opposition = name
        this.$refs['periodOppositionInputComponent'].period_opposition = period
        this.name_opposition = name
        this.period_opposition = period

        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateOpposition = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.disabledButtonUpdateOpposition = false
      }
    },
    UpdateOpposition () {
      this.$refs['FormUpdateOpposition'].validate().then( (status) => {
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
      this.loadingButtonUpdateOpposition = true
      this.disabledButtonUpdateOpposition = true
      this.UpdateOppositionApi()
    },
    async ResetForm() {
      //await this.$refs['FormUpdateOpposition']['reset']()
      this.loadingButtonUpdateOpposition = false
      this.disabledButtonUpdateOpposition = false

      this.$nextTick(() => {
        this.$refs['FormUpdateOpposition']['reset']()
      })

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormUpdateOpposition']['setErrors'](errorResponse)
    },
    async UpdateOppositionApi () {
      try {
        await this.updateOpposition({
          id: this.$route.params.id,
          data: {
            'name': this.form.nameOpposition,
            'period': this.form.periodOpposition
          },
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'La oposición ha sido actualizada con éxito.',
          timer: 3000
        })

        this.$router.push({
          name: 'manage-oppositions'
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateOpposition = false
        this.disabledButtonCreateopposition = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonUpdateOpposition = false
        this.disabledButtonUpdateOpposition = false
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
      inner: 'Editar Oposicion'
    }
  }
}
