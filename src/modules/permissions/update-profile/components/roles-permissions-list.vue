<template>
  <div>
    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="permissionsStore"
      :load="loadPermissions"
    >
      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>

      <!-- ------------ SLOTS ------------ -->
      <template v-slot:[`item.name`]="{ item }">
        <SwitchInput
          id="permissions"
          :value="hasPermission(item)"
          :label="hasPermission(item) ? 'Si' : 'No'"
          @click="permissionsAction(item.id)"
        />
      </template>
      <template v-slot:[`item.config`]="{ item }">
        <v-btn
          v-if="permissionCanBeConfigured(item)"
          small
          icon
          color="primary"
          @click="openConfigModal(item)"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </template>
    </ServerDataTable>

    <!-- Move the modal outside ServerDataTable -->
    <ConfigRoleModal
      ref="configModal"
      :role-id="roleId"
      @submitted="handleConfigSubmitted"
    />
  </div>
</template>

<script>
import ProfileRepository from '@/services/ProfileRepository'
import { PermissionsWithConfig } from '@/utils/enums'
export default {
  name: 'RolesPermissionsList',
  components: {
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    ServerDataTable: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ '@/modules/resources/components/resources/server-data-table'
      ),
    SwitchInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/switch-input.vue'
      ),
    ConfigRoleModal: () =>
      import(
        /* webpackChunkName: "ConfigRoleModal" */ './config-role-modal.vue'
      )
  },
  data() {
    return {
      permissions: [], // Permissions attached to the role
      roleId: '',
      permissionsWithConfig: [] // All permissions with config
    }
  },
  computed: {
    headers() {
      return [
        {
          position: 1,
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'alias_name',
          show: true
        },
        {
          position: 2,
          text: 'Permiso',
          align: 'start',
          value: 'name',
          show: true
        },
        {
          position: 3,
          text: 'Configuración',
          align: 'start',
          value: 'config',
          show: true
        }
      ]
    },
    store() {
      return this.$store.state.profilesStore
    }
  },
  mounted() {
    this.info()
  },
  methods: {
    hasPermission(item) {
      return this.permissions.includes(item.id)
    },
    permissionCanBeConfigured(item) {
      return PermissionsWithConfig[item.name]
    },
    async loadPermissions(pagination) {
      const params = {
        ...pagination
      }

      const res = await ProfileRepository.listOfPermissions(params)

      return res
    },
    async permissionsAction(id) {
      const permission_id = id

      // Modify in the server
      const res = this.permissions.includes(id)
        ? await ProfileRepository.deletePermission(permission_id, this.roleId)
        : await ProfileRepository.addPermission(permission_id, this.roleId)

      if (!res) {
        return
      }

      // Modify the local data
      this.permissions = this.permissions.includes(id)
        ? this.permissions.filter((permissionId) => permissionId !== id)
        : [...this.permissions, id]
    },
    async info() {
      const { id } = this.$route.params

      this.roleId = id

      if (!id) {
        return
      }

      const [role, configs] = await Promise.all([
        ProfileRepository.info(id),
        ProfileRepository.getRoleConfigurations(id)
      ])

      this.permissions = role.permissions.map((obj) => obj.id)
      this.permissionsWithConfig = configs
    },
    openConfigModal(item) {
      this.$refs.configModal.open({
        permission: item,
        config: this.permissionsWithConfig.find(
          (permission) => permission.permission_id === item.id
        )?.config
      })
    },
    handleConfigSubmitted({ permissionId, config }) {
      const permission = this.permissionsWithConfig.find(
        (permission) => permission.permission_id === permissionId
      )

      // Update local
      if (permission) {
        permission.config = config

        return
      }

      // Append new
      this.permissionsWithConfig.push({
        role_id: this.roleId,
        permission_id: permissionId,
        config
      })
    }
  }
}
</script>
