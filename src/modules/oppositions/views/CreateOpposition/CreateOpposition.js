import { mapActions } from 'vuex'

export default {
  components: {
    ResourceButtonGoBackRouter: () => import(/* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'),
    ResourceTitleToolbarDatatable: () => import(/* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'),
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    FormFieldNameOpposition: () => import(/* webpackChunkName: "FormFieldNameOpposition" */ '../../components/form/FormFieldNameOpposition.vue'),
    FormFieldPeriodOpposition: () => import(/* webpackChunkName: "FormFieldPeriodOpposition" */ '../../components/form/FormFieldPeriodOpposition.vue')

  },
  data () {
    return {
      loadingButtonCreateOpposition: false,
      disabledButtonCreateOpposition: false,
      form: {
        nameOpposition: '',
        periodOpposition: ''
      }
    }
  },
  methods: {
    ...mapActions('oppositionsService', ['createOpposition']),
    CreateOpposition () {
      this.$refs['FormCreateOpposition'].validate().then( (status) => {
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
      this.loadingButtonCreateOpposition = true
      this.disabledButtonCreateOpposition = true
      this.CreateOppositionApi()
    },
    async ResetForm() {
      await this.$refs['FormCreateOpposition']['reset']()
      this.loadingButtonCreateOpposition = false
      this.disabledButtonCreateOpposition = false

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateOpposition']['setErrors'](errorResponse)
    },
    async CreateOppositionApi () {
      try {
        await this.createOpposition({
          data: {
            'name': this.form.nameOpposition,
            'period': this.form.periodOpposition
          }
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'La oposición ha sido creada con éxito.',
          timer: 3000
        })

        this.$router.push({
          name: 'manage-oppositions'
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOpposition = false
        this.disabledButtonCreateopposition = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateOpposition = false
        this.disabledButtonCreateOpposition = false
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
      inner: 'Crear Oposicion'
    }
  }
}
