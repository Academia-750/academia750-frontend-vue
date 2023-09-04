<template>
  <v-card-text>
    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="profilesStore"
      :load="loadProfiles"
    >
      <template v-slot:top>
        <!-- ------------ ACTIONS ------------ -->
        <Toolbar title="Perfil" icon="mdi-clipboard-account">
          <template slot="actions">
            <ResourceButtonAdd
              text-button="Crear un perfil"
              @click="addProfile()"
            />
            <resource-button
              icon-button="mdi-autorenew"
              @click="resetTableOptions"
            />
          </template>
        </Toolbar>
        <resource-text-field-search
          :search-word="store.tableOptions.content"
          label-text-field="Buscar por nombre del perfil."
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>

      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>

      <!-- ------------ SLOTS ------------ -->
      <template v-slot:[`item.default_role`]="{ item }">
        <div>
          <v-chip
            class="ma-1"
            label
            small
            :color="item.default_role ? 'primary' : ''"
          >
            {{ item.default_role ? 'SI' : 'NO' }}
          </v-chip>
        </div>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex justify-center">
          <resource-button-edit
            :is-disabled="canEdit(item)"
            :config-route="{}"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="updateItem(item)"
          />
          <resource-button-delete
            text-button="Eliminar"
            @actionConfirmShowDialogDelete="deleteRole(item)"
          />
        </div>
      </template>
    </ServerDataTable>
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapMutations } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headers from './profiles-table-columns'
import ProfileRepository from '@/services/ProfileRepository'
import Toast from '@/utils/toast'

export default {
  name: 'DatatableProfiles',
  components: {
    ResourceButtonEdit: () =>
      import(
        /* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      ),
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
    ResourceButtonDelete: () =>
      import(
        /* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'
      )
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
      searchWordText: '',
      loading: false
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

  mounted() {},

  methods: {
    ...mapActions('profilesStore', ['resetTableOptions']),
    ...mapMutations('profilesStore', ['SET_EDIT_ITEM', 'SET_TABLE_OPTIONS']),
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
    async loadProfiles(pagination) {
      const params = {
        ...pagination
      }

      const res = await ProfileRepository.list(params)

      return res
    },
    async deleteRole(role) {
      if (!role) {
        return
      }
      const response = await Toast.delete(
        '¿Seguro que deseas eliminar este Role?',
        'Todos los usuarios asociados a este perfil seran asignados al perfil por defecto.'
      )

      if (!response.isConfirmed) {
        return
      }

      const res = await ProfileRepository.delete(role.id)

      if (!res) {
        return
      }
      Toast.success('El perfil ha sido eliminada con éxito.')

      this.$refs.table.reload()
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
