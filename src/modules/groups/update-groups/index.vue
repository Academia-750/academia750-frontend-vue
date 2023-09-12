<template>
  <div>
    <v-toolbar
      flat
      class="indigo lighten-5 my-md-2 mx-md-2"
      outlined
      elevation="2"
    >
      <resource-button-go-back-router :width-number-limit="300" />
      <v-toolbar-title class="d-flex align-end">
        <v-icon large right class="mx-1"> mdi-account-group </v-icon>
        <span class="ml-2 font-weight-medium text-xs-caption text-sm-h7">
          Crear Grupo
        </span>
      </v-toolbar-title>
    </v-toolbar>
    <validation-observer ref="FormCreateGroup">
      <section class="px-2 py-2 d-flex flex-sm-column align-center">
        <v-row dense :style="{ width: '-webkit-fill-available' }">
          <v-col cols="12" md="6" lg="4" class="ml-md-5">
            <!-- CÓDIGO -->
            <CodeFieldInput v-model="code" rules="required" />
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="4">
            <!-- Nombre -->
            <NameFieldInput
              v-model="name"
              :rules="`required|min:3|max:25|regex:${validRegex}`"
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
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import voucher_codes from 'voucher-code-generator'
import GroupRepository from '@/services/GroupRepository'
import { inputValidRegex } from '@/utils/inputValidRegex'

export default {
  components: {
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'
      ),
    NameFieldInput: () =>
      import(
        /* webpackChunkName: "NameFieldInput" */ './components/NameFieldInput.vue'
      ),
    SelectColorInput: () =>
      import(
        /* webpackChunkName: "SelectColorInput" */ './components/SelectColorInput.vue'
      ),
    CodeFieldInput: () =>
      import(
        /* webpackChunkName: "CodeFieldInput" */ './components/CodeFieldInput.vue'
      )
  },
  data() {
    return {
      loading: false,
      code: '',
      name: '',
      selectedColor: '',
      validRegex: inputValidRegex
    }
  },
  computed: {
    ...mapState('groupStore', ['editItem'])
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
    ...mapActions('groupStore', ['resetTableOptions']),
    ...mapMutations('groupStore', ['SET_EDIT_ITEM']),

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
      this.resetTableOptions()
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
      inner: 'Grupo'
    }
  }
}
</script>
