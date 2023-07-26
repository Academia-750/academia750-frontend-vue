<template>
  <v-card-text>
    <v-data-table
      v-model="getItemsSelected"
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      item-key="id"
      show-select
      no-data-text="No hay datos disponibles"
      :mobile-breakpoint="700"
      class="elevation-1"
      :server-items-length="totalItems"
      :footer-props="footerProps"
      :items-per-page="vueTableOptions.limit"
      :sort-by="vueTableOptions.sortBy"
      :sort-desc="vueTableOptions.sortDesc"
      :page="vueTableOptions.page"
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
          <resource-button icon-button="mdi-autorenew" @click="resetOptions" />
        </v-toolbar>

        <!-- ------------ SEARCH ------------ -->
        <resource-text-field-search
          :search-word="tableOptions.content"
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
      <template v-slot:[`item.alumnos`]="{ item }">
        <div class="d-flex justify-space-around">
          <ResourceButtonAdd
            text-button="Alumnos"
            :config-route="{ name: 'group-students', params: { id: item.id } }"
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
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headersOppositionsTable from './group-list-columns'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'
import moment from 'moment'
import GroupRepository from '@/services/GroupRepository'

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
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      )
  },
  mixins: [
    URLBuilderResources,
    headersOppositionsTable,
    computedDatatable,
    componentButtonsCrud
  ],
  computed: {
    ...mapState('groupStore', [
      'itemsDatatable',
      'totalItems',
      'stateLoadingItems',
      'itemsSelected',
      'tableOptions'
    ]),
    ...mapGetters('groupStore', ['vueTableOptions']),
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
    getItemsSelected: {
      get() {
        return this.itemsSelected
      },
      set(item) {
        this.SET_ITEMS_SELECTED(item)
      }
    }
  },
  created() {
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 600)
  },
  mounted() {
    this.getGroups()
  },

  methods: {
    ...mapActions('groupStore', ['getGroups', 'deleteGroup', 'resetOptions']),
    ...mapMutations('groupStore', [
      'SET_ITEMS_SELECTED',
      'SET_ITEMS_DATATABLE',
      'SET_EDIT_ITEM',
      'SET_TABLE_OPTIONS'
    ]),
    parseDate(date) {
      return moment(date).format('YYYY-MM-DD hh:mm')
    },
    onCreate() {
      this.SET_EDIT_ITEM(false)
      this.$router.push('/groups/create')
    },
    onOptionsUpdate(options) {
      this.SET_TABLE_OPTIONS({
        orderBy: options.sortBy[0] || 'created_at',
        order: options.sortDesc[0] ? 1 : -1,
        limit: options.itemsPerPage,
        offset: (options.page - 1) * options.itemsPerPage
      })

      this.getGroups()
    },
    updateItem(item) {
      this.SET_EDIT_ITEM(item)
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

      this.getGroups()
    },

    searchFieldExecuted($event) {
      this.SET_TABLE_OPTIONS({ content: $event, offset: 0 })
      this.getGroups()
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
