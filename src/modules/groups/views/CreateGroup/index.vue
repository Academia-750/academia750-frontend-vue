<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Crear Grupo"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar flat class="lighten-5 my-2" outlined elevation="2">
      <v-icon
        large
        right
        dark
        class="mx-1"
        color="black"
      >mdi-account-group</v-icon>
      <resource-title-toolbar-datatable
        :width-limit-toolbar-title="420"
        title-text="Crear Grupo"
      />
    </v-toolbar>
    <validation-observer ref="FormCreateGroup">
      <section class="px-2 py-2 d-flex align-center">
        <v-row dense>
          <v-col cols="12" md="6" lg="4" class="ml-1">
            <!-- CÓDIGO -->
            <CodigoFieldInput
              ref="CodigoFieldInput"
              v-model="code"
            />
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4">
            <!-- Nombre -->
            <NombreFieldInput
              ref="NombreFieldInput"
              v-model="name"
            />
          </v-col>
          <v-col cols="12" class="d-flex align-start">
            <v-icon large>mdi-invert-colors</v-icon>
            <p class="font-weight-regular text-h5 ml-5 mr-8">Color del Grupo</p>
            <div class="colors-div">
              <div
                v-for="(color, index) in colors"
                :key="index"
                :style="{ backgroundColor: color }"
                class="circle"
                @click="selectColor(color)"
              >
                {{ selectedColor === color ? '✓' : '' }}
              </div>
            </div>
          </v-col>

          <v-col cols="12" class="d-flex justify-start flex-column flex-sm-row">
            <v-btn
              :loading="loadingButtoncreateGroup"
              :disabled="true"
              color="light-blue darken-3"
              class="mt-3 white--text"
              @click="createGroup"
            >
              <v-icon right dark class="mr-1"> mdi-account-group </v-icon>
              Crear
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </validation-observer>
  </v-card-text>
</template>

<script>
import { mapActions } from 'vuex'
import GroupRepository from '../../repositories/GroupRepository'
import voucher_codes from 'voucher-code-generator'

export default {
  components: {
    ResourceTitleToolbarDatatable: () =>
      import(
        /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
      ),
    ResourceHeaderCrudTitle: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'
      ),
    NombreFieldInput: () =>
      import(
        /* webpackChunkName: "NombreFieldInput" */ '../../components/form/NombreFieldInput.vue'
      ),
    CodigoFieldInput: () =>
      import(
        /* webpackChunkName: "CodigoFieldInput" */ '../../components/form/CodigoFieldInput.vue'
      )
  },
  data() {
    return {
      loadingButtonCreateGroup: false,
      disabledButtonCreateGroup: false,
      form: {
        nameTopic: ''
      },
      colors: '',
      code: '',
      name: '',
      selectedColor: ''
    }
  },
  mounted() {
    this.getColors()
    this.generateCode()
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  methods: {
    ...mapActions('groupsService', ['createGroup']),
    CreateGroup() {
      this.$refs['FormCreateGroup'].validate().then((status) => {
        if (!status) {
          this.$swal.fire({
            icon: 'error',
            toast: true,
            title:
              'Por favor, complete correctamente los campos del formulario.',
            showConfirmButton: true,
            confirmButtonText: 'Entendido',
            timer: 7500
          })

          return
        }
      })

      this.$loadingApp.enableLoadingProgressLinear()
      this.loadingButtonCreateGroup = true
      this.disabledButtonCreateGroup = true
      this.CreateGroupApi()
    },
    async ResetForm() {
      //await this.$refs['FormCreateGroup']['reset']()
      this.$nextTick(() => {
        this.$refs['FormCreateGroup']['reset']()
      })
      this.loadingButtonCreateGroup = false
      this.disabledButtonCreateGroup = false

      return true
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateGroup']['setErrors'](errorResponse)
    },
    async CreateGroupApi() {
      try {
        await this.createGroup({
          data: {
            name: this.form.nameTopic,
            'topic-group-id':
              this.$refs['AutocompleteATopicGroup']?.topicGroupSelected?.value
          }
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El tema ha sido creado con éxito.',
          timer: 3000
        })

        this.$router.push({
          name: 'manage-groups'
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateGroup = false
        this.disabledButtonCreateGroup = false
      } catch (error) {
        //console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonCreateGroup = false
        this.disabledButtonCreateGroup = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title:
              'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.ResetForm()
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    },
    async getColors() {
      const res = await GroupRepository.colors()

      this.colors = res.data.results
    },
    async generateCode() {
      const codes = voucher_codes.generate({
        length: 6,
        count: 1,
        charset: voucher_codes.charset('alphabetic')
      })

      this.code = codes[0].toUpperCase()
    },
    async selectColor(color) {
      console.log('=======selectedColor',color)
      this.selectedColor = color
    }
  },
  head: {
    title: {
      inner: 'Crear Groupo'
    }
  }
}
</script>
<style>
.circle {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  cursor: pointer;
}

.colors-div {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 11px;
}
</style>
