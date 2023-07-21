<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Crear Grupo"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined elevation="2">
      <resource-button-go-back-router :width-number-limit="300" />
      <v-icon large right class="mx-1"> mdi-account-group </v-icon>
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
            <CodeFieldInput v-model="code" rules="required" />
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4">
            <!-- Nombre -->
            <NameFieldInput
              v-model="name"
              rules="required|min:3|max:25|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
            />
          </v-col>
          <v-col cols="12" class="d-flex align-start">
            <SelectColorInput
              v-model="selectedColor"
              rules="required"
              :previous-color="editItem?.color || ''"
            />
          </v-col>

          <v-col cols="12" class="d-flex justify-start flex-column flex-sm-row">
            <v-btn
              :loading="loading"
              color="light-blue darken-3"
              class="mt-3 white--text"
              @click="createGroup"
            >
              <v-icon right dark class="mr-1"> mdi-account-group </v-icon>
              {{ editItem ? 'Editar' : 'Crear' }}
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </validation-observer>
  </v-card-text>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import voucher_codes from 'voucher-code-generator'
import GroupRepository from '../repositories/GroupRepository'

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
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'
      ),
    NameFieldInput: () =>
      import(
        /* webpackChunkName: "NameFieldInput" */ '../components/form/NameFieldInput.vue'
      ),
    SelectColorInput: () =>
      import(
        /* webpackChunkName: "SelectColorInput" */ '../components/form/SelectColorInput.vue'
      ),
    CodeFieldInput: () =>
      import(
        /* webpackChunkName: "CodeFieldInput" */ '../components/form/CodeFieldInput.vue'
      )
  },
  data() {
    return {
      loading: false,
      code: '',
      name: '',
      selectedColor: ''
    }
  },
  computed: {
    ...mapState('groupsService', ['editItem'])
  },
  mounted() {
    if (this.editItem) {
      this.code = this.editItem.code
      this.name = this.editItem.name
      this.selectedColor = this.editItem.color

      return
    }

    this.generateCode()
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },

  methods: {
    ...mapActions('groupsService', ['createGroup']),
    ...mapMutations('groupsService', ['SET_EDIT_ITEM']),

    async createGroup() {
      const status = await this.$refs['FormCreateGroup'].validate()

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
      this.loading = true

      const group = this.editItem
        ? await GroupRepository.update(this.editItem.id, {
            code: this.code,
            name: this.name,
            color: this.selectedColor
          })
        : await GroupRepository.create({
            code: this.code,
            name: this.name,
            color: this.selectedColor
          })

      this.loading = false
      if (!group) {
        return
      }

      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: this.editItem ? 'Grupo Actualizado!' : 'Grupo Creado!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })

      this.SET_EDIT_ITEM(false)
      this.$router.push('/groups/list')
    },

    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateGroup']['setErrors'](errorResponse)
    },

    async generateCode() {
      const codes = voucher_codes.generate({
        length: 6,
        count: 1,
        charset: voucher_codes.charset('alphabetic')
      })

      this.code = codes[0].toUpperCase()
    }
  },
  head: {
    title: {
      inner: 'Crear Groupo'
    }
  }
}
</script>
