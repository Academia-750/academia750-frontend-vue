<template>
  <v-card-text>
    <!-- ------------ ADD STUDENT TO GROUP ------------ -->

    <SearchUserModal
      ref="searchStudent"
      :loading="isAddingUser"
      @ok="joinGroup"
    />

    <ServerDataTable
      ref="table"
      :headers="headers"
      :load="loadGroupMembers"
      store-name="groupStudentStore"
    >
      <template v-slot:top>
        <!-- ------------ ACTIONS ------------ -->
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-button-go-back-router />
          <ResourceTitleToolbarDatatable :title-text="`Grupo: ${groupName}`" />

          <v-spacer />

          <resource-button
            icon-button="mdi-autorenew"
            @click="$store.dispatch('groupStudentStore/resetTableOptions')"
          />
        </v-toolbar>
        <!-- ------------ TABS ------------ -->
        <v-tabs
          :value="tab === 'active' ? 0 : 1"
          grow
          background-color="cyan darken-1"
          centered
          dark
          icons-and-text
        >
          <v-tabs-slider></v-tabs-slider>

          <v-tab @click="changeTab('active')">
            Activos
            <v-icon>mdi-account-circle</v-icon>
          </v-tab>

          <v-tab @click="changeTab('non-active')">
            Inactivos
            <v-icon>mdi-account-off</v-icon>
          </v-tab>
        </v-tabs>
        <!-- ------------ SEARCH ------------ -->
        <resource-text-field-search
          :search-word="store.tableOptions.content"
          label-text-field="Buscar por nombre o código"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
        <div
          v-if="tab === 'active'"
          class="d-flex justify-end mr-md-5"
          @click="$refs.searchStudent.open()"
        >
          <resource-button-add
            text-button="Alumnos"
            :disabled="false"
            :only-dispatch-click-event="true"
          />
        </div>
      </template>

      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>
      <!-- <template v-slot:abel> ABEL </template> -->
      <!-- ------------ SLOTS ------------ -->
      <template v-slot:[`item.created_at`]="{ item }">
        {{ $formatDate(item.created_at) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-delete
            text-button="Baja"
            @actionConfirmShowDialogDelete="leaveGroup(item)"
          />
        </div>
      </template>
    </ServerDataTable>
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headersOppositionsTable from './students-table-columns'
import moment from 'moment'
import GroupRepository from '@/services/GroupRepository'

export default {
  name: 'DatatableStudents',
  components: {
    ResourceButtonDelete: () =>
      import(
        /* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      ),
    ResourceTextFieldSearch: () =>
      import(
        /* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'
      ),
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    SearchUserModal: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ '@/modules/resources/components/resources/search-user-modal'
      ),
    ServerDataTable: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ '@/modules/resources/components/resources/server-data-table'
      ),
    ResourceTitleToolbarDatatable: () =>
      import(
        /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'
      )
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
      searchWordText: '',
      isAddingUser: false,
      groupName: ''
    }
  },
  computed: {
    store() {
      return this.$store.state.groupStudentStore
    },
    ...mapState('groupStudentStore', ['tab']),
    manageSearchWord: {
      get() {
        return this.searchWordText
      },
      set(value) {
        this.searchWordText = value
      }
    },
    headers() {
      return headersOppositionsTable(this.tab === 'non-active')
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
    this.groupInfo()
    this.$store.dispatch('groupStudentStore/setGroupId', this.$route.params.id)
  },

  methods: {
    changeTab(tabValue) {
      this.$store.commit('groupStudentStore/SET_TAB', tabValue)
      this.$refs.table.reload()
    },
    async loadGroupMembers(pagination) {
      const groupId = this.$route.params.id
      const params = {
        ...pagination,
        discharged: this.tab === 'active' ? 0 : 1
      }

      const res = await GroupRepository.studentsList(groupId, params)

      return res
    },
    async groupInfo() {
      const groupId = this.$route.params.id
      const res = await GroupRepository.info(groupId)

      this.groupName = res.name

      return res
    },

    async joinGroup(student) {
      this.isAddingUser = true
      const params = {
        group_id: this.$route.params.id,
        user_id: student.uuid
      }

      await GroupRepository.joinGroup(params)
      this.isAddingUser = false
      this.$refs.table.reload()
    },
    async leaveGroup(item) {
      if (!item) {
        return
      }

      const result = await this.$swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title: 'ABANDONAR EL GRUPO',
        html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas abandonar el grupo? Todos los alumnos seran dados de baja y perderas el histórico del grupo',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, abandonar',
        cancelButtonText: 'Cancelar'
      })

      if (!result.isConfirmed) {
        return
      }

      const params = {
        group_id: this.$route.params.id,
        user_id: item.uuid
      }

      const res = await GroupRepository.leaveGroup(params)

      if (!res) {
        return
      }
      this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'El grupo ha sido eliminado con éxito.',
        timer: 3000
      })

      this.$refs.table.reload()
    },
    searchFieldExecuted($event) {
      this.$store.commit('groupStudentStore/SET_TABLE_OPTIONS', {
        content: $event,
        offset: 0
      })

      this.$refs.table.reload()
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
