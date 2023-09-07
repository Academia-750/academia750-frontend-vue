<template>
  <v-card-text>
    <Toolbar title="Crear Perfil" icon="mdi-account-group" />
    <validation-observer ref="FormCreateProfile">
      <section class="px-2 py-2 d-flex flex-sm-column align-center">
        <v-row dense :style="{ width: '-webkit-fill-available' }">
          <v-col cols="12" sm="12" md="6" lg="4">
            <!-- Nombre -->
            <NameFieldInput v-model="name" :rules="`required|min:3|max:25|regex:${validRegex}`" />
          </v-col>
          <v-col v-show="editItem" cols="12" md="4" class="py-0 pl-0">
            <SwitchInput
              id="is_default_profile"
              :value="isDefaultRole"
              :disabled="false"
              label="Predeterminado"
              @click="setDefaultProfile"
            />
          </v-col>

          <v-col cols="12" class="d-flex justify-start flex-column flex-sm-row">
            <v-btn :loading="loading" color="light-blue darken-3" class="mt-3 white--text" @click="createProfile">
              <v-icon right dark class="mr-1"> mdi-account-group </v-icon>
              {{ editItem ? 'Editar' : 'Crear' }}
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </validation-observer>
    <ServerDataTable v-if="editItem" ref="table" :headers="headers" store-name="profilesStore" :load="loadPermissions">
      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>

      <!-- ------------ SLOTS ------------ -->
      <template v-slot:[`item.name`]="{ item }">
        <SwitchInput
          id="permissions"
          :value="hasPermission(item)"
          :disabled="false"
          label="Read"
          @click="permissionsAction(item.id)"
        />
      </template>
    </ServerDataTable>
  </v-card-text>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
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
    ServerDataTable: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ '@/modules/resources/components/resources/server-data-table'
      )
  },
  data() {
    return {
      loading: false,
      name: '',
      isDefaultRole: false,
      validRegex: inputValidRegex,
      searchWordText: '',
      permissions: []
    }
  },
  computed: {
    ...mapState('profilesStore', ['editItem']),
    headers() {
      return headers
    },
    store() {
      return this.$store.state.profilesStore
    }
  },
  mounted() {
    this.info()
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },

  methods: {
    ...mapActions('profilesStore', ['resetTableOptions']),
    ...mapMutations('profilesStore', ['SET_EDIT_ITEM', 'SET_TABLE_OPTIONS']),
    setDefaultProfile(value) {
      if (!value) {
        Toast.warning(
          'Selecciona otro rol por defecto para que este deje de serlo'
        )

        return
      }
      this.isDefaultRole = value
    },
    hasPermission(item) {
      // this.info()
      console.log('has access to', this.permissions.includes(item.id))

      return this.permissions.includes(item.id)
    },
    async info() {
      const { id } = this.$route.params

      if (!id) {
        return
      }
      
      const role = await ProfileRepository.info(id)

      console.log('role', this.role)

      this.name = role.alias_name
      this.isDefaultRole = role.default_role
      this.SET_EDIT_ITEM(role)
      console.log('here', role.permissions.map((obj) => obj.id))
      this.permissions = role.permissions.map((obj) => obj.id)
    },
    async permissionsAction(id) {
      const permission_id = id
      const roleId = this.$route.params.id

      if (this.permissions.includes(id)) {
        const res = await ProfileRepository.deletePermission(permission_id, roleId)

      if (!res) {
        return
      }
      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'Permiso eliminado!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })
      this.tableReload()

      return
      }
      const res = await ProfileRepository.addPermission(permission_id, roleId)

      if (!res) {
        return
      }
      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'Permiso agregada!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })
      this.tableReload()
    },
    async loadPermissions(pagination) {
      const params = {
        ...pagination
      }

      const res = await ProfileRepository.listOfPermissions(params)

      return res
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
          name: this.name,
          default_role: this.isDefaultRole ? this.isDefaultRole : undefined
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
    },
    tableReload() {
      this.$refs.table.reload()
    },
    searchFieldExecuted($event) {
      this.SET_TABLE_OPTIONS({ content: $event, offset: 0 })
      this.tableReload()
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    }
  },
  head: {
    title: {
      inner: 'Perfil de Usuario'
    }
  }
}
</script>
