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
          Crear Perfil
        </span>
      </v-toolbar-title>
    </v-toolbar>
    <validation-observer ref="FormCreateProfile">
      <section class="px-2 py-2 d-flex flex-sm-column align-center">
        <v-row dense :style="{ width: '-webkit-fill-available' }">
          <v-col cols="12" sm="12" md="6" lg="4">
            <!-- Nombre -->
            <NameFieldInput
              v-model="name"
              rules="required|min:3|max:25|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
            />
          </v-col>
          <v-col cols="12" md="4" class="py-0 pl-0">
            <SwitchInput
              id="is_default_profile"
              :value="isDefaultRole"
              :disabled="false"
              label="Predeterminado"
              @click="setDefaultProfile"
            />
          </v-col>

          <v-col cols="12" class="d-flex justify-start flex-column flex-sm-row">
            <v-btn
              :loading="loading"
              color="light-blue darken-3"
              class="mt-3 white--text"
              @click="createProfile"
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
import ProfileRepository from '@/services/ProfileRepository'

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
    SwitchInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/switch-input.vue'
      )
  },
  data() {
    return {
      loading: false,
      name: '',
      isDefaultRole: false
    }
  },
  computed: {
    ...mapState('profilesStore', ['editItem'])
  },
  mounted() {
    if (this.editItem) {
      this.name = this.editItem.name
      this.isDefaultRole = this.editItem.default_role === 1 ? true : false

      return
    }
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },

  methods: {
    ...mapActions('profilesStore', ['resetTableOptions']),
    ...mapMutations('profilesStore', ['SET_EDIT_ITEM']),
    setDefaultProfile() {
      this.isDefaultRole = !this.isDefaultRole
    },
    async createProfile() {
      const status = await this.$refs['FormCreateProfile'].validate()

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

      const profile = this.editItem
        ? await ProfileRepository.update(this.editItem.id, {
            name: this.name,
            default_role: this.isDefaultRole
          })
        : await ProfileRepository.create({
            name: this.name
          })

      this.loading = false
      if (!profile) {
        return
      }

      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: this.editItem ? 'Perfil Editado!' : 'Perfil Creado!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })

      this.SET_EDIT_ITEM(false)
      this.resetTableOptions()
      this.$router.push({
        name: 'manage-profiles'
      })
    },

    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateProfile']['setErrors'](errorResponse)
    }
  },
  head: {
    title: {
      inner: 'Crear Groupo'
    }
  }
}
</script>
