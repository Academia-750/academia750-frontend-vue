<template>
  <v-card-text>
    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="profilesStore"
      :load="loadPermissions"
    >
      <template v-slot:top>
        <!-- ------------ ACTIONS ------------ -->
        <Toolbar title="Permissione" icon="mdi-clipboard-account">
          <template slot="actions">
            <resource-button
              icon-button="mdi-autorenew"
              @click="resetTableOptions"
            />
          </template>
        </Toolbar>
        <resource-text-field-search
          :search-word="store.tableOptions.content"
          label-text-field="Buscar por nombre del Permissione."
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>

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
          @click="addPermission(item.id)"
        />
      </template>
    </ServerDataTable>
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapMutations } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headers from './permissions-table-columns'
import ProfileRepository from '@/services/ProfileRepository'
import Toast from '@/utils/toast'
import moment from 'moment'

export default {
  name: 'DatatableProfiles',
  components: {
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    ServerDataTable: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ '@/modules/resources/components/resources/server-data-table'
      ),
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
      ),
    ResourceTextFieldSearch: () =>
      import(
        /* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    SwitchInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/switch-input.vue'
      )
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
      searchWordText: '',
      loading: false,
      permissions: []
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
  watch: {
    searchWord(value) {
      this.searchWordText = value
    }
  },

  created() {
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 600)
  },

  mounted() {
    this.info()
  },

  methods: {
    ...mapActions('profilesStore', ['resetTableOptions']),
    ...mapMutations('profilesStore', ['SET_EDIT_ITEM', 'SET_TABLE_OPTIONS']),
    parseDate(date) {
      return moment(date).format('YYYY-MM-DD hh:mm')
    },
    hasPermission (item) {
      this.info()

      return this.permissions.includes(item.id)
    },
    async info() {
      const { id } = this.$route.params

      if (!id) {
        return
      }

      const role = await ProfileRepository.info(id)

      this.permissions = role.permissions.map((obj) => obj.id)
    },
    async addPermission(id) {
      const permission_id = id
      const roleId = this.$route.params.id
      const res = await ProfileRepository.addPermission(permission_id, roleId)

      if (!res) {
        return
      }
      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'Permission agregada!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })
      this.tableReload()
    },
    addProfile() {
      this.SET_EDIT_ITEM('')
      this.$router.push({
        name: 'create-profile'
      })
    },
    updateItem(item) {
      this.SET_EDIT_ITEM(item)
      this.$router.push({
        name: 'edit-profile',
        params: {
          id: item.id
        }
      })
    },
    canEdit(profile) {
      if (!profile) {
        return false
      }

      return profile.protected === 1
    },
    tableReload() {
      this.$refs.table.reload()
    },
    async loadPermissions(pagination) {
      const params = {
        ...pagination
      }

      const res = await ProfileRepository.listOfPermissions(params)

      return res
    },
    searchFieldExecuted($event) {
      this.SET_TABLE_OPTIONS({ content: $event, offset: 0 })
      this.tableReload()
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    }
  }
}
</script>
<style scoped>
.v-data-table > .v-data-table__wrapper .v-data-table__mobile-table-row {
  margin-top: 10px;
  border: 2px solid #ededed;
  display: block;
  box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
  -webkit-box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
}

/* each cell border in mobile */
.v-data-table > .v-data-table__wrapper .v-data-table__mobile-row {
  border-bottom: 2px solid #ededed;
}

.theme--light.v-divider {
  border-color: rgba(0, 0, 0, 0.6);
}
</style>
