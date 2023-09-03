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
              :rules="`required|min:3|max:25|regex:${validRegex}`"
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
import { inputValidRegex } from '@/utils/inputValidRegex'
import Toast from '@/utils/toast'

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
      isDefaultRole: false,
      validRegex: inputValidRegex
    }
  },
  computed: {
    ...mapState('profilesStore', ['editItem'])
  },
  mounted() {
    this.info()
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
    async info() {
      const { id } = this.$route.params

      if (id) {
        const role = await ProfileRepository.info(id)

        this.name = role.alias_name
        this.isDefaultRole = role.default_role

        return
      }
    },
    async createProfile() {
      const status = await this.$refs['FormCreateProfile'].validate()

      if (!status) {
        Toast.error('Por favor, complete correctamente los campos del formulario.')

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

      Toast.success(this.editItem ? 'Perfil Editado!' : 'Perfil Creado!')

      this.SET_EDIT_ITEM(profile)
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
