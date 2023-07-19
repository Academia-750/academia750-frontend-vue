<template>
  <v-card-text>
    <v-data-table
      v-model="getSelectedItems"
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
      item-key="id"
      show-select
      sort-by="created-at"
      sort-desc
      no-data-text="No hay datos disponibles"
      :items-per-page="10"
      :mobile-breakpoint="700"
      class="elevation-1"
      :server-items-length="informationMeta.total"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->
        <resource-header-crud-title
          :text-header="getTitleByStateAccount"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <!-- <resource-button-go-back-router/> -->
          <resource-title-toolbar-datatable
            :title-text="getTitleByStateAccount"
          />

          <v-spacer />

          <resource-button-add
            text-button="crear grupo"
            :config-route="{ name: 'create-group' }"
          />
        </v-toolbar>

        <resource-text-field-search
          ref="ResourceTextFieldSearch"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>
      <template v-slot:[`item.alumnos`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-add
            text-button="alumnos"
            :config-route="{ name: 'crear-alumnos' }"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="setDataForUpdateUser(item)"
          />
        </div>
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-edit
            :config-route="{}"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="setDataForUpdateUser(item)"
          />
          <resource-button-delete
            text-button="borrar"
            @actionConfirmShowDialogDelete="deleteGroupConfirm(item)"
          />
        </div>
      </template>
    </v-data-table>
    <resource-dialog-confirm-delete
      ref="dialogConfirmDeleteAction"
      title="¿Estás seguro de eliminar el alumno?"
      @actionDelete="deleteGroupAction"
    >
      <template #identifier-record>
        <div
          v-if="currentItemsSelectedForDelete"
          class="d-flex justify-center align-center"
        >
          <span class="mr-1 font-italic subtitle-1">Grupo:</span>
          <span class="font-weight-bold subtitle-1">
            {{ currentItemsSelectedForDelete['Group-name'] }}
          </span>
        </div>
      </template>
    </resource-dialog-confirm-delete>
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mapState, mapMutations, mapActions } from 'vuex'
import footerProps from './data/footerProps'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'

import headersOppositionsTable from './data/headersDatatable'

import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'
import DatatableManageGroups from '../../mixins/DatatableManageGroups'

const MIXINS = [
  DatatableManageGroups,
  URLBuilderResources,
  headersOppositionsTable,
  computedDatatable,
  componentButtonsCrud
]

export default {
  name: 'DatatableGroups',
  components: {
    ResourceButtonEdit: () =>
      import(
        /* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'
      ),
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
    // ResourceButtonGoBackRouter: () =>
    //   import(
    //     /* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'
    //   ),
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    ResourceTitleToolbarDatatable: () =>
      import(
        /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
      ),
    // ResourceDividerTitleDatatable: () =>
    //   import(
    //     /* webpackChunkName: "ResourceDividerTitleDatatable" */ '@/modules/resources/components/resources/ResourceDividerTitleDatatable'
    //   ),
    ResourceHeaderCrudTitle: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'
      ),
    ResourceDialogConfirmDelete: () =>
      import(
        /* webpackChunkName: "ResourceDialogConfirmDelete" */ '@/modules/resources/components/resources/ResourceDialogConfirmDelete'
      )
  },
  mixins: [...MIXINS],
  data() {
    return {
      //namesRelationshipsIncludeRequest: 'topics'
      currentItemsSelectedForDelete: null
    }
  },
  computed: {
    ...mapState('groupsService', [
      'itemsDatatable',
      'stateLoadingItems',
      'informationMeta',
      'usersSelected',
      'matchesResetOptionsDatatable'
    ]),
    ...footerProps,
    getTitleByStateAccount() {
      return 'Gestión de Grupos'
    },
    getSelectedItems: {
      get() {
        return this.usersSelected
      },
      set(value) {
        this.SET_USERS_SELECTED_DATATABLE(value)
      }
    }
  },
  watch: {
    optionsDatatable: {
      handler() {
        // this.getStudents({
        //   params: this.getParamsUrlApi()
        // })
      },
      deep: true
    },
    matchesResetOptionsDatatable: {
      handler() {
        ////console.log(this.matchesResetOptionsDatatable)
        this.searchWord = ''
        if (this.matchesResetOptionsDatatable) {
          this.optionsDatatable = {
            page: 1,
            itemsPerPage: 10,
            sortBy: ['created-at'],
            sortDesc: [true],
            groupBy: [],
            groupDesc: [],
            mustSort: false,
            multiSort: true
          }

          this.SET_MATCHES_RESET_OPTIONS_DATATABLE(false)
        }
      },
      deep: true
    }
  },
  created() {
    console.log('asdasdasd asdas')
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 500)
  },
  mounted() {
    this.getGroups({
      params: this.getParamsUrlApi()
    })
  },

  methods: {
    ...mapActions('groupsService', ['getGroups', 'deleteGroup']),
    ...mapMutations('groupsService', [
      'SET_CURRENT_USER_FOR_UPDATE',
      'SET_USERS_SELECTED_DATATABLE',
      'SET_OPTIONS_DATATABLE_USERS',
      'SET_MATCHES_RESET_OPTIONS_DATATABLE'
    ]),
    loadDatatatable() {
      this.getGroups({
        params: this.getParamsUrlApi()
      })
    },
    setDataForUpdateUser(item) {
      this.SET_CURRENT_USER_FOR_UPDATE({
        id: item.id,
        dni: item.dni,
        first_name: item['first-name'],
        last_name: item['last-name'],
        phone: item.phone,
        email: item.email
      })

      this.$emit('emitScrollToCreateOrEditGroupForm')
    },
    fetchInitialData() {
      this.getGroups({
        params: this.getParamsUrlApi()
      })
    },
    getParamsUrlApi() {
      const urlParams = this.buildQueryParamsRequest()

      urlParams['filter[role]'] = 'student'
      urlParams['filter[state-account]'] = this.stateAccount

      return urlParams
    },
    searchFieldExecuted($event) {
      this.searchWord = $event
      this.getGroups({
        params: this.getParamsUrlApi()
      })
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    deleteGroupConfirm(item) {
      this.currentItemsSelectedForDelete = item
      //this.$refs['dialogConfirmDeleteAction'].showDialog = true
      this.$swal
        .fire({
          toast: true,
          width: '400px',
          icon: 'question',
          title: 'DAR DE BAJA',
          html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas eliminar este alumno y los datos relacionados a este?',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: '#007bff',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.deleteGroupAction()
          }
        })
    },
    async deleteGroupAction() {
      if (
        this.currentItemsSelectedForDelete === null ||
        this.currentItemsSelectedForDelete === undefined
      ) {
        return
      }

      try {
        await this.deleteStudent({
          id: this.currentItemsSelectedForDelete.id,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El alumno ha sido eliminado con éxito.',
          timer: 3000
        })

        this.$refs['ResourceTextFieldSearch'].searchWordText = ''
        this.searchWord = ''

        this.loadStudentsFromCurrentTab()
      } catch (error) {
        //console.log(error)
      }
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
