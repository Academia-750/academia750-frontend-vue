<template>
  <v-card-text>
    <v-data-table
      v-model="getSelectedItems"
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      item-key="id"
      show-select
      sort-by="created_at"
      no-data-text="No hay datos disponibles"
      :items-per-page="10"
      :mobile-breakpoint="700"
      class="elevation-1"
      :server-items-length="totalItems"
      :footer-props="footerProps"
      @update:options="onOptionsUpdate"
    >
      <template v-slot:top>
        <!-- ------------ TOP ------------ -->

        <ResourceHeaderCrudTitle
          text-header="Gestión de Grupos"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />

        <!-- ------------ ACTIONS ------------ -->
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-title-toolbar-datatable title-text="Gestión de Grupos" />

          <v-spacer />

          <ResourceButtonAdd text-button="Crear grupo" @click="onCreate" />
        </v-toolbar>

        <!-- ------------ SEARCH ------------ -->
        <resource-text-field-search
          ref="ResourceTextFieldSearch"
          label-text-field="Buscar por nombre o código"
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
        <div class="d-flex align-center">
          <span
            :style="{ backgroundColor: item.color }"
            class="circle mr-1"
          ></span>
          {{ item.name }}
        </div>
      </template>
      <template v-slot:[`item.created_at`]="{ item }">
        {{ parseDate(item.created_at) }}
      </template>
      <template v-slot:[`item.alumnos`]>
        <div class="d-flex justify-space-around">
          <resource-button-add
            text-button="Alumnos"
            :disabled="true"
            :config-route="{ name: 'add-students' }"
            :only-dispatch-click-event="true"
          />
        </div>
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-edit
            :config-route="{}"
            :only-dispatch-click-event="true"
            @DispatchClickEvent="updateItem(item)"
          />
          <resource-button-delete
            text-button="Eliminar"
            @actionConfirmShowDialogDelete="deleteGroupConfirm(item)"
          />
        </div>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mapState, mapMutations, mapActions } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headersOppositionsTable from './data/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'
import DatatableManageGroups from '../../mixins/DatatableManageGroups'
import moment from 'moment'
import GroupRepository from '../../repositories/GroupRepository'

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
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    ResourceTitleToolbarDatatable: () =>
      import(
        /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
      ),
    ResourceHeaderCrudTitle: () =>
      import(
        /* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'
      )
    // ResourceDialogConfirmDelete: () =>
    //   import(
    //     /* webpackChunkName: "ResourceDialogConfirmDelete" */ '@/modules/resources/components/resources/ResourceDialogConfirmDelete'
    //   )
  },
  mixins: [
    DatatableManageGroups,
    URLBuilderResources,
    headersOppositionsTable,
    computedDatatable,
    componentButtonsCrud
  ],
  data() {
    return {
      options: {
        orderBy: 'created_at',
        oder: -1,
        limit: 10,
        offset: 0
      }
    }
  },
  computed: {
    ...mapState('groupsService', [
      'itemsDatatable',
      'totalItems',
      'stateLoadingItems',
      'usersSelected'
    ]),
    footerProps() {
      return {
        ...this.get_items_per_page_options_datatable,
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }
    },
    getSelectedItems: {
      get() {
        return this.usersSelected
      },
      set(value) {
        this.SET_ITEMS_SELECTED(value)
      }
    }
  },
  created() {
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 600)
  },
  mounted() {
    this.load()
  },

  methods: {
    ...mapActions('groupsService', ['getGroups', 'deleteGroup']),
    ...mapMutations('groupsService', ['SET_ITEMS_SELECTED', 'SET_EDIT_ITEM']),
    load() {
      this.getGroups({
        content: this.searchWord,
        ...this.options
      })
    },
    parseDate(date) {
      return moment(date).format('YYYY-MM-DD hh:mm')
    },
    onCreate() {
      this.SET_EDIT_ITEM(false)
      this.$router.push('/groups/create')
    },
    onOptionsUpdate(options) {
      this.options = {
        orderBy: options.sortBy[0] || 'created_at',
        order: options.sortDesc[0] ? 1 : -1,
        limit: options.itemsPerPage,
        offset: (options.page - 1) * options.itemsPerPage
      }

      this.load()
    },
    updateItem(item) {
      this.SET_ITEMS_SELECTED(item)
      this.$router.push('/groups/edit')
    },
    async deleteGroupConfirm(item) {
      if (!item) {
        return
      }
      const result = await this.$swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title: 'ELIMINAR GRUPO',
        html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas eliminar este grupo? Todos los alumnos seran dados de baja y perderas el histórico del grupo',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (!result.isConfirmed) {
        return
      }

      const res = await GroupRepository.delete(item.id)

      if (!res) {
        return
      }
      this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'El grupo ha sido eliminado con éxito.',
        timer: 3000
      })

      this.load()
    },

    searchFieldExecuted($event) {
      this.searchWord = $event
      this.load()
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

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
