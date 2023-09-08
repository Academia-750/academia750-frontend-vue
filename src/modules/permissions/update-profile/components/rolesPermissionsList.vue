<template>
  <ServerDataTable ref="table" :headers="headers" store-name="profilesStore" :load="loadPermissions">
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
</template>
  
  <script>
  import ProfileRepository from '@/services/ProfileRepository'
  import headers from './permissions-table-columns'

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
      )
  },
    data() {
      return {
        permissions: [],
        roleId: ''
      }
    },
    computed: {
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
    methods: {
      hasPermission(item) {
      return this.permissions.includes(item.id)
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

      return
      },
      async info() {
      const { id } = this.$route.params

      this.roleId = id

      if (!id) {
        return
      }

      const role = await ProfileRepository.info(id)

      this.permissions = role.permissions.map((obj) => obj.id)
    }
    }
  }
  </script>
