<template>
  <v-card-text>
    <Toolbar
      :title="editItem ? 'Editar Perfil' : 'Crear Perfil'"
      icon="mdi-account-group"
    />
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
          <v-col v-show="editItem" cols="12" md="4" class="py-0 pl-0">
            <SwitchInput
              id="is_default_profile"
              :value="!!isDefaultRole"
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
    <template v-if="editItem">
      <PermissionsList :role-id="roleId" />
    </template>
  </v-card-text>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ProfileRepository from '@/services/ProfileRepository'
import { inputValidRegex } from '@/utils/inputValidRegex'
import Toast from '@/utils/toast'
import headers from './components/permissions-table-columns'

export default {
  components: {
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
      ),
    NameFieldInput: () =>
      import(
        /* webpackChunkName: "NameFieldInput" */ './components/NameFieldInput.vue'
      ),
    SwitchInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/switch-input.vue'
      ),
    PermissionsList: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ './components/roles-permissions-list.vue'
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
    ...mapState('profilesStore', ['editItem']),
    headers() {
      return headers
    },
    store() {
      return this.$store.state.profilesStore
    },
    roleId() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.info()
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  methods: {
    ...mapMutations('profilesStore', ['SET_EDIT_ITEM']),
    setDefaultProfile(value) {
      if (!value) {
        Toast.warning(
          'Selecciona otro rol por defecto para que este deje de serlo'
        )

        return
      }
      // Automatically call to the API
      this.isDefaultRole = value
      ProfileRepository.update(this.editItem.id, {
        default_role: true
      })
    },
    async info() {
      const { id } = this.$route.params

      if (!id) {
        return
      }

      const role = await ProfileRepository.info(id)

      this.name = role.alias_name
      this.isDefaultRole = role.default_role
      this.permissions = role.permissions.map((permission) => permission.id)

      this.SET_EDIT_ITEM(role)
    },
    async createProfile() {
      const status = await this.$refs['FormCreateProfile'].validate()

      if (!status) {
        Toast.error(
          'Por favor, complete correctamente los campos del formulario.'
        )

        return
      }
      this.loading = true

      const profile = this.editItem
        ? await ProfileRepository.update(this.editItem.id, {
            name: this.name
          })
        : await ProfileRepository.create({
            name: this.name
          })

      this.loading = false

      if (!profile) {
        return
      }

      !this.editItem && this.$router.replace(`${profile.id}/edit`)

      Toast.success(this.editItem ? 'Perfil Editado!' : 'Perfil Creado!')
      this.SET_EDIT_ITEM(profile)
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateProfile']['setErrors'](errorResponse)
    }
  },
  head: {
    title: {
      inner: 'Perfil de Usuario'
    }
  }
}
</script>
